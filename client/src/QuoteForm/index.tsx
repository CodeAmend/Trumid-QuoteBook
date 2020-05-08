import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

function QuoteForm() {

  console.count('form')
  // const classes = useStyles();
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    // setSelectedBond(target.value)
  };

  return(
     <Container component="main" maxWidth="xs">
       <form noValidate autoComplete="off">
        <TextField
          select
          label="Pick a Bond"
          value={currency}
          onChange={handleChange}
          helperText="Please select your bond"
          variant="outlined"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </form>
    </Container>
  );
}

export default QuoteForm;
