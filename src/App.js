import React, { useState } from 'react';
import './assets/styles/main.css';
import images from './assets/images/data.js';

function App() {
  const [imageIndex, setImageIndex] = useState(0);

  function handleImageChange(e) {
    let startX = e.clientX;
    console.log(e.clientX);

    function handleMouseMove(e) {
      const offsetX = e.clientX - startX;
      const newIndex = Math.abs(imageIndex + Math.floor(offsetX / 10)) % images.length;
      setImageIndex(newIndex);
      startX = e.clientX;
    }

    function handleMouseUp() {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  return (
    <div
      className='panorama'
      >
      <img
        className='panorama-image'
        src={ images[imageIndex] }
        alt='Panorama'
        draggable='false'
        onMouseDown={ handleImageChange }
      />
    </div>
  );
}

export default App;
