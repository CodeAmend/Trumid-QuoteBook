# Trumid Take Home Assignment
Welcome to the final step to becoming a full-fledged member of our technology team! In this challenge, we'd like for you to demonstrate your capability as a software developer by building a proof of concept frontend for our "QuoteBook" service. We're impressed with you so far and look forward to seeing what you come up with!

## Instructions
-	Spend up to 1 week completing the assignment, on your own time using React as a frontend framework.
-	Have fun and collaborate with the tech team.  This process is designed so you can also get to know us and understand how we operate.
-	We will create a Github repository for you to check-in your code.
-	We will also create a private Slack channel where you can communicate and ask questions with the team.

## Judgement Criteria
-	Project setup - It should run out of the box. How well do you structure your project?  Does your README file give good instructions on how to pull down and run your application?  Are there simple commands to setup the system and/or run unit tests?
-	Code Architecture & Quality - We like simple and easy to follow. How legible is your code? Is there good separation between logic and presentation? Are you using appropriate patterns and libraries to solve problems?
-	Team Collaboration - Ask questions. How was the interaction during the assignment? Did you keep us informed of progress and seek incremental feedback? Did you ask questions when something was unclear or you need clarification?
-	Delighters - Impress us. How did you challenge yourself with this assignment? What did you learn? Did you teach us something?

## Task
Create a single-page React application to interface with the QuoteBook service. Your app must implement the following features:

1. A list of best bid and offer for actively quoted bonds.
2. A detailed bond view that shows the "depth" or all the active quotes for the given bond.
3. A quote entry form for creating a new quote.
4. The ability to modify price/qty or cancel existing quotes.

We have provided a standalone server that emits quote events over socket.io.  Documentation on the server API can be found by navigating to http://localhost:3000 after launching the server. You are welcome to inspect the source code in the `server` folder, but not allowed to change or check in any files inside that folder. All your code should be commited to the `client` folder.  See **Running the Server** for more information.

*Pay particular attention to performance!*  The default simulation parameters of the QuoteBook server are 10 quote updates per second across 100 bonds.  Play with the parameters on the server to see how your app handles 1000 bonds. What about 100 updates/second?  Does application performance deteriorate as you let it run for several minutes or hours?

## Running the Server
Make sure you have the latest version of node.js installed, then from the folder which you cloned the project run the following commands:
```
> cd server
server> npm install
server> npm start
```
The server starts on port 3000 by default, to view api documentation launch a web browser and navigate to http://localhost:3000

## Design Considerations
So what is QuoteBook?  In our world of bond trading, a quote consists of the following:

- BondId: The bond which is being quoted
- AccountId: The account which owns the quote
- Side: Are you a Buyer or Seller
- Qty: Amount of bonds you want to trade (expressed as notional amounts, i.e. $1mm for $1,000,000 worth of bonds)
- Price: The price that you want to buy or sell bonds ($100 = par or the face value of the bond)

A way you'd typically see quotes displayed across multiple bonds is in a tabular format, with the best bid and offer shown:

| Bond               | Client | Qty    | Bid     | Offer    | Qty | Client |
|------------------- |:------:|:------:|:-------:|:--------:|:---:|:------:|
| AAA 3.5 10/12/22   | CS     | 1.25mm | $99.75  | $100.00  | 3mm | DB     |
| BBB 4.75 03/25/35  | PB     | 4.54mm | $78.25  | $78.75   | 1mm | CS     |
| CCC 8.625 03/25/35 |        |        |         | $89.625  | 1mm | GD     |

When you drill into a bond, sort multiple bids by highest price descending, and offers lowest price ascending. 2 quotes on the same side and level should be sorted by oldest-first time priority.

**AAA 3.5 10/12/22**

| Client | Qty    | Bid     | Offer     | Qty     | Client |
|:------:|:------:|:-------:|:---------:|:-------:|:------:|
| CS     | 1.25mm | $99.75  | $100.00   | 3mm     | DB     |
| PB     | 4.54mm | $99.325 | $100.375  | 2.25mm  | CS     |
| RR     | 3.5mm  | $98.825 |           |         |        |

When building a live-updating orderbook, take into consideration varying data-widths and quotes appearing and disappearing at a rapid rate. A flash effect would be appropriate when a quote updates. And remember, nothing worse than showing a trader shaking numbers and non-fixed column widths when millions of dollars are on line!

For the purpose of the prototype we'll asume that you are a voice trader and can create quotes on behalf of any account.  The form to create a new quote should have the following input fields:

- Bond
- Account the quote is on behalf of
- Side (either buy or sell)
- Qty (size of the bonds in notional)
- Limit (limit price)

When submitting your quote, make sure to wait for a response before moving on.  The server implements some basic validation checks.

There are certainly a lot of nuances and edge cases to handle, but remember this is an exercise where collaboration is expected and encouraged. Ask questions and...

**Good Luck!**
