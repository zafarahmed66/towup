import axios from './axiosController'
import Cookies from 'js-cookie';

export async function signUpAsFleetOwner(form: any) {
  try {
    const response = await axios.post('/api/fleetowners/signup', form);
    return response
  } catch (error) {
    throw error
  }
}

export async function signUpAsRepoCompany(form: any) {
  try {
    const response = await axios.post('/api/repo-companies/signup', form);
    return response
  } catch (error) {
    throw error
  }
}

export async function signIn(form: any) {
  try {
    const response: any = await axios.post('/auth/login', form);
    return response
  } catch (error) {
    throw error
  }
}