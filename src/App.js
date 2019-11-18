import React, { Component } from 'react';
import RecipesApp from './RecipesApp/RecipesApp'
import ColorsApp from './ColorsApp/ColorsApp'

import data from './RecipesApp/data/recipes'
import './App.css'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentPage: 0
		}
		this.hundleClick = this.hundleClick.bind(this)
	}

	hundleClick(pageId) {
		this.setState({ currentPage: pageId });
	}

	render() {
		let renderPage;

		if (this.state.currentPage == 0) renderPage = <RecipesApp recipes={data} />
		if (this.state.currentPage == 1) renderPage = <ColorsApp />

		return(
			<div className="page">
				<nav className="navigation">
					<h1 onClick={() => this.hundleClick(0)}>React Learn</h1>
					<button onClick={() => this.hundleClick(0)}>RecipesApp</button>
					<button onClick={() => this.hundleClick(1)}>ColorsApp</button>
					<p>All rights reserved &copy; 2019</p>
				</nav>

				<main className="content">
					{renderPage}
				</main>
			</div>
		)
	}
}

export default App;