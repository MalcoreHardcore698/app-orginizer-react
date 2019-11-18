import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Recipe from './Recipe'

class RecipesApp extends Component {
	constructor(props) {
		super(props)
		this.title = "Recipes App"
	}

	static propTypes = {
		recipes: PropTypes.array.isRequired
	}

	static defaultProps = {
		recipes: []
	}

	render() {
		const { recipes } = this.props
		return(
			<article>
				<header>
					<h1>{this.title}</h1>
				</header>

				<div className="recipes">
					{recipes.map((recipe, i) => <Recipe key={i} {...recipe} />)}
				</div>
			</article>
		)
	}
}

export default RecipesApp