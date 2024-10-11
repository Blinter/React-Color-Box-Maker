import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function invertedColor(color) {
  const tempElement = document.createElement('div');
  tempElement.style.color = color;
  document.body.appendChild(tempElement);  
  const computedColor = window.getComputedStyle(tempElement).color;
  document.body.removeChild(tempElement);
  const rgbMatch = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(computedColor);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }
  return '#000000';
}

function Box({ id, backgroundColor, width, height, removal }) {
  const [parentKey, setParentKey] = useState(null);
  useEffect(() => {
    setParentKey(id);
  }, [id]);
  const handleRemove = () => { 
    removal(parentKey); 
  };
  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative'
      }}>
      <button
        style={{ 
          position: "absolute", 
          top: 0,
          right: 0, 
          color: invertedColor(backgroundColor),
          fontSize: '14px',
          border: "1px",
          cursor: "grab",
          backgroundColor: "transparent" }}
        onClick={handleRemove}>X</button>
    </div>
  );
}

Box.propTypes = {
  id: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  removal: PropTypes.func.isRequired
};

export default Box;