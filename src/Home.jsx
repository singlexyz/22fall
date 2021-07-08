import React, { useEffect, useState } from 'react'
import Form from './Form'
import LoadingScreen from './view/LoadingScreen'
import { useHistory } from 'react-router-dom'
import { fetchFromDetails } from './api'

const Home = () => {
  const history = useHistory()
  const [data, setData] = useState(null)
  useEffect(async () => {
    const { data, code } = await fetchFromDetails()
    if (code === 200) {
      if (data.formUser) {
        if (data.info.group.length > 0) {
          history.replace('/qr')
        } else {
          history.replace('/group')
        }
      } else {
        setData(data)
      }
    } else {
      alert(data.message)
    }
  }, [])

  return (
    data ? <Form data={data} /> : <LoadingScreen />
  )
}

export default Home
