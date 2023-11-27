import React from 'react';
import '../assets/styles/compass.scss';

function Compass({ degree }) {
	const directions = ['e', 's', 'w', 'n', 'e', 's']; // Compass directions
	const lineTypes = []; // Line types
	for (let i = 0; i < 11; i++) {
		lineTypes.push(i % 2 === 0 ? 'small' : 'big');
	}

	return (
		<div class='compass' style={{ transform: `translateX(${ degree }%)` }}>
			{ directions.map((direction, index) => (
				<div key={ index } className='compass-direction'>
					{ lineTypes.map((lineType, lineIndex) => (
            <div
							key={ lineIndex }
							className={ `compass-direction__line--${ lineType }` }
						>|</div>
          )) }
					<div class='compass-direction__text'>{ direction }</div>
				</div>
			)) }
		</div>
	);
}

export default Compass;
