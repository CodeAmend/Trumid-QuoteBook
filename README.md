# Trumid Take Home Assignment

## Basic setup
* `npm run client` run react app 
* `npm run server` run server
* `npm run both` run both client and server (coming soon)


### Extremely useful notes
>Pay particular attention to performance! The default simulation parameters of the QuoteBook server are 10 quote updates per second across 100 bonds. Play with the parameters on the server to see how your app handles 1000 bonds. What about 100 updates/second? Does application performance deteriorate as you let it run for several minutes or hours?



#### Notes
* Had to remove <React.StrictMode> 
// TODO: find out why this is a thing!!!
// https://github.com/facebook/react/issues/16295
// had to remove React strict mode because of reducer side effect.

* Ag-grid was a pain to install, it took a bit to track down the issue.
https://stackoverflow.com/questions/47326640/ag-grid-react-crashing-on-basic-component-import-missing-react-dom-factories
I found this stackoverflow and needed to install a missing dependency that was removed in a previous react version `react-dom-factories`


#### Questions
* It seems on "N" new quote actions, the same client can appear more than once. Should they be combined?
