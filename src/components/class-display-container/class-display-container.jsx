import React from 'react';
import Subtitle from "../subtitle/subtitle";

import './class-display-container.scss';

const ClassDisplayContainer = ({ parentName, className }) => {
  return (
    <div className="menu-item class-display-box row">
      <Subtitle prefix="Class: " text={parentName || className} />
      {(parentName) && <Subtitle prefix="SubClass: " text={parentName && className} />}
    </div>
  );
};

export default ClassDisplayContainer;