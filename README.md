This project was started via:

```
npx create-react-app react-edu-counter-redux-testing --template redux
cd react-edu-counter-redux-testing
npm install --save-dev @testing-library/react
```

###### (Install bable plugin to package.json)

```
.
.
.
"babel": {
  "presets": [
    "babel-preset-react-app"
  ]
}
.
.
.
```

## React Redux Testing

This project was created to quickly demonstrate how to do extremely cheap unit tests that are approximately as extensive as full-fledged integration tests without needing to boot browser emulation frameworks.

### The Test

Let's first touch on what our test is making us _confident_ in. Let's suppose we have a basic UI that looks like this:

```
<div>
  <button onClick={action.increment}>+</button>
  <span>0</span>
  <button onClick={action.decrement}>+</button>
</div>
```

So we just have 2 buttons, clicking one will make the number in the span go up by one, clicking the other will have the opposite effect. But we lack confidence in the following:

- We're worried clicking the '+' button won't trigger the correct action,
- We're worried that our component won't render the correct values from the start,
- We're also worried that after clicking the button the component won't update the span number accordingly

We can use `react-testing-library` to build confidence around all of these things extremely concisely! We just need to write a fancy rendering helper function, and then use `react-testing-library` to fireEvents at our component and perform assertion tests thereafter.

(test-utils.js)

```
/* eslint-disable */
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import defaultInitialState from "../../redux/reducers/initialState";

function render(
  ui,
  { initialState = defaultInitialState, reducer, ...renderOptions } = {}
) {
  const store = createStore(reducer, initialState);

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
```

(Counter.test.js)

```
test("renders using redux with defaults and increment the count", () => {
  const { getByText, getByTestId } = render(<Counter />, { reducer });

  expect(getByTestId("count-value")).toHaveTextContent("0");

  fireEvent.click(getByText("+"));

  expect(getByTestId("count-value")).toHaveTextContent("1");
});
```

Check out the code and of course run `npm t` to watch the tests pass :)
