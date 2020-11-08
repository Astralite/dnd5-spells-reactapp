import React from 'react';

import './spell-cell.scss';

const SpellCell = ({ spellIndex, spellName, cellClickFunction }) => {
  return (
    <div className="spell-cell" onClick={() => cellClickFunction(spellIndex)}>
      {spellName}
    </div>
  );
};

export default SpellCell;