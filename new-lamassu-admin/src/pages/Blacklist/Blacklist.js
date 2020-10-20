import React from 'react'

import DataTable from 'src/components/tables/DataTable'
// import { useHistory } from 'react-router-dom'

const Blacklist = () => {
  // const history = useHistory()

  const elements = [
    {
      header: 'Cryptocode',
      width: 180,
      textAlign: 'center',
      size: 'sm'
    },
    {
      header: 'Address',
      width: 380,
      textAlign: 'center',
      size: 'sm'
    },
    {
      header: 'Created by Operator',
      width: 180,
      textAlign: 'center',
      size: 'sm'
    }
  ]

  return (
    <div>
      <h1>Hello from Blacklist</h1>
      <DataTable elements={elements} />
    </div>
  )
}

export default Blacklist
