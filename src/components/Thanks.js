import React, { Component } from "react";
import styled from "styled-components";
import Clouds from "containers/Clouds";
import Face from "./Face";

const { ipcRenderer } = (window.require && window.require("electron")) || {};

const Title = styled.div`
  color: #eee;
  text-shadow: -1px -2px 3px rgba(17, 17, 17, 0.3);
  text-align: center;
  font-family: sans-serif;
  font-size: 15px;
`;

const Message = styled.div`
  text-align: center;
  font-size: 15px;
  font-family: sans-serif;
  text-shadow: -1px -2px 3px rgba(17, 17, 17, 0.3);
  padding: 5px;
`;

class Thanks extends Component {
  static defaultProps = {
    ...Component.defaultProps,
    timeout: 5
  };
  constructor() {
    super();
    this.state = { seconds: 0 };
  }
  componentDidMount() {
    const { timeout } = this.props;
    this.setState({ seconds: timeout });
    setInterval(() => {
      this.setState({ seconds: --this.state.seconds });
      if (this.state.seconds === 0) {
        this.close();
      }
    }, 1000);
  }
  close() {
    if (!ipcRenderer) {
      return;
    }

    ipcRenderer.send("quit");
  }
  render() {
    const { seconds } = this.state;
    return (
      <Clouds>
        <Title>
          <Face text="Thanks! :D" />
        </Title>
        <Message>Thanks for participating in our survey.</Message>
        <Message>(Window will close in {seconds} seconds)</Message>
      </Clouds>
    );
  }
}

export default Thanks;
