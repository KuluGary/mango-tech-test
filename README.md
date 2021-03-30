# REACT RANGE SLIDER (Mango tech test)
React Range Slider is a component that replaces the HTML5 input['range'] element for a custom one.

## Usage
This component retrieves data from a mock API through [beeceptor.com/](https://beeceptor.com) (`App.js:13`). Since beeceptor has a limit on requests per day, there's a fallback in place that sets hardcoded data instead.

In both cases, the user can move around the bullets in order to set whatever value it desires. The component is controlled so it can't go above or below the maximum length, and also can cross (max can't be lower than min, min can't be bigger than max).

### First example (exercise 1)
The component gets an object as props with two elements, the min and max established in the API response. Using these parameters, it creates an array of the appropiate length and uses it to set the length of the component.

In this case, the user can also use the labels, now as input['number'] HTML5 elements, to move the bullets as desired. It has the same restrictions as with moving the bullets.

### Second example (exercise 2)
The component gets an object as props with one element, the array of accepted values from the API response. Using this array, it sets the appropiate length of the component.

***

### Testing
All tests are stored in the `__test__` folder. To run them, use `yarn test`.

