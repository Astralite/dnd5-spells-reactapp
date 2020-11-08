import React from 'react';

import SpellSlotsItem from '../spell-slots-item/spell-slots-item.jsx';
import './spell-slots.scss';

const SpellSlots = ({ levelInfo, selectedLevel }) => {
  const DnD5MaxSpellLevel = 9;

  // Extract all level info objects for the selected level and assign them to an array
  // This is necessary since there may be multiple level info objects for a given level
  const levelInfos = levelInfo.filter(info => info.level === selectedLevel);
  // Now find the spellcasting info from this array
  const spellCastingInfo = levelInfos.reduce((acc, info) => ((info.hasOwnProperty('spellcasting')) ? info.spellcasting : acc), null);
  
  // If the selected class has spell slots...
  if (spellCastingInfo) {

    let itemsToDisplay = [];
    let totalSpellSlots = 0;
    for (let level = 1; level <= DnD5MaxSpellLevel; level++)  {
      let key = `spell_slots_level_${level}`;
      let numberOfSlots = spellCastingInfo[key];

      totalSpellSlots += numberOfSlots || 0;
      if (numberOfSlots) {itemsToDisplay.push({key, level, info: numberOfSlots})};
    }

    return (
      <div className="menu-item spell-slots">
        <div>Number of Spell Slots (Total: {totalSpellSlots})</div>
        <div className="spell-slots-box">
          {
            itemsToDisplay.map((item) => 
              <SpellSlotsItem key={item.key} {...item} />
            )
          }
        </div>
      </div>
    )
  
  } else {
    return <div className="menu-item info-box">Class Has No Spell Slots</div>
  }

};

export default SpellSlots;