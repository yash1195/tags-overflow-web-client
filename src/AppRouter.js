

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// pages
import App from './App';
import SearchResult from './SearchResult';
import Refresh from './Refresh';

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={App} />
        <Route path="/results" exact component={SearchResult} />
        <Route path="/refresh" exact component={Refresh} />
      </div>
    </Router>
  );
}

export default AppRouter;

