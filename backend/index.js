const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

const cache = new NodeCache({ stdTTL: 60 });

// Enable CORS for all routes
app.use(cors());

app.get('/api/:root', async (req, res) => {
  const { root } = req.params;
  const remoteUrl = `https://root-servers.org/root/${root}/json/`;

  try {
    let data = cache.get(remoteUrl);
    if (!data) {
      const response = await axios.get(remoteUrl);
      data = response.data;
      cache.set(remoteUrl, data);
    }
    res.json(data);
  } catch (err) {
    console.error(`Error fetching data from ${remoteUrl}:`, err.message);
    res.status(err.response?.status || 500).send('File not found or error fetching file');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
