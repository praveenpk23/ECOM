import express from 'express';
import products from './data/products.js';
import cors from 'cors'
const app = express();
const PORT = 5000;
const allowOrigins = ['http://localhost:5173']
app.use(cors({origin:(origin,callback)=>{
    if(!origin || origin.includes(allowOrigins) ){
        callback(null,true)
    }else{
        callback('Not allowed by CORS');
    }
}}));

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.get('/api/products', (req, res) => {
    res.send(products);
})
app.get(`/api/products/:id`, (req, res) => {
    const product = products.find(p => p._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
})


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})