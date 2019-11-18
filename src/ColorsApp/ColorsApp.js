import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

const AddColorForm = ({ onNewColor=f=>f }) => {
	let _title, _color
	const submit = e => {
		e.preventDefault()
		onNewColor(_title.value, _color.value)
		_title.value = ''
		_color.value = '#000000'
		_title.focus()
	}

	return (
		<form onSubmit={submit}>
			<input ref={input => _title = input} type="text" placeholder="Enter color text" required />
			<input ref={input => _color = input} type="color" className="color-picker" required />
			<button>ADD</button>
		</form>
	)
}

const StarRating = ({ starsSelected=0, totalStars=5, onRate=f=>f }) =>
	<div className="star-rating">
		<div className="star-list">
			{
				[...Array(totalStars)].map((n, i) =>
				<Star key={i}
				      selected={i < starsSelected} 
					  onClick={() => onRate(i + 1)}
			    />)
			}
		</div>
		<p>{starsSelected} of {totalStars} stars</p>
	</div>

const Star = ({ selected=false, onClick=f=>f }) =>
	<div className={(selected) ? "star selected" : "star"} onClick={onClick}></div>

Star.propTypes = {
	selected: PropTypes.bool,
	onClick: PropTypes.func
}

const ColorList = ({ colors=[], onRemove=f=>f, onRate=f=>f }) =>
	<div className="color-list">
		{(colors.length === 0) ?
			<p>No Colors Listed. (Add a Color)</p> :
			colors.map(color =>
				<Color key={color.id}
					   {...color}
					   onRate={(rating) => onRate(color.id, rating)}
					   onRemove={() => onRemove(color.id)}
			    />
	 	)}
	</div>

const Color = ({ title, color, rating=0, onRemove=f=>f, onRate=f=>f }) =>
	<section className="color">
		<h1>{title}</h1>
		<button onClick={onRemove}><i className="fas fa-times"></i></button>
		<div className="color" style={{ backgroundColor: color }}></div>

		<div className="rating">
			<StarRating starsSelected={rating} onRate={onRate} />
		</div>
	</section>

class ColorsApp extends Component {
	constructor(props) {
		super(props)
		this.title = "Color App"
		this.state = {
			colors: [
				{
					"id": "0d0161b1-efba-4dd5-8fd7-bbf465a54029",
					"title": "ocean at dusk",
					"color": "#00c4e2",
					"rating": 5
				},
				{
					"id": "9242d546-2ec4-4b74-8b29-4fef364a0080",
					"title": "lawn",
					"color": "#26ac56",
					"rating": 3
				},
				{
					"id": "dcfd31c0-7625-4b15-ae3a-4eafd3c2b0b0",
					"title": "bright red",
					"color": "#ff0000",
					"rating": 0
				},
				{
					"id": "83ffe1de-b864-4c22-810f-98a51867a51b",
					"title": "turquoise",
					"color": "#30d5c8",
					"rating": 2
				}
			]
		}
		this.addColor = this.addColor.bind(this)
		this.rateColor = this.rateColor.bind(this)
		this.removeColor = this.removeColor.bind(this)
	}

	addColor(title, color) {
		const colors = [
			...this.state.colors,
			{
				id: v4(),
				title,
				color,
				rating: 0
			}
		]
		this.setState({colors})
	}

	rateColor(id, rating) {
		const colors = this.state.colors.map(color =>
			(color.id !== id) ?
				color :
				{
					...color,
					rating
				}
		)
		this.setState({colors})
	}

	removeColor(id) {
		const colors = this.state.colors.filter(
			color => color.id !== id
		)
		this.setState({colors});
	}

	render() {
		const { addColor, rateColor, removeColor } = this
		const { colors } = this.state
		return (
			<section>
				<header>
					<h1>{this.title}</h1>
				</header>

				<article className="colors">
					<AddColorForm onNewColor={addColor} />
					<ColorList colors={colors}
							   onRate={rateColor}
							   onRemove={removeColor} />
				</article>
			</section>
		)
	}
}

export default ColorsApp