import React, { Component } from "react";
import axios from "axios";
import toggleFullScreen from "./modules/fullscreen.js";

import "./App.scss";
import ClassesDropdown from "./components/classes-dropdown/classes-dropdown";
import InfoBox from "./components/info-box/info-box";
import ClassDisplayContainer from './components/subtitle-container/subtitle-container';
import SpellCellContainer from './components/spell-cell-container/spell-cell-container';
import LevelSelectorDropdown from './components/level-selector-dropdown/level-selector-dropdown';
import SpellSlots from './components/spell-slots/spell-slots';
import SpellModal from './components/spell-modal/spell-modal';

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
      selectedLevel: 1,
      selectedSpell: '',
      levelInfo: {},
      spellInfo: {},
      showModal: true
    };

    this.toggleModal = () => {
      this.setState({ ...this.state, showModal: !this.state.showModal });
    }

    this.hideModal = () => {
      this.setState({ ...this.state, showModal: false });
    }

    this.showModal = () => {
      this.setState({ ...this.state, showModal: true });
    }
    
    this.selectSpell = (selectedSpell) => {
      this.setState({ ...this.state, selectedSpell }
      ,this.showModal
      );
    }

    this.selectClass = (className, classIndex, parentName, parentIndex) => {
      this.setState({ ...this.state, selectedClass: { className, classIndex, parentName, parentIndex } }
      ,this.updateClassInfo
      );
    }

    this.selectLevel = (selectedLevel = 1) => {
      this.setState({ ...this.state, selectedLevel },
      this.updateLevelInfo
      );
    }

    // Function returns the current information for either:
    // 1. The currently selected class if it is a primary class OR
    // 2. The currently selected class' parent if it is a subclass
    this.selectedClassInfo = () => this.state.classes.find(
      (dndClass) => (
        dndClass.index === this.state.selectedClass.classIndex
        || dndClass.index === this.state.selectedClass.parentIndex
      )
    )

    // Function returns the current information for selected subclass or undefined
    // if selected class is not a subclass or not found in the parent
    this.selectedSubClassInfo = () => {
      if (!this.state.selectedClass.parentIndex) return undefined;
      const { subclasses } = this.selectedClassInfo();
      return subclasses.find(subClass => (
        subClass.index === this.state.selectedClass.classIndex
      ))
    }

    // Retrieve updated data for the selected class
    this.updateClassInfo = () => {
      const selectedClassIndex = this.state.selectedClass.classIndex;
      const selectedParentIndex = this.state.selectedClass.parentIndex;
      const primaryClassIndex = (selectedParentIndex || selectedClassIndex);
      // If not already obtained then get spell information for this class
      // (or parent class in the case of subclass being selected)
      const currentSpellInfo = this.selectedClassInfo().spells;
      if (typeof currentSpellInfo === "string" && currentSpellInfo.indexOf("/api") >= 0) { // if we haven't retrieved spell info yet...
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

          // Retrieve information for each spell
          let promises = [];
          for (let i = 0; i < classSpells.length; i++) {
            console.log(classSpells[i].index);
            promises.push(axios.get(`${this.apiUrl}/spells/${classSpells[i].index}`));
          }
          
          // Resolve promises and add the data to state
          axios.all(promises).then((responses) => {
            responses.forEach(({ data }) => {
              let newSpellInfo = data;
              let spellInfo = this.state.spellInfo;
              spellInfo[newSpellInfo.index] = newSpellInfo;

              this.setState(
                {
                  ...this.state,
                  spellInfo
                }
              )
            })
          })

        })
      }

      // If the selected class is a subclass also retrieve subclass data
      // Overwrite the old subclass properties for selected subclass with the new ones
      if (selectedParentIndex) {
        const currentSubClassInfo = this.selectedClassInfo().subclasses.find(({ index }) => index === selectedClassIndex);
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

      // Also update spellSlot info
      this.updateLevelInfo();
    }

    this.updateLevelInfo = () => {
      const primaryClassIndex = this.state.selectedClass.parentIndex || this.state.selectedClass.classIndex;
      if(!primaryClassIndex) return undefined;
      const currentSpellSlotInfo = this.state.levelInfo[primaryClassIndex];
      // If not already obtained then get spell slot information for this class
      // (or parent class in the case of subclass being selected)
      if (typeof currentSpellSlotInfo === "undefined") {
        axios.get(this.apiUrl + "/classes/" + primaryClassIndex + "/levels")
        .then(({ data }) => {

          let levelInfo = this.state.levelInfo;
          levelInfo[primaryClassIndex] = data;
          this.setState(
            {
              ...this.state,
              levelInfo
            }
          )

        })
      }
    }

    this.updateSpellInfo = () => {

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
        <h1 className="menu-item title">D&D Spells</h1>

        <div className="menu-item selectors-container row">
          <ClassesDropdown
            classes={this.state.classes}
            onClickFunction={this.selectClass}
          />
          <LevelSelectorDropdown
            onClickFunction={this.selectLevel}
          />
        </div>

        <ClassDisplayContainer {...this.state.selectedClass} selectedLevel={this.state.selectedLevel} />

        <InfoBox
          classInfo={this.selectedClassInfo()}
        />

        {
          this.state.levelInfo[this.state.selectedClass.parentIndex || this.state.selectedClass.classIndex]
          && <SpellSlots 
              selectedLevel={this.state.selectedLevel}
              levelInfo={this.state.levelInfo[this.state.selectedClass.parentIndex || this.state.selectedClass.classIndex]}
            />
        }

        <h4 className="menu-item title">Class Spells</h4>
        {
          this.selectedClassInfo() // If there is class info available...
          && typeof this.selectedClassInfo().spells === "object" // and the class object returned has a spells property...
          && <SpellCellContainer spells={this.selectedClassInfo().spells} cellClickFunction={this.selectSpell} /> // render SpellsContainer with spells from selected class
        }

        <h4 className="menu-item title">SubClass Spells</h4>
        {
          this.selectedSubClassInfo() // If there is subclass info available...
          && typeof this.selectedSubClassInfo().spells === "object" // and the subclass object returned has a spells property...
          && <SpellCellContainer spells={this.selectedSubClassInfo().spells} cellClickFunction={this.selectSpell} /> // render SpellsContainer with spells from selected subclass
        }

        {this.state.selectedSpell // If a spell has been selected
        && <SpellModal
          show={this.state.showModal}
          onHide={this.hideModal}
          heading={this.state.selectedSpell}
          content={this.state.selectedSpell}
        />}

      </div>
    );
  }
}

export default App;