import axios from "axios";
const BASE_API = process.env.NEXT_PUBLIC_API_URL;

export async function createBooking(input) {
    try {
      const response = await axios.post(`${BASE_API}/booking/create`, input);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  