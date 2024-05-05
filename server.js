const express = require ('express'); 
const mysql = require('mysql2')
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smk'
});

connection.connect(error => {
    if (error) {
        console.log(error)
    };
    console.log('terhubung ke database smk')
})

app.get('/', (req, res) => {
    const qstring = "SELECT * FROM siswa";
    connection.query(qstring, (err,data) => {
        if (err) {
            console.log("error:", err);
            res.status(500).send({
                message : err.message || "Terjadi kesalahan saat get data"
            });
        }
        else res.send(data)
    })
});


app.post('/', (req,res) => {
    // const siswaBaru = req.body;
    const {idsiswa,nama,angkatan,jurusan} = req.body

    connection.query("INSERT INTO siswa values (?,?,?,?) ", [idsiswa,nama,angkatan,jurusan], (err) => {
        if (err) {
            console.log("error :", err);
            res.status(500).send({
                message : err.message || "Terjadi kesalahan saat insert data"
            });
        }
        else
            res.send(req.body)
    })
});

app.get('/:idsiswa', (req, res) => {
    const qstring = `SELECT * FROM siswa WHERE idsiswa = '${req.params.idsiswa}'`;
    connection.query(qstring, (err,data) => {
        if (err) {
            console.log("error:", err);
            res.status(500).send({
                message : err.message || "Terjadi kesalahan saat get data"
            });
        }
        else res.send(data)
    })
});

app.put('/:idsiswa', (req,res) => {
    const idsiswa = req.params.idsiswa;
    const swa = req.body;
    const qstring = `UPDATE siswa 
                    SET nama = '${swa.nama}', angkatan = '${swa.angkatan}', jurusan = '${swa.jurusan}'
                    WHERE idsiswa = '${idsiswa}'`
    connection.query(qstring, (err,data) => {
        if(err) {
            res.status(500).send({
                message: "Error updating siswa with idsiswa" + idsiswa
            });
        }
        else if(data.affectedRows ==0){
            res.status(404),send({
                message: `Not found siswa with idsiswa ${idsiswa}.`
            });
        }
        else {
            console.log("update siswa: ", {idsiswa: idsiswa, ...swa});
            res.send({idsiswa: idsiswa, ...swa});
        }
    })
})

app.delete('/:idsiswa', (req,res) => {
    const idsiswa = req.params.idsiswa
    const qstring = `DELETE FROM siswa WHERE idsiswa = '${idsiswa}'`
    connection.query(qstring, (err, data) => {
        if(err) {
            res.status(500).send({
                message: "Error deleting siswa with idsiswa " + idsiswa
            });
        }
        else if (data.affectedRows == 0){
            res.status(404).send({
                message: `Not found siswa with idsiswa ${idsiswa}.`
            });
        }
        else res.send(`siswa dengan idsiswa = ${idsiswa} telah terhapus`)
    });
})


app.get('/', (req, res) => {
    res.send('server page')
});

app.listen(port, () => {
    console.log(`Server berjalan pada localhost:${port}`)
});