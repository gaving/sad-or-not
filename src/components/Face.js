import React, { Component } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import { Emojione } from "react-emoji-render";

const Emoji = styled.h2`
  font-size: 10em;
  display: inline-block;
  filter: hue-rotate(10deg);
  cursor: pointer;
  transition-duration: 1s;
  &:hover {
    font-size: 12em;
    filter: hue-rotate(90deg);
    transform: rotate(45deg);
    transition-duration: 1s;
  }
  &:nth-of-type(odd):hover {
    transform: rotate(-45deg);
  }
`;

class Face extends Component {
  static propTypes = {
    text: PropTypes.string
  };
  render() {
    const { text } = this.props;
    return (
      <Emoji {...this.props}>
        <Emojione svg text={text} />
      </Emoji>
    );
  }
}

export default Face;
