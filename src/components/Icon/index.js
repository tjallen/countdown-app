import React, { PropTypes } from 'react';

export default function Icon({ glyph, width = 20, height = 20, className = 'icon' }) {
  return (
    <svg className={className} width={width} height={height}>
      <use xlinkHref={glyph} />
    </svg>
  );
}

Icon.propTypes = {
  glyph: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};
