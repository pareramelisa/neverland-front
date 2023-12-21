import axios from "axios";
const BASE_API = process.env.NEXT_PUBLIC_API_URL;

export async function getAllBranches() {
  try {
    const response = await axios.get(`${BASE_API}/branch/all`);
    return response.data;
  } catch (error) {
    return false;
  }
}
