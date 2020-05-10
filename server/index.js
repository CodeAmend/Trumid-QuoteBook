var _ = require('lodash');
var crypto = require('crypto');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// consts
const ACCOUNT_MASTER_SIZE = 5;
const BOND_MASTER_SIZE = 100;
const MIN_QUOTEBOOK_SIZE = 50;
const QUOTE_ACTIONS_PER_SECOND = 100;

const QUOTE_ACTION = {
  NEW: 'N',
  UPDATE: 'U',
  CANCEL: 'C'
};

const QUOTE_SIDE = {
  BUY: 'B',
  SELL: 'S',
};

// cache
var accountMaster = {};
var bondMaster = {};
var quoteBook = {};
var quoteBookSubscriptions = new Set()

// api
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function () {
  console.log('server listening on *:3000');
});

io.on('connection', function (socket) {
  console.log('client connected');

  let send = function(topic, msg) {
    console.log(`sending ${topic}`, msg);
    socket.emit(topic, msg);
  }

  socket.on('quote.create', function (msg) {
    console.log('quote.create', msg);
  
    msg = msg || {};
    let errors = [];

    if(!accountMaster[msg.accountId]) {
      errors.push("Invalid Account ID");
    }

    if(!bondMaster[msg.bondId]) {
      errors.push("Invalid Bond ID");
    }

    if(!_.includes(_.values(QUOTE_SIDE), msg.side)) {
      errors.push("Invalid Side");
    }

    if(!_.isInteger(msg.qty)) {
      errors.push("Invalid qty");
    }

    if(!_.isNumber(msg.price)) {
      errors.push("Invalid price");
    }

    if(_.isEmpty(errors)) {
      let quote = createQuote(msg);
      send('quoteAccepted', {
        requestId: msg.requestId,
        action: QUOTE_ACTION.NEW,
        quote: quote,
      });
    } else {
      send('quoteRejected', {
        requestId: msg.requestId,
        errors: errors
      })
    }
  });

  socket.on('quote.replace', function (msg) {
    console.log('quote.replace', msg);

    msg = msg || {};
    let errors = [];

    let quote = quoteBook[msg.quoteId];
    if(!quote) {
      errors.push("Invalid Quote ID");
    }

    if(!_.has(msg, 'price') && !_.has(msg, 'qty')) {
      errors.push("Please include price and qty to update a quote");
    }

    if(!_.isInteger(msg.qty)) {
      errors.push("Invalid qty");
    }

    if(!_.isNumber(msg.price)) {
      errors.push("Invalid price");
    }

    _.assign(quote, _.pick(msg, ['qty', 'price']))

    if(_.isEmpty(errors)) {
      quote = updateQuote(quote);
      send('quoteAccepted', {
        requestId: msg.requestId,
        action: QUOTE_ACTION.UPDATE,
        quote: quote,
      });
    } else {
      send('quoteRejected', {
        requestId: msg.requestId,
        errors: errors
      })
    }
  });

  socket.on('quote.cancel', function (msg) {
    console.log('quote.cancel', msg);

    msg = msg || {};
    let errors = [];

    let quote = quoteBook[msg.quoteId];
    if(!quote) {
      errors.push("Invalid Quote ID");
    }

    if(_.isEmpty(errors)) {
      quote = cancelQuote(quote);
      send('quoteAccepted', {
        requestId: msg.requestId,
        action: QUOTE_ACTION.CANCEL,
        quote: quote,
      });
    } else {
      send('quoteRejected', {
        requestId: msg.requestId,
        errors: errors
      })
    }
  });

  socket.on('quoteBook.subscribe', function (msg) {
    console.log('quoteBook.subscribe')
    quoteBookSubscriptions.add(socket);
  })

  socket.on('quoteBook.unsubscribe', function (msg) {
    console.log('quoteBook.unsubscribe')
    quoteBookSubscriptions.delete(socket);
  })

  socket.on('quoteBook.snapshot', function (msg) {
    send('quoteBook', _.values(quoteBook));
  })

  socket.on('accountMaster.snapshot', function (msg) {
    send('accountMaster', _.values(accountMaster));
  });

  socket.on('bondMaster.snapshot', function (msg) {
    send('bondMaster', _.values(bondMaster).map((b) => _.omit(b, '_mid')));
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

// startup

createAccountMaster();
createBondMaster();

var timer = setInterval(simulateQuoteAction, 1000 / QUOTE_ACTIONS_PER_SECOND);

// functions

function id() {
  return crypto.randomBytes(20).toString('hex')
}

function mnemomic(size) {
  return _.sampleSize("ABCDEFGHIJKLMNOPQRSTUVWXYZ", size || 3).join('')
}

function createBondMaster(count) {
  _.times(count || BOND_MASTER_SIZE, function () {

    let id = Math.random().toString(36).substring(2, 9).toUpperCase();
    let ticker = mnemomic(_.random(2, 5));
    let coupon = _.random(1, 8, true).toFixed(3);
    let maturity = new Date(_.random(2018, 2045), _.random(0, 12), _.random(1, 30));

    // used as an orientation for generating market data quotes
    let mid = 100 + (_.random(-500, 100) / 16)

    bondMaster[id] = {
      id: id,
      name: `${ticker} ${coupon} ${maturity.toLocaleDateString("en-US")}`,
      _mid: mid
    };
  })
}

function createAccountMaster(count) {
  _.times(count || ACCOUNT_MASTER_SIZE, function (id) {
    accountMaster[id] = {
      id: id,
      name: mnemomic(_.random(2, 4))
    }
  });
}

function simulateQuoteAction() {
  let action = _.size(quoteBook) < MIN_QUOTEBOOK_SIZE ? QUOTE_ACTION.NEW : _.sample(QUOTE_ACTION);



  switch (action) {
    case QUOTE_ACTION.NEW: {
      let bond = _.sample(bondMaster);
      let account = _.sample(accountMaster);
      let side = _.sample(QUOTE_SIDE);
      let spread = _.random(1, 64) * (1 / 16);

      createQuote({
        bondId: bond.id,
        accountId: account.id,
        side: side,
        price: bond._mid + ((side === QUOTE_SIDE.BUY) ? -spread : spread),
        qty: (_.random(1000, 10000) * 1000)
      })
      break;
    }

    case QUOTE_ACTION.UPDATE: {
      let quote = _.sample(quoteBook);
      quote.reqId = id();

      if (_.sample([true, false])) {
        let bond = bondMaster[quote.bondId];
        let spread = _.random(1, 64) * (1 / 16);

        quote.price = bond._mid + ((quote.side === QUOTE_SIDE.BUY) ? -spread : spread);
      } else {
        quote.qty = (_.random(1000, 10000) * 1000);
      }

      updateQuote(quote)
      break;
    }

    case QUOTE_ACTION.CANCEL: {
      let quote = _.sample(quoteBook);
      cancelQuote(quote);
      break;
    }
  }
}

function createQuote(quote) {
  quote = _.assign(quote, {
    id: id(),
    sequence: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  quoteBook[quote.id] = quote;

  publishQuote(QUOTE_ACTION.NEW, quote);

  return quote;
}

function updateQuote(quote) {
  quote.sequence += 1;
  quote.updatedAt = new Date();

  _.set(quoteBook, quote.id, quote)

  publishQuote(QUOTE_ACTION.UPDATE, quote);

  return quote;
};

function cancelQuote(quote) {
  quote.sequence += 1;
  quote.updatedAt = new Date();

  _.unset(quoteBook, quote.id);

  publishQuote(QUOTE_ACTION.CANCEL, quote);

  return quote;
};

function publishQuote(action, quote) {
  for(let socket of quoteBookSubscriptions) {
    socket.emit('quoteAction', {
      action: action,
      quote: quote
    })
  }
}
