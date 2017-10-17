import React, { Component } from "react";
import "./App.css";
import CSSTransition from "react-transition-group/CSSTransition";
import TransitionGroup from "react-transition-group/TransitionGroup";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import QuestionList from "./containers/QuestionList";
import Splash from "./components/Splash";
import Thanks from "./components/Thanks";

class App extends Component {
  render() {
    const timeout = { enter: 300, exit: 200 };

    return (
      <Router>
        <Route
          render={({ location }) => (
            <TransitionGroup component="main" className="page-main">
              <CSSTransition
                key={location.key}
                timeout={timeout}
                classNames="fade"
                appear
              >
                <section className="page-main-inner">
                  <Switch location={location}>
                    <Route path="/intro" component={Splash} />
                    <Route exact path="/" component={QuestionList} />
                    <Route path="/thanks" component={Thanks} />
                  </Switch>
                </section>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </Router>
    );
  }
}

export default App;
