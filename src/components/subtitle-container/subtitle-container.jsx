import React from 'react';
import Subtitle from "../subtitle/subtitle";

import './subtitle-container.scss';

const SubTitleDisplayContainer = ({ parentName, className, selectedLevel }) => {
  return (
    <div className="menu-item class-display-box row">
      <Subtitle prefix="Class: " text={parentName || className} />
      {(parentName) && <Subtitle prefix="SubClass: " text={parentName && className} />}
      {(selectedLevel) && <Subtitle prefix="Level: " text={selectedLevel.toString()} />}
    </div>
  );
};

export default SubTitleDisplayContainer;