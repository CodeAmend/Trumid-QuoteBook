# Trumid Take Home Assignment

## Basic setup
* `npm run client` run react app 
* `npm run server` run server
* `npm run dev` run both client and server concurrently


# What I learned
* Using Typescript is an excellent way to really pull together a app quickly. I will never not use Typescript if I can help it.
* With better planning, I could have saved a lot of time. I thought I had it down and realized later that I did not fully understand what was asked.

# How I will approach a future problem/project like this:
* I will most certainly draw the entire architecture out.
* This will allow for creation of early Typescript types and interfaces
* Check out the technology such as aggrid first before designing, because AgGrid actually did so much, I was able to remove some util functions.

# What I am unhappy with:
* I did not get the functionality of the crud mutations completely working, update.
  * this was mainly because I did not have full understanding of the project and I wish I would have clarified earlier.
* I did not put much effort into design and I do not like that. I almost just threw in bootstrap to style.


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

### Bugs!!!
* Add mutliple quotes of same client and does not combine, (ask Trumid team about this)
* <s>Rendering error with AgGrid (throws nast red error about )</s>
* <s>When you select a bond by clicking table, select box value is not set</s>



### Extremely useful notes
AgGrid has a few issues
* <s>Grid blinks with each update.</s>
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
