/* eslint-disable */
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// import defaultInitialState from "../../redux/reducers/initialState";
const defaultInitialState = { value: 3 };

function render(
  ui,
  { initialState = defaultInitialState, reducer, ...renderOptions } = {}
) {
  // const store = createStore(reducer, initialState); // omg....
  const store = configureStore({
    reducer: {
      counter: reducer,
    },
  });

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
