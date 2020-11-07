import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import './classes-dropdown.scss';

const ClassesDropdown = ({ classes, onClickFunction }) => {
  return (
    <div className="menu-item classes-dropdown">
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          Class / SubClass
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {classes.map(dndClass => {
            // Prepare the sublasses for inclusion underneath each primary dnd Class
            const subClassItems = dndClass.subclasses && dndClass.subclasses.map(subClass => (
              <Dropdown.Item key={subClass.index} onClick={() => {onClickFunction(subClass.name, subClass.index, dndClass.name, dndClass.index)}}>{subClass.name}</Dropdown.Item>
            ))
            return (
              <React.Fragment key={dndClass.index}>
                <Dropdown.Item key={dndClass.index} onClick={() => {onClickFunction(dndClass.name, dndClass.index, '', '')}}>{dndClass.name}</Dropdown.Item>
                {subClassItems}
                <Dropdown.Divider />
              </React.Fragment>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ClassesDropdown;