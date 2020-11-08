import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import './level-selector-dropdown.scss';

const LevelSelectorDropdown = ({ onClickFunction }) => {
  return (
    <Dropdown className="level-selector-dropdown">
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        Level
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {[...Array(20)].map((val, idx) => {
          return (
            <Dropdown.Item key={idx} onClick={() => onClickFunction(idx+1)}>{idx+1}</Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LevelSelectorDropdown;