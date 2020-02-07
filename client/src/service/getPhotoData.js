import axios from "axios";

export default async () => {
  const response = await axios.get("/api/photos");
  return response.data;
};
