import React from 'react';
import './subtitle.scss';

const Subtitle = ({ prefix, text }) => {
  return (
    <div className="subtitle">
      {`${prefix}${text}`}
    </div>
  );
};

export default Subtitle;