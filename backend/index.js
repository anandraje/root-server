const express = require('express');
const axios = require('axios');
const app = express();
const port = 5001; 
app.get('/api/:root', async (req, res) => {
  const { root } = req.params;




 
  const remoteUrl = `https://root-servers.org/root/${root}/json/`;

  try {
    
    const response = await axios.get(remoteUrl);


    res.json(response.data);
  } catch (err) {
  
    res.status(err.response?.status || 500).send('File not found or error fetching file');
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// const express = require('express');
// const path = require('path');
// const app = express();
// const port = 5001; // Choose your port

// // Serve static files (your JSON data)
// app.use(express.static('data'));

// // Define API endpoints
// app.get('/api/:root', (req, res) => {
//   const { root } = req.params;

//   // Sanitize the root parameter to remove any newlines or other unwanted characters
//   const sanitizedRoot = root.replace(/[^a-zA-Z0-9_-]/g, '');

//   const filePath = path.join(__dirname, 'data', `${sanitizedRoot}.json`);
//   res.sendFile(filePath, (err) => {
//     if (err) {
//       res.status(404).send('File not found');
//     }
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });