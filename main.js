const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

let products=[
    {
        barcode:"21345",
        name:'milk',
        price:"5",
        amount:'2',
        company:'tnova'
    },
    {
        barcode:"12345",
        name:'salt',
        price:"5",
        amount:'2',
        company:'salit'
    },
    {
        barcode:"12545",
        name:'milky',
        price:"5",
        amount:'2',
        company:'shtraos'
    },
    {
        barcode:"19345",
        name:'eggs',
        price:"10",
        amount:'2',
        company:'tnova'
    },
    {
        barcode:"12346",
        name:'bread',
        price:"7",
        amount:'2',
        company:'anjel'
    }
];
app.delete('/products/:barcode',(req,res)=>{
    products.forEach((product, index) =>{
        if(product.barcode === req.params.barcode){
            products.splice(index, 1);
            res.send(req.params.barcode + ' deleted');
        }
    });
});

app.put('/products/:barcode',(req,res)=>{
    products.forEach((product, index) =>{
        if(product.barcode === req.params.barcode){
            products[index] = req.body;
            res.send(req.body);
        }
    });
});

app.post('/products',(req,res)=>{
    for (let product of products){
        if(product.barcode === req.body.barcode){
            res.send("item already exist");
            return;
        }
    }
    products.push(req.body);
    res.send(req.body);
});

app.get('/products/:barcode',(req,res)=>{
    for(let product of products){
        if(product.barcode === req.params.barcode){
            res.send(product);
        }
    }
});

app.get('/products', (req, res) => {
    res.send(products);
});

app.get('/', (req, res) => {
    res.send('Hello');
});


app.listen(3001);