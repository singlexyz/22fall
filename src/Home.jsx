import React, { useState, useEffect } from 'react'
import Form from './Form'
import Show from './Show'
import DefaultLayout from './layout/DefaultLayout.jsx'

import axios from 'axios'

const Home = function Home () {
  const [data, setData] = useState(null)
  useEffect(() => {
    console.log('fuck')
    axios.post('/form/details', {
      uniqid: '22fallGroup'
    }, { headers: { authorization: '58b5cc72ae86e1b28c632fd4f9b4759f', } })
    .then((res) => {
      console.log('res', res)
      setData(res.data)
    })
  }, [])
  return (
    <DefaultLayout>
      { 
        data ? <Form data={data} /> : <Show data={data} />
      }
    </DefaultLayout>
  )
}

export default Home
