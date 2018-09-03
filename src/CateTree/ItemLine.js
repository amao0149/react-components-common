import React, { Component } from 'react'
import propTypes from 'prop-types'
import Icon from './Icon'

class ItemLine extends Component {
	state = {
		status: 'show',
		value: this.props.data.name
	}
	editCate = () => {
		this.setState({status: 'edit'})
	}
	confirmEdit = (item) => {
		this.props.edit({item, newName: this.state.value})
		this.setState({status: 'show'})
	}
	cancelEdit = () => {
		this.setState({status: 'show', value: this.props.data.name})
	}
	inputChange = (e) => {
		this.setState({
			value: e.target.value
		})
	}
	render() {
		const { props, state } = this
		const { add, remove } = props

		return (
			((state.status === 'show') && (
				<div>
					{props.children}
					<span onClick={props.toggleChildren} className={props.className}>{state.value}</span>
					<Icon type="add" action={add} />
					<Icon type="remove" action={remove} />
					<Icon type="edit" action={this.editCate} />
				</div>
			)) ||
			((state.status === 'edit') && (
				<div>
					{props.children}
					<input type="text" value={state.value} onChange={this.inputChange} />
					<Icon type="check" action={this.confirmEdit.bind(this, props.data)} />
					<Icon type="cancel" action={this.cancelEdit} />
				</div>
			))
		)
	}
}

ItemLine.defaultProps = {

}

ItemLine.propTypes = {
	data: propTypes.object,
	add: propTypes.func,
	remove: propTypes.func,
	edit: propTypes.func
}

export default ItemLine
