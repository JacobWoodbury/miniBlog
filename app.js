import express from 'express'; 
import mariadb from 'mariadb';
import dotenv from 'dotenv';
import { validateForm } from './services/serverVal';

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

app.get('/', async(req, res) =>{
    const conn = await connect();
    res.render('home');
    const mkTable = await conn.query(`CREATE TABLE IF NOT EXISTS posts(
        id INTEGER AUTO_INCREMENT,
        author VarChar(255),
        title VarChar(255),
        content TEXT,
        created_at TIMESTAMP,
        PRIMARY KEY (id));`)
});


app.post('/submit', async(req, res) =>{
    const conn  = await connect();

    const post = {
        author : req.body.author,
        title : req.body.title,
        content : req.body.content,
        }
        const tStamp = Date();
    console.log(post);

    const insertQuery = await conn.query(`
    insert into posts
    (author,title,content,created_at)
    values(?,?,?, CURRENT_TIMESTAMP)`,
    [post.author,post.title,post.content])
        

    res.render('confirmation', { post } );
});

app.get('/entries', async(req, res) =>{
    const conn = await connect();
    const entries = await conn.query(`SELECT * FROM posts
        ORDER BY created_at DESC`);

    res.render('entries', {entries});
});

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});
