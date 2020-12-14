const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors');
const mainRouter = require('./routers/main')
const codecRouter = require('./routers/codec')
const port = 3003

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : 'tmp'
}))

app.use('/', mainRouter);
app.use('/codec', codecRouter);

app.listen(port, () => console.log(`Listening server http://localhost:${port} ...`));