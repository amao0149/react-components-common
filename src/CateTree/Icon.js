import React from 'react';
import propTypes from 'prop-types'
import { Delete, AddCircleOutline, Edit, Check, Cancel } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import { Tooltip } from '@material-ui/core'

const iconComponents = {
	add: {
		component: AddCircleOutline,
		title: '添加子分类'
	},
	remove: {
		component: Delete,
		title: '删除当前分类(包括子分类)'
	},
	edit: {
		component: Edit,
		title: '编辑名称'
	},
	check: {
		component: Check,
		title: '确认修改'
	},
	cancel: {
		component: Cancel,
		title: '取消修改'
	}
}

const styles = theme => ({
  root: {
    color: theme.palette.text.primary,
  },
  icon: {
    marginLeft: theme.spacing.unit,
    fontSize: 16,
    cursor: 'pointer'
  },
})


function Icon(props) {
	// console.log('render icon')
	const Icon = iconComponents[props.type].component
	return (
		<Tooltip title={iconComponents[props.type].title} placement="bottom">
			<Icon className={props.classes.icon} onClick={props.action} />
		</Tooltip>
	)
}

Icon.defaultProps = {

}

Icon.propTypes = {
	type: propTypes.string,
	classes: propTypes.object
}

export default withStyles(styles)(Icon)
