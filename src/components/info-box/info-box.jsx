import React from 'react';

import './info-box.scss';

const InfoBox = ({ selectedClass, classInfo }) => {
  
  if (classInfo) {

    console.log(classInfo);

    const { hit_die, proficiencies, proficiency_choices, saving_throws } = classInfo;

    return (
      <div className="menu-item info-box">

        <div className="hit-die">
          <span>Hit Die:</span> {hit_die}
        </div>

        <div className="saving-throws">
          <span>Savings Throws:</span>

          {saving_throws.map(sT => (
            <div key={sT.index} className="saving-throw">
              {sT.name}
            </div>
          ))}
        </div>

        <div className="proficiencies">
          <span>Proficiencies:</span>

          {proficiencies.map(proficiency => (
            <div key={proficiency.index} className="proficiency">
              {proficiency.name}
            </div>
          ))}
        </div>

        <div className="proficiency-choices">
          <span>Proficiency Choices: </span>

          {proficiency_choices[0].from.map(choice => (
            <div key={choice.index} className="proficiency">
              {choice.name}
            </div>
          ))}
        </div>

      </div>
    )
  } else {
    return <div className="menu-item info-box">No Class Selected</div>
  }

};

export default InfoBox;