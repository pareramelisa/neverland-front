import axios from "axios";
const BASE_API = process.env.NEXT_PUBLIC_API_URL;

export async function userRegister(input) {
  const response = await axios.post(`${BASE_API}/user/register`, input);
  return response.data;
}

export async function userLogin(input) {
  const response = await axios.post(`${BASE_API}/user/login`, input);
  return response.data;
}

export async function getUserById(id) {
  try {
    const response = await axios.get(`${BASE_API}/user/${id}`);
    return response.data;
  } catch (error) {
    return false;
  }
}
