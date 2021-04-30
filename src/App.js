import { Switch } from "@material-ui/core";
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import EditClaim from "./components/EditClaim";
import EditMember from "./components/EditMember";
import MenuSelection from "./components/MenuSelection";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact render={() => <MenuSelection />}></Route>
        <Route path="/members/:id" exact render={() => <EditMember />}></Route>
        <Route path="/claims/:id" exact render={() => <EditClaim />}></Route>
      </Router>
    </div>
  );
}

export default App;
