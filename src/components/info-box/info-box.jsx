import React from 'react';

import InfoBoxItem from '../info-box-item/info-box-item';
import './info-box.scss';

const attributes = [
  {
    key: "hit_die",
    prefix: "Hit Die: "
  },
  {
    key: "proficiency_choices",
    prefix: "Proficiency Choices: "
  },
  {
    key: "proficiencies",
    prefix: ""
  },
  {
    key: "saving_throws",
    prefix: ""
  },
  {
    key: "starting_equipment",
    prefix: ""
  },
  {
    key: "class_levels",
    prefix: ""
  },
  {
    key: "subclasses",
    prefix: ""
  },
  {
    key: "spellcasting",
    prefix: ""
  },
  {
    key: "url",
    prefix: ""
  }
]

const InfoBox = ({ selectedClass, classInfo }) => {
  
  let displayAttributes = [];
  if (classInfo) {
    for (let i = 0; i < attributes.length; i++)  {
      let { key, prefix } = attributes[i];
      let info = classInfo[key];
      prefix = prefix || key + ": ";
      if (info) {displayAttributes.push({key, prefix, info})};
    }
    return (
      <div className="menu-item info-box">
        {
          displayAttributes.map((properties) => (
          <InfoBoxItem key={properties.key} {...properties} />
        )
        )}
      </div>
    )
  } else {
    return <div className="menu-item info-box">Nothing to see here.</div>
  }

};

export default InfoBox;