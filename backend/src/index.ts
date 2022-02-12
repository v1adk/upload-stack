import express from 'express';


// rest of the code remains same
const app = express();
const PORT = 8000;
app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.post('/upload', function (req, res) {
  console.log(req.files); // the uploaded file object
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});