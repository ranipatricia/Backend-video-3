const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send(`Hello Express Backend`);

});


app.get('/junkfood', (req, res) => {
    res.send(`Hello rani`);

});

//params 1
app.get('/junkfood/:makanan', (req, res) => {
    const makanan =req.params.makanan;

    res.send(`pesanan makanan: ${makanan} sedang diatar`);

});

//params 2
app.get('/junkfood/:makanan/:minuman', (req, res) => {
    const makanan = req.params.makanan;
    const minuman = req.params.minuman;

    res.send(`pesanan makanan: ${makanan} dan minuman: ${minuman} sedang diatar`);

});

//query 1
app.get('/get-junkfood-by-makanan', (req, res) => {
    const makanan = req.query.makanan;

    res.send(`pesanan makanan: ${makanan} sedang diantar`)
});
//query 2
app.get('/junkfood-makanan', (req, res) => {
    const makanan = req.query.makanan;
    const minuman = req.query.minuman;

    res.send(`pesanan makanan: ${makanan} dan minuman: ${minuman} sedang diantar`)
});

//body
app.use(express.json());

app.post('/junkfood', (req, res) => {
    const makanan = req.body.makanan;
    const minuman = req.body.minuman;
    const dessert = req.body.dessert;
    
    const msg ={status:"sukses",
                data:{"makanan":makanan, "minuman":minuman, "dessert":dessert}};

    res.send(msg)
}); 

app.post('/', (req, res) => {
    res.send(`Post Data`);
});

app.put('/', (req, res) => {
    res.send(`Update data Sukses`);
});

app.delete('/', (req, res) => {
    res.send(`Hapus data berhasil`);
});


app.listen(port, () => {
    console.log(`server berjalan pada localhost:${port}`);
});