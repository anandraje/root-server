// api/fetchData.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { fileName } = req.query;
    const response = await axios.get(`https://root-servers.org/root/${fileName}/json/`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
