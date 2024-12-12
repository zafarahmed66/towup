import axios from './axiosController'

export async function signUpAsFleetOwner(form: any) {
    try {
      const response = await axios.post('/api/fleetowners/signup', form);
      const { data } = response
      return data
    } catch (error) {
      throw error
    }
  }