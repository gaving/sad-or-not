import React, { Component } from "react";
import PropTypes from "prop-types";

import Face from "./Face";

import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    transform: scale(.25);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(.25);
    opacity: 0;
  }
`;

const Title = styled.h1`
  color: ${props => props.color || "goldenrod"};
  font-size: 2.8em;
  display: inline-block;
  position: relative;

  visibility: ${props => (props.expanded ? "hidden" : "visible")};
  animation: ${props => (props.expanded ? fadeOut : fadeIn)} 1s linear;
  transition: visibility 1s linear;
`;

class Question extends Component {
  static propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func
  };
  constructor() {
    super();
    this.state = {
      expanded: true
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ expanded: false });
    }, 2000);
  }
  render() {
    const { title, onClick } = this.props;
    return (
      <div className="App">
        <div>
          <Title color="#111111" expanded={this.state.expanded}>
            {title}
          </Title>
          <div className="App-intro">
            <Face onClick={onClick} text=":)" />
            <Face onClick={onClick} text=":|" />
            <Face onClick={onClick} text=":(" />
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
