import 'dotenv/config.js';
import express from 'express';
import postsRouter from './routes/postsRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/posts', postsRouter);
app.use('*', (req, res) => res.send('Blog API'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
