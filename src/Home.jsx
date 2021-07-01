import React, { useMemo, useState, useEffect } from 'react'
import Form from './Form'
import DefaultLayout from './layout/DefaultLayout.jsx'

import axios from 'axios'

const Home = function Home () {
  const [data, setData] = useState(null)
  useEffect(() => {
    axios.post('/form/details', { uniqid: '22fallGroup' })
      .then((res) => setData(res.data))
  }, [])
  return (
    <DefaultLayout>
      { data && <Form data={data} /> }
    </DefaultLayout>
  )
}

export default Home
