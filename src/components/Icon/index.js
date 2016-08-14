import React, { Component } from 'react';

export default function Icon({ glyph, width = 16, height = 16, className = 'icon' }) {
  return (
    <svg className={className} width={width} height={height}>
      <use xlinkHref={glyph} />
    </svg>
  );
}
