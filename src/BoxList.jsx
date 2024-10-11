import React, { useState } from 'react';
import NewBoxForm from './NewBoxForm';
import Box from './Box';

function BoxList() {
  const [boxes, setBoxes] = useState([]);

  const removeBox = keyName => {
    setBoxes(boxes.filter(box =>
      box.key !== keyName));
  }

  return (
    <div>
      <NewBoxForm addBox={setBoxes} />
      {boxes.map(box => (
        <Box
          key={box.key}
          id={box.key}
          backgroundColor={box.backgroundColor}
          width={box.width}
          height={box.height}
          removal={removeBox}
        />
      ))}
    </div>
  );
}
export default BoxList;