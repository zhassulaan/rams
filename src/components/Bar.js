import React, { useState } from 'react';
import Compass from './Compass';
import Chevron from './icons/Chevron';
import styled from 'styled-components';

function Bar({clickPrev, clickNext}) {
	// Current position of compass
	const [position, setPosition] = useState(0);

  // Number of compass directions
  const numDirections = 4;
	
  // Click events on the Previous and Next button
  function handlePrevBtn() {
		clickPrev();
		setPosition((prevPosition) => (prevPosition - 1 + numDirections) % numDirections);
  };
	function handleNextBtn() {
		clickNext();
		setPosition((prevPosition) => (prevPosition + 1) % numDirections);
	};

	return (
		<Wrapper>
			<div className='btn prev' onClick={ handlePrevBtn }>
				<Chevron />
			</div>
			<div className='roller'>
				<Compass degree={ position * -50 } />
			</div>
			<div className='btn next' onClick={ handleNextBtn }>
				<Chevron />
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: fixed;
	bottom: 0;
	display: flex;
	gap: 10px;
	z-index: 2;
	overflow: hidden;
	.prev,
	.next {
		display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: var(--clr-gold);
		path {
			fill: #212121;
		}
	}
	.next {
		transform: rotate(180deg);
	}
	.roller {
		position: relative;
    width: 380px;
    height: 39px;
    overflow: hidden;
	}
`;

export default Bar;
