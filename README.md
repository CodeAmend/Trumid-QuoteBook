# Trumid Take Home Assignment

## Basic setup
* `npm run client` run react app 
* `npm run server` run server
* `npm run dev` run both client and server concurrently

### Basic Usage
* The Main Screen that greets you is `All Bond View`
* At the top is a Add (createQuote) form
  * `Add` button is disabled until all input fields are filled in
* If you change the `bond` select field, you will be taken to a Bond View page with more detail.
* You can select `quote types` such as New, Update, Cancel
  * Update and Cancel are not implemented yet


### Next up
* Show list of quotes added
* add functionality to update and cancel. (Will have to think of architection and UX)


### Extremely useful notes
AgGrid has a few issues
* Grid blinks with each update.
* <s>Because of this scrolling down shoots back to top</s>
* <s>Occasionally, a grid value will get stuck in a loop (most likely in util function NEEDS unit test)</s>
* <s>Havn't dove deep enough into AgGrid to style and change widths of cells.</s>


#### Notes
* Had to remove <React.StrictMode> 
// TODO: find out why this is a thing!!!
// https://github.com/facebook/react/issues/16295
// had to remove React strict mode because of reducer side effect.

* Ag-grid was a pain to install, it took a bit to track down the issue.
https://stackoverflow.com/questions/47326640/ag-grid-react-crashing-on-basic-component-import-missing-react-dom-factories
I found this stackoverflow and needed to install a missing dependency that was removed in a previous react version `react-dom-factories`

* Rerender article on medium https://medium.com/@guptagaruda/react-hooks-understanding-component-re-renders-9708ddee9928

#### Questions
* It seems on "N" new quote actions, the same client can appear more than once. Should they be combined?
