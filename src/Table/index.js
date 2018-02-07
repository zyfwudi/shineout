import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import hash from '../utils/hash'
import { tableClass } from '../styles'
import SimpleTable from './SimpleTable'
import SeperateTable from './SeperateTable'

class Table extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  renderSimple() {
    const { columns, children, data } = this.props

    return (
      <SimpleTable
        columns={columns}
        data={data}
      >
        {children}
      </SimpleTable>
    )
  }

  render() {
    const {
      striped, bordered, size, hover, height, columns, children,
      data, style, headerFixed, width,
    } = this.props
    const className = classnames(
      tableClass(
        '_',
        size,
        hover && !striped && 'hover',
        striped && 'striped',
        bordered && 'bordered',
        headerFixed && 'header-fixed',
      ),
      this.props.className,
    )

    return (
      <div className={className} style={style}>
        {
          headerFixed
          ? <SeperateTable height={height} width={width} columns={columns} data={data} />
          : <SimpleTable columns={columns} width={width} data={data}>{children}</SimpleTable>
        }
      </div>
    )
  }
}

Table.propTypes = {
  ...getProps('size', 'type', 'keygen'),
  bordered: PropTypes.bool,
  children: PropTypes.any,
  columns: PropTypes.array,
  data: PropTypes.array,
  headerFixed: PropTypes.bool,
  height: PropTypes.number,
  hover: PropTypes.bool,
  loading: PropTypes.bool,
  striped: PropTypes.bool,
  width: PropTypes.number,
}

Table.defaultProps = {
  ...defaultProps,
  headerFixed: false,
  hover: true,
}

const handleColumns = T => ({ columns, ...props }) => {
  if (!columns) return <T {...props} />
  const cols = columns.map((c) => {
    if (c.key) return c
    return Object.assign({}, c, { key: hash(c) })
  })
  return <T columns={cols} {...props} />
}

export default handleColumns(Table)