import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import axios from "axios";

const headerStyle = {
  fontFamily: "Pacifico",
  fontStyle: "italic",
  textAlign: "center"
};

const twitterUrl = "https://twitter.com/home/?status=";

class App extends Component {
  state = {
    quote: "",
    author: "",
    bgColor: "lightgreen",
    canShare: false
  };

  bgColors = [
    "#f08080",
    "#eea2ad",
    "#ffa07a",
    "#b0e2ff",
    "#809dc4",
    "#b0e0e6",
    "#bada55",
    "#a9a9a9",
    "#e3a857"
  ];

  render() {
    return (
      <div
        className="container-fluid text-center app-background"
        style={{ background: this.state.bgColor }}
      >
        <div className="row">
          <div className="col  title-div">
            <h1 style={headerStyle}> Random Quotes For You ! </h1>
            <section className="section-spacing" />
            <button
              className="btn btn-dark btn-lg btn-text"
              id="newquote"
              onClick={this.handleNewQuote}
            >
              New Quote
            </button>
            <a
              id="twitter"
              className={this.getAnchorClass()}
              href={twitterUrl + this.state.quote + "-" + this.state.author}
              target="_blank"
              role="button"
            >
              <i className="fa fa-twitter " />
              Share on Twitter
            </a>
            <section className="section-spacing"> </section>
            <div id="quotebox" className="text-justify quote-box btn-text">
              <span>{this.state.quote}</span>
              <br />
              <span style={{ float: "right" }}>-{this.state.author} </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleChangeBackground = bgColors => {
    let color = this.bgColors[Math.floor(Math.random() * 10)];
    this.setState({ bgColor: color });
  };

  handleNewQuote = () => {
    this.getQuote();
    this.handleChangeBackground();
  };

  getAnchorClass = () => {
    let classForAnchor = "";
    classForAnchor = this.state.canShare
      ? "btn btn-dark btn-lg btn-text-share"
      : "btn btn-dark btn-lg btn-text-share disabled";

    return classForAnchor;
  };

  getQuote = () => {
    console.log(this);
    axios
      .get("https://quotes.rest/qod")
      .then(response => {
        console.log(this);
        this.setState({
          quote: response.data.contents.quotes[0].quote,
          author: response.data.contents.quotes[0].author,
          canShare: true
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export default App;
