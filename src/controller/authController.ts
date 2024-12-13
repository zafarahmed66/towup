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

export async function signUpAsRepoCompany(form: any) {
  try {
    const response = await axios.post('/api/repo-companies/signup', form);
    const { data } = response
    return data
  } catch (error) {
    throw error
  }
}

export async function signIn(form: any) {
  try {
    const response = await axios.post('/api/auth/login', form);
    const { data } = response
    return data
  } catch (error) {
    throw error
  }
}