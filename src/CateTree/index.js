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

	getItemFromPath(path, data) {
		let result = data
		if (path && Array.isArray(path)) {
			for(let index of path) {
				result =	result.children[index]
			}
		}
		return result
	}

	changeStateData(path, callback) {
		const clonedStateData = Object.assign({}, this.state.data)
		const clonedItem = this.getItemFromPath(path, clonedStateData)

		if (callback) {
			callback(clonedItem, clonedStateData)
		}
	}

	addChildCate = (data) => {
		const { item, path } = data

		this.changeStateData(path, (clonedItem, clonedStateData) => {
			if (!clonedItem.children) {
				clonedItem.children = []
			}
			clonedItem.children.push({id: Date.now(), name: `new${Date.now()}`})
			this.setState({
				data: clonedStateData
			})
		})
	}

	removeCate = (data) => {
		const {parent, index, path} = data

		this.changeStateData(path.slice(0, -1), (clonedItem, clonedStateData) => {
			if (!isNaN(index) && (index >= 0)) {
				clonedItem.children.splice(index, 1)
				this.setState({
					data: clonedStateData
				})
			} else {
				alert('不能删除此节点')
			}
		})
	}

	editCate = (data) => {
		const {item, newName, path} = data
		this.changeStateData(path, (clonedItem, clonedStateData) => {
			clonedItem.name = newName
			this.setState({
				data: clonedStateData
			})
		})
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
