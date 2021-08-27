import React from 'react'

const PaginationWrapper = props => {
  const result = React.useState(props.page)

  return props.children(result)
}

export default PaginationWrapper
