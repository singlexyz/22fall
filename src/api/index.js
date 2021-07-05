import axios from 'axios'

const headers = { authorization: '58b5cc72ae86e1b28c632fd4f9b4759f' }

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


export { fetchGroupList, fetchSelectedGroup, fetchFeedback }
