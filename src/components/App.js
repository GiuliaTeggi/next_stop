import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { default as rootReducer } from "../reducers";
import { Provider } from "react-redux";
import TimeTable from "./TimeTable";
import StationFilter from "./StationFilter";
import Header from "./Header";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

const App = () => (
  <Provider store={store}>
    <Header />
    <StationFilter />
    <TimeTable />
  </Provider>
);

export default App;