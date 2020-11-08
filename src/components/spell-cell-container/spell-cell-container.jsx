import React from 'react';
import SpellCell from '../spell-cell/spell-cell';

import './spell-cell-container.scss';

const SpellCellContainer = ({ spells, cellClickFunction, colorStyle }) => {

  // Class and subclass spells data use two different formats
  // so here we format subclass data to be like that of class
  spells = spells.map(spell => (spell.index && spell) || spell.spell);

  // Sort the spells alphabetically
  spells = spells.sort((a, b) => (a.index < b.index) ? -1 : 1);

  return (
    <div className="menu-item spells-container">
      {spells.map(spell => (
        <SpellCell
          key={spell.index}
          spellIndex={spell.index}
          spellName={spell.name}
          cellClickFunction={cellClickFunction}
          colorStyle={colorStyle} />
      ))}
    </div>
  )
}

export default SpellCellContainer;