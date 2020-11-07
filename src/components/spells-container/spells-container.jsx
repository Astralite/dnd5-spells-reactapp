import React from 'react';

import './spells-container.scss';

const SpellsContainer = ({spells}) => {
  console.log(spells);
  if (spells != null ) {
    return (
      <div className="menu-item spells-container">
        {spells.map(spell => (
          <div className="spell" key={spells.index}>{spell.name.slice(0,14)}</div>
        ))}
      </div>
    );
  } else {
    return ''
  }
};

export default SpellsContainer;