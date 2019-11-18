import React from 'react';
import Ingredient from './Ingredient'
import Instructions from './Instructions'

const IngredientsList = ({ list }) =>
	<ul className="ingredients">
		{
			list.map((ingredient, i) =>
				<Ingredient key={i} {...ingredient} />)
		}
	</ul>

export default IngredientsList