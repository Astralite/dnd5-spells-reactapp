import React from 'react';

import './info-box-item.scss';

const InfoBoxItem = ({ prefix, info }) => {
  return (
    <div className='info-box-item'>
      {`${(prefix) ? prefix : ''}${info}`}
    </div>
  );
};

export default InfoBoxItem;