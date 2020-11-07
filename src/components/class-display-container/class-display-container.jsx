import React from 'react';
import Subtitle from "../subtitle/subtitle";

const ClassDisplayContainer = ({ parentName, className }) => {
  return (
    <div className="menu-item class-display-box">
      <Subtitle prefix="Class: " text={parentName || className} />
      {
        (parentName)
        ? <Subtitle prefix="SubClass: " text={parentName && className} />
        : ''
      }
    </div>
  );
};

export default ClassDisplayContainer;