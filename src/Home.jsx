import React, { useState, useEffect } from 'react'
import Form from './Form'
import DefaultLayout from './layout/DefaultLayout.jsx'

import axios from 'axios'

import GlobalContext from './context/global'

const Home = function Home () {
  return (
    <GlobalContext.Consumer>
      {(value) => (
        <Form data={value} />
      )}
    </GlobalContext.Consumer>
  )
}

export default Home
