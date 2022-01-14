# About
Thank you for reviewing. Orderbook created by George Filippou, according to test specifications (or spec).

# Live Demo
View a live demo of this app at https://ob-test.vercel.app/

# Notes & Issues
### Missing specs
Orderbooks typically have certain characteristics that were not included in the spec, namely:
- Spread was not calculated, since a method for its calculation was not specified. A static placeholder for Spread was however included since it did appear in the supplied designs.
- Order Books typically display only a predetermined max set of order lines per side (buy or sell), usually 25. This was not requested or specified in the spec. To accommodate for multiple order lines, a vertical scrollbar may appear depending on the current number of orders displayed.
- Supplied designs did not provide for displaying the currently selected feed, although it may be inferred by the displayed available Groups and order prices. I included an area outside of the supplied orderbook design to explicitly display the currently selected product market (PI_XBTUSD or PI_ETHUSD).

### Improvements
Due to time availability constraints, there is room for improvement in certain areas, namely:
- Refactoring of certain parts of the code to make it more readable / elegant, especially the code regarding "Toggle Feed" button operation, and the code in the file "orderbookDataFormatter.ts".
- More extensive testing, specifically to: 
  - Test for proper orders grouping
  - Test for proper "Toggle Feed" button operation
  - Test for proper "Kill Feed" button operation

# Scripts
### To run the app

> npm start


### To run the tests

> npm run test

