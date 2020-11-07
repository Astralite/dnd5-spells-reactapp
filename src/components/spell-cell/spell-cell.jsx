import React from 'react';

import './spell-cell.scss';

const SpellCell = ({ spellName }) => {
  return (
    <div className="spell-cell">
      {spellName}
    </div>
  );
};

export default SpellCell;