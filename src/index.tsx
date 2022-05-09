// React
import * as React from "react";
import * as ReactDOM from "react-dom";

// Global State
import GlobalProvider from "./ts/GlobalContext/globalState";

// Root View
import RootView from "./ts/RootView";

// Styles
import { MuiThemeProvider } from "@material-ui/core/styles";
// import "./styles/index.css";
import appTheme from "./materialStyles";

// Service Worker
import registerServiceWorker from "./registerServiceWorker";

/**
 * GlobalProvider brings access to the state to the components
 * MuiThemeProvider brings access to theme to the components
 */
ReactDOM.render(
  <GlobalProvider>
    <MuiThemeProvider theme={appTheme}>
      <RootView />
    </MuiThemeProvider>
  </GlobalProvider>,
  document.getElementById("root") as HTMLElement
);

/**
 * Returns the last index of the list.
 * Length returns the last index + 1
 */
Array.prototype.indexLength = function () {
  return this.length - 1;
};

/**
 * Returns the last index of the list.
 * Length returns the last index + 1
 */
Array.prototype.last = function () {
  return this[this.indexLength()];
};

registerServiceWorker();
