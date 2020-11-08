import React from 'react';
import SpellCell from '../spell-cell/spell-cell';

import './spell-cell-container.scss';

const SpellCellContainer = ({spells}) => (
  <div className="menu-item spells-container">
    {spells.map(spell => (
      <SpellCell key={spell.index || spell.spell.index} spellName={spell.name || spell.spell.name} />
    ))}
  </div>
)

export default SpellCellContainer;