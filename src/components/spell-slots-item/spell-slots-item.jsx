import React from 'react';

import './spell-slots-item.scss';

const SpellSlotsItem = ({ level, info }) => {
  return (
    <div className='spell-slots-item'>
      <div className='slot-title'>{`Lvl. ${level}`}</div>
      <div className='content'>{info}</div>
    </div>
  );
};

export default SpellSlotsItem;