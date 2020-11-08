import React from 'react';

import './spell-cell.scss';

const SpellCell = ({ spellIndex, spellName, cellClickFunction, colorStyle }) => {
  return (
    <div className={`spell-cell ${colorStyle}`} onClick={() => cellClickFunction(spellIndex)}>
      {spellName}
    </div>
  );
};

export default SpellCell;