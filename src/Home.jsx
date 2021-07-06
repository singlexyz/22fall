import React, { useEffect, useState } from 'react'
import Form from './Form'
import axios from 'axios'
import LoadingScreen from './view/LoadingScreen'
import { useHistory } from 'react-router-dom'

const Home = () => {
  const history = useHistory()
  const [data, setData] = useState(null)
  useEffect(() => {
    axios.post('/form/details', { uniqid: '22fallGroup' }, { headers: { authorization: '58b5cc72ae86e1b28c632fd4f9b4759f' } })
      .then(({ data: { data } }) => {
        if (data.formUser) {
          if ( data.info.group.length > 0 ) {
            history.replace('/qr')
          } else {
            history.replace('/group')
          }
        } else {
          setData(data)
        }
      })
  }, [])

  return (
    data ? <Form data={data} /> : <LoadingScreen />
  )
}

export default Home
