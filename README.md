# Trumid Take Home Assignment

## Basic setup
* `npm run client` run react app 
* `npm run server` run server
* `npm run both` run both client and server (coming soon)


### Extremely useful notes
AgGrid has a few issues
* Grid blinks with each update.
* Because of this scrolling down shoots back to top
* Occasionally, a grid value will get stuck in a loop (most likely in util function NEEDS unit test)
* Havn't dove deep enough into AgGrid to style and change widths of cells.




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
