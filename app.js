import express from 'express'; 
import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();


const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

async function connect() {
    try{
        const conn = await pool.getConnection();
        console.log('Connected to DB');
        return conn;
    } catch(err){
        console.log(`Error connecting to the database ${err}`)
    }
}
const app = express();


app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use (express.static('public'));


const PORT = 3000;

app.get('/', (req, res) =>{

    res.render('home');
});


app.get('/submit', (req, res) =>{
    const newPost = {
        author : req.body.author,
        title : req.body.title,
        content : req.body.content,
    }
console.log(newPost);
});

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});
