import axios from 'axios'

// const headers = { authorization: '250cabb4b2450fcf524cb3cd72b46e06' }

const headers = {}

const submitFromDetails = async (payload) => {
  try {
    const { data } = await axios.post('/form/submit', payload, { headers })
    return data
  } catch (e) {
    console.log(e)
  }
}

const fetchFromDetails = async () => {
  try {
    const { data } = await axios.post('/form/details', { uniqid: '22fallGroup' }, { headers })
    return data
  } catch (e) {
    console.log(e)
  }
}

const fetchFeedback = async () => {
  try {
    const { data } = await axios.get('/form/22fallGroup/groupList', { headers })
    return data
  } catch (e) {
    console.log(e)
  }
}

const fetchGroupList = async () => {
  try {
    const { data } = await axios.get('/form/22fallGroup/groupList', { headers })
    return data
  } catch (e) {
    console.log(e)
  }
}

const fetchSelectedGroup = async () => {
  try {
    const { data } = await axios.get('/form/22fallGroup/show', { headers })
    return data
  } catch (e) {
    console.log(e)
  }
}


export { submitFromDetails, fetchFromDetails, fetchGroupList, fetchSelectedGroup, fetchFeedback }
