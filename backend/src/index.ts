import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';

// rest of the code remains same
const app = express();
const PORT = 8000;

// TODO if dev mode only
app.use(cors());

app.use(fileUpload());
app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.post('/upload', async function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  try {
    const files = Object.values(req.files);
    let index = 0;
    for (const file of files) {
      const uploadedFile = (file as fileUpload.UploadedFile);
      const uniqueFileName = `${uuidv4()}-${uploadedFile.name}`;

      console.debug(`saving file '${uniqueFileName}'`);

      // TODO extract into env and create if missing
      await uploadedFile.mv(`./file_uploads/${uniqueFileName}`);

      console.info(`${++index} of ${files.length} files uploaded`);
    }

  } catch (error) {
    console.error(error)
    return res.status(400).send('File upload failed.');
  }

  console.info('All files uploaded.')
  return res.send('Files uploaded.');
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});