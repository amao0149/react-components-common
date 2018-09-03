import React, { Component } from 'react'
import propTypes from 'prop-types'
import ItemLine from './ItemLine'


function List(props) {
	// console.log('render list')
	return (
		<ul className={props.hide ? 'hide' : 'show'}>
			{props.list.map((item, index) => {
				return <ListItem item={item} key={item.id} parent={props.item} index={index} path={props.path}/>
			})}
		</ul>
	)
}

class ListItem extends Component {
	state = {
		childrenHide: false
	}
	toggleChildren = () => {
		this.setState((prevState) => {
			return {
				childrenHide: !prevState.childrenHide
			}
		})
	}

	addChildCate(...args) {
		this.context.addChildCate(...args)
	}
	removeCate(...args) {
		this.context.removeCate(...args)
	}
	editCate(data) {
		this.context.editCate({...data, path: this.path})
	}

	ItemLineCommon = (props) => {
		const listItemData = this.props
		return (
			<ItemLine
				add={this.addChildCate.bind(this, {item: listItemData.item, path: this.path})}
				remove={this.removeCate.bind(this, {item: listItemData.item, parent: listItemData.parent, index: listItemData.index, path: this.path})}
				data={listItemData.item}
				edit={this.editCate.bind(this)}
				{...props}
			/>
		)
	}

	render() {
		const { props, state } = this
		this.path = [...(props.path)]
		if (!isNaN(props.index)) {
			this.path.push(props.index)
		}

		// console.log('render list item')
		const ItemLineCommon = this.ItemLineCommon

		if (!props.item.children) {
			return <li><ItemLineCommon /></li>
		}
		return (
			<li>
				<ItemLineCommon
					toggleChildren={this.toggleChildren}
					className="catetree-parent"
				/>
				<List list={props.item.children} item={props.item} hide={state.childrenHide} path={this.path} />
			</li>
		)
	}
}


ListItem.defaultProps = {

}

ListItem.propTypes = {
	addChildCate: propTypes.func,
	removeCate: propTypes.func,
	data: propTypes.object
}

ListItem.contextTypes = {
	addChildCate: propTypes.func,
	removeCate: propTypes.func,
	editCate: propTypes.func,
	path: propTypes.array
}

function Tree(props) {
	// console.log('render tree')
	return (
		<ul>
			<ListItem item={props.data} parent="root" path={[]}/>
		</ul>
	)
}

export default Tree
