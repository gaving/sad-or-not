import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "./Carousel.css";
import Clouds from "./Clouds";

import Question from "components/Question";
import { Carousel } from "react-responsive-carousel";
const { ipcRenderer } = (window.require && window.require("electron")) || {};

class QuestionList extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };
  constructor() {
    super();
    this.state = {
      questions: [],
      currentQuestion: 0
    };
  }
  componentDidMount() {
    const api =
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_API_URL
        : "";
    fetch(`${api}/questions`)
      .then(res => res.json())
      .then(questions => this.setState({ questions }));
  }
  next() {
    const { history } = this.props;
    const { questions, currentQuestion } = this.state;
    const question = currentQuestion + 1;
    const totalQuestions = questions.length - 1;

    this.setState({
      currentQuestion: question
    });

    if (question > totalQuestions) {
      history.push("/thanks");
    }

    if (!ipcRenderer) {
      return;
    }

    ipcRenderer.send("progress", question / totalQuestions);
  }
  render() {
    const { questions } = this.state;
    const questionList = questions.map(question => {
      return (
        <Question
          key={question._id}
          title={question.body}
          onClick={this.next.bind(this)}
        />
      );
    });
    return (
      <Clouds>
        {questions.length > 0 && (
          <Carousel
            axis="horizontal"
            showStatus={false}
            showThumbs={false}
            useKeyboardArrows={true}
            showArrows={false}
            emulateTouch
            selectedItem={this.state.currentQuestion}
          >
            {questionList}
          </Carousel>
        )}
      </Clouds>
    );
  }
}

export default withRouter(QuestionList);
