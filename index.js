const express = require('express')
const app = express()

const port =process.env.PORT || 5000;
//userAubonee
//l1GGRRzpDqhkTXLb
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
    console.log(`task management is Running on port ${port}`);
  });
