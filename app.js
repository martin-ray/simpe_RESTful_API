const express = require('express');
const mysql = require('mysql');

// Create connectiln
const db = mysql.createConnection({
    host    :   'localhost',
    user    :   'ray',
    password:   'son_of_frederic_chopin',
    database:   "rest_test" // comment out when createing database.
});

const app = express();


// Deal with cors access
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, access_token'
    )
  
    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
      res.send(200)
    } else {
      next()
    }
  }
  app.use(allowCrossDomain)

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Mysql connected...")
})

// create DB
app.get('/createdb',(req,res) => {
    let sql = 'CREATE DATABASE rest_test';
    db.query(sql, (err, result) => {
        if(err)throw err;
        console.log(result);
        res.send('Database created...');
    })
})

// Create table
app.get('/createpoststable', (req,res)=> {
    let sql = "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
    db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    })
})

// Insert post 1
app.get('/addpost1', (req,res) => {
    let post = {title: 'Post One', body: 'This is post number one'};
    let sql = ' INSERT INTO posts SET ?';
    let query = db.query(sql,post,(err, result) => {
        if(err) throw err;
        console.log('Post 1 added');
        res.send('Post 1 added...');
    })
})

// Insert post2
app.get('/addpost2', (req,res) => {
    let post = {title: 'Post two', body: 'This is post number two'};
    let sql = ' INSERT INTO posts SET ?';
    let query = db.query(sql,post,(err, result) => {
        if(err) throw err;
        console.log('Post 2 added');
        res.send('Post 2added...');
    })
})

// Select post
app.get('/getposts', (req,res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql,(err,results) => {
        if(err) throw err;
        console.log(results);
        ret = JSON.stringify(results);
        res.send(ret);
    })
})



// Select single post
app.get('/getposts/:id', (req,res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql,(err,results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched....');

    })
})


// select a reace
app.get('/getodds/:place/:race', (req,res) => {
    // let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    // let query = db.query(sql,(err,results) => {
    //     if(err) throw err;
    //     console.log(results);
    //     res.send('Posts fetched....');
    ret = "you get odds" + String(req.params.place) + String(req.params.race);
    res.send(ret);
    console.log(req.params.place,req.params.race);
})

app.post('/gettoddsbypost', (req,res) => {

})



app.listen('3000',() => {
    console.log('server started on port 3000');
});