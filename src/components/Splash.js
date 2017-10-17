import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Emojione } from "react-emoji-render";

const Large = styled.h1`
  font-size: 5em;
  display: inline-block;
  color: #855223
  filter: hue-rotate(30deg)
`;

class Splash extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/question">
          <Large><Emojione svg text="Have you got a minute? :o" /></Large>
        </Link>
      </div>
    );
  }
}

export default Splash;
