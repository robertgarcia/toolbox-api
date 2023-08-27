import exp from 'express';
import corsx from 'cors';

const app = exp();

const corsOptions = {
    origin: ['*'],
    optionsSuccessStatus: 200, // For legacy browser support
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH', 'OPTIONS']
};

app.use( corsx( corsOptions ) );
app.use(exp.json( { limit: '50mb' } ));
app.get('/', (req, res) => { 
    res.send('Hello World!');
});

export default app;