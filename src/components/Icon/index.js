import React, { PropTypes } from 'react';

export default function Icon({ glyph, width = 16, height = 16, className = 'icon' }) {
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
