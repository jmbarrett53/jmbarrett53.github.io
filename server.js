const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();

app.use(cors({
  origin:'https://jmbarrett53.github.io',
  methods: ['GET', 'POST'],
}));

app.use(express.json());

app.post('/location', (req, res) => {
  const { latitude, longitude } = req.body;

  exec(`python buccees_locator.py ${latitude} ${longitude}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send('Python script error');
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      res.status(500).send('Python script error');
      return;
    }

    console.log(`Python Output: ${stdout}`);
    res.send(stdout); // send the python script output back to the client
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
