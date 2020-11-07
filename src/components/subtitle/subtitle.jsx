import React from 'react';
import './subtitle.scss';

const Subtitle = ({ prefix, text }) => {
  return (
    <div className="subtitle">
      {prefix}&nbsp;<div className="subtitle-text">{text.toUpperCase()}</div>
    </div>
  );
};

export default Subtitle;