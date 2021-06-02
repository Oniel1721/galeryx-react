import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import {
  ThemeProvider,
} from "@material-ui/core";

import theme from './theme'

import Home from "./components/Home";




const App = () => {


  return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route >
            <Redirect to="/" />
          </Route>
        </ThemeProvider>
      </BrowserRouter>
  );
}


export default App;
