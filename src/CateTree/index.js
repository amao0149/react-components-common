import React, { Component } from 'react'
import propTypes from 'prop-types'
import './index.css'

import Tree from './Tree'

class CateTree extends Component {
	getChildContext() {
		return {
			addChildCate: this.addChildCate,
			removeCate: this.removeCate,
			editCate: this.editCate
		}
	}
	state = {
		data: root
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState((prevState) => {
				return {
					data: root
				}
			})
		}, 5000)
	}

	getItemFromPath(path) {
		let result = this.state.data
		if (path && Array.isArray(path)) {
			for(let index of path) {
				result =	result.children[index]
			}
		}
		return result
	}

	addChildCate = (data) => {
		const { item, path } = data
		console.log(this.getItemFromPath(path))

		if (!item.children) {
			item.children = []
		}
		item.children.push({id: Date.now(), name: `new${Date.now()}`}) // 大bug why ?
		this.setState({})

	}

	removeCate = (data) => {
		const {parent, index, path} = data
		console.log(this.getItemFromPath(path))

		if (!isNaN(index) && (index >= 0)) {
			parent.children.splice(index, 1)
			this.setState({})
		}
	}

	editCate = (data) => {
		const {item, newName, path} = data
		console.log(this.getItemFromPath(path))

		item.name = newName
		this.setState({})
	}

	render() {
		// console.log('render CateTree', this.state.data)
		return (
			<div className="catetree">
				<Tree data={this.state.data} />
			</div>
		)
	}
}

CateTree.defaultProps = {

}

CateTree.propTypes = {
}

CateTree.childContextTypes = {
	addChildCate: propTypes.func,
	removeCate: propTypes.func,
	editCate: propTypes.func
}

const root = 	{
	id: 0,
	name: '未分类',
	children: [
		{
			id: 1,
			name: '子分类1',
			children: [
				{
					id: 3,
					name: '孙分类1',
					children: [
						{
							id: 5,
							name: '曾孙分类1'
						},
						{
							id: 6,
							name: '曾孙分类2'
						}
					]
				},
				{
					id: 4,
					name: '孙分类2'
				}
			]
		},
		{
			id: 2,
			name: '子分类2',
			children: [
				{
					id: 7,
					name: '孙分类1'
				},
				{
					id: 8,
					name: '孙分类2'
				}
			]
		}
	]
}

export default CateTree
