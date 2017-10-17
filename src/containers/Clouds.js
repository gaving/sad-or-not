import React, { Component } from "react";
import "./Clouds.css";

class Clouds extends Component {
  render() {
    return (
      <div id="clouds">
        <div className="cloud x1" />
        {this.props.children}
        <div className="cloud x2" />
        <div className="cloud x3" />
        <div className="cloud x4" />
      </div>
    );
  }
}

export default Clouds;
