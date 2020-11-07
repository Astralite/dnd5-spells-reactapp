import React, { Component } from "react";
import axios from "axios";
import toggleFullScreen from "./modules/fullscreen.js";

import "./App.scss";
import ClassesDropdown from "./components/classes-dropdown/classes-dropdown";
import InfoBox from "./components/info-box/info-box";
import Subtitle from "./components/subtitle/subtitle";

class App extends Component {
  constructor() {
    super();

    this.apiUrl = "https://www.dnd5eapi.co/api";
    this.state = {
      classes: [],
      selectedClass: {
        className: "",
        classIndex: "",
        parentName: "",
        parentIndex: "",
      },
    };

    this.selectClass = (className, classIndex, parentName, parentIndex) => {
      this.setState({ ...this.state, selectedClass: { className, classIndex, parentName, parentIndex } },
      this.updateClassInfo
      );
    }

    // Function returns the current information for either:
    // 1. The currently selected class if it is a primary class OR
    // 2. The currently selected class' parent if it is a subclass
    this.selectedClassInfo = () => this.state.classes.find(
      (dndClass) =>
        dndClass.index === this.state.selectedClass.classIndex
        || dndClass.index === this.state.selectedClass.parentIndex
    )

    this.updateClassInfo = () => {
      // const { classIndex, parentIndex } = this.state.selectedClass;
      const selectedClassIndex = this.state.selectedClass.classIndex;
      const selectedParentIndex = this.state.selectedClass.parentIndex;

      // If not already obtained then get spell information for this class
      // (or parent class in the case of subclass being selected)
      const primaryClassIndex = (selectedParentIndex || selectedClassIndex);
      const currentSpellInfo = this.selectedClassInfo().spells;
      if (typeof currentSpellInfo === "string" && currentSpellInfo.indexOf("/api") >= 0) {
        axios.get(this.apiUrl + "/classes/" + primaryClassIndex + "/spells")
        .then(({ data }) => {
          const classSpells = data.results;
          this.setState(
            {
              ...this.state,
              classes: this.state.classes.map((currentClassData) => {
                return currentClassData.index === primaryClassIndex
                  ? {...currentClassData, spells: classSpells}
                  : currentClassData;
              })
            }
          )
        })
      }

      // If the selected class is a subclass also retrieve subclass data
      if (selectedParentIndex) {
        const currentSubClassInfo = this.selectedClassInfo().subclasses.find(({ index }) => index === selectedClassIndex);
        console.log(currentSubClassInfo);
        console.log(typeof currentSubClassInfo === "object" && currentSubClassInfo.desc === undefined);
        if (typeof currentSubClassInfo === "object" && currentSubClassInfo.desc === undefined) {
          axios.get(this.apiUrl + "/subclasses/" + selectedClassIndex)
          .then(({ data }) => {
            const subClassData = data;
            this.setState(
              {
                ...this.state,
                classes: this.state.classes.map((currentClassData) => {
                  return currentClassData.index === selectedParentIndex // For the parent of the selected subclass...
                    ? {...currentClassData, subclasses: currentClassData.subclasses.map(currentSubClassData => { // Assign existing properties again plus Map through each subclass item
                      return currentSubClassData.index === selectedClassIndex // If the subclass item index matches the selected class index...
                        ? subClassData // Return the new item data
                        : currentSubClassData; // Otherwise return the old data
                    })}
                    : currentClassData;
                  })
              }
            )
          })
        }
      }
    }
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
          let newClassData = data;

          // Here we update the state's "classes" array replacing
          // current items with newer items using a map
          this.setState({
            ...this.state,
            classes: this.state.classes.map((currentClassData) => {
              return currentClassData.index === newClassData.index
                ? newClassData
                : currentClassData;
            })
          });
        });
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="toggle-fs" onClick={toggleFullScreen} />
        <h1 className="menu-item title">D&D Spells App</h1>

        <ClassesDropdown
          classes={this.state.classes}
          onClickFunction={this.selectClass}
        />
        <div className="menu-item class-display-box">
          <Subtitle prefix="Class: " text={this.state.selectedClass.parentName || this.state.selectedClass.className} />
          <Subtitle prefix="SubClass: " text={this.state.selectedClass.parentName && this.state.selectedClass.className} />
        </div>
        <InfoBox
          selectedClass={this.state.selectedClass}
          classInfo={this.selectedClassInfo()}
        />
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
