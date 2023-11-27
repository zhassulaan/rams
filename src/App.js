import React, { useState } from 'react';
import Bar from './components/Bar.js';
import images from './assets/images/data.js';
import './assets/styles/main.scss';

function App() {
  const [imageIndex, setImageIndex] = useState(0);
  const mainImageIndices = [0, 18, 49, 86];

  function handleImageChange(e) {
    let startX = e.clientX;

    function handleMouseMove(e) {
      console.log(e.clientX);
      console.log(startX);
      const offsetX = e.clientX - startX;
      const newIndex = (imageIndex + Math.floor(offsetX / 10) + images.length) % images.length;
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

  function handlePrevClick() {
    const currentIndex = mainImageIndices.indexOf(imageIndex);

    if (currentIndex > 0) {
      const newIndex = mainImageIndices[currentIndex - 1];
      smoothTransition(imageIndex, newIndex);
    } else {
      const newIndex = mainImageIndices[3];
      smoothTransition(imageIndex, newIndex);
    }
  }
  
  function handleNextClick() {
    const currentIndex = mainImageIndices.indexOf(imageIndex);

    if (currentIndex < mainImageIndices.length - 1) {
      const newIndex = mainImageIndices[currentIndex + 1];
        smoothTransition(imageIndex, newIndex);
    } else {
      const newIndex = mainImageIndices[0];
        smoothTransition(imageIndex, newIndex);
    }
  }

  function smoothTransition(startIndex, endIndex) {
    const duration = 1000;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      let newIndex = 0;

      if (startIndex === 86 && endIndex === 0) {
        newIndex = Math.round(startIndex + progress * (1 - startIndex));
      } else if (startIndex === 0 && endIndex === 86) {
        newIndex = Math.round(startIndex + progress * (images.length - 1 - endIndex));
      } else {
        newIndex = Math.round(startIndex + progress * (endIndex - startIndex));
      }
      setImageIndex(newIndex);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  return (
    <div
      className='panorama'
      onMouseDown={ handleImageChange }
    >
      <img
        key={ imageIndex }
        className='panorama-image'
        src={ images[imageIndex] }
        alt={ `Panorama ${ imageIndex }` }
        draggable='false'
      />
      <Bar
        clickPrev={ handlePrevClick }
        clickNext={ handleNextClick }
      />
    </div>
  );
}

export default App;
