import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import debug from 'debug';
import route from './routes/index';

const app = express();

const Debug = debug('http');
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

route(app);

app.get('/', (req, res) => {
  return res.status(200).send({
    'message': 'Welcome, this is the beginning of all endpoints'
  });
});

app.get('*', (req, res) => {
    res.status(200).send({
        message: 'Welcome, there is an error'
    });
});


app.listen(port, () => Debug(`server has started on ${port}`));

export default app;
