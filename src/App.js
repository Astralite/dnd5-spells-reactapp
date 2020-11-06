import React, { Component } from "react";
import axios from "axios";
import toggleFullScreen from "./modules/fullscreen.js";

import "./App.scss";

class App extends Component {
  constructor() {
    super();

    this.state = {};

    this.apiUrl = "https://www.dnd5eapi.co/api";
  }

  componentDidMount() {
    // After the component has mounted retrieve dnd class and subclass
    // data from the API to populate our dropdown box.
    axios.get(this.apiUrl + "/classes").then(({ data }) => {
      const classes = data.results;
      this.setState({ ...this.state, classes });

      // For each dnd class create an axios get request for retrieving
      // class details from the API.
      // Performance is acceptable while we have a small number of classes.
      let promises = [];
      classes.forEach((dndClass) => {
        promises.push(axios.get(`${this.apiUrl}/classes/${dndClass.index}`));
      });

      // Resolve promises and add the data to state
      axios.all(promises).then((responses) => {
        responses.forEach(({ data }) => {
          console.log(data);
          let newClassData = data;

          // Here we update the state's "classes" array replacing
          // current items with newer items using a map
          this.setState({
            ...this.state,
            classes: this.state.classes.map((currentClassData) => {
              return currentClassData.index === newClassData.index
                ? newClassData
                : currentClassData;
            }),
          });
        });
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="toggle-fs" onClick={toggleFullScreen} />
        <h1 className="menu-item title">DnD Spells App</h1>
        <div className="menu-item classes-dropdown">Classes</div>
        <div className="menu-item info-box">Info Box</div>
        <div className="menu-item level-selector">
          <div>1-2</div>
          <div>3-4</div>
          <div>5-6</div>
        </div>
        <div className="menu-item class-spells-container">
          <div>Spell1</div>
          <div>Spell2</div>
          <div>Spell3</div>
        </div>
        <div className="menu-item subclass-spells-container">
          <div>Spell1</div>
          <div>Spell2</div>
          <div>Spell3</div>
        </div>
      </div>
    );
  }
}

export default App;
