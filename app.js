const express = require('express')
const path = require('path')
const port = process.env.PORT || 8000
const app = express();
const {compareSync, genSaltSync, hashSync} = require('bcryptjs')

const bodyParser = require('body-parser')

const awsClient = require('./awsSession');

const AWS = awsClient.connect(true)

// serve static assets normally
app.use('/', express.static(__dirname + '/dist'));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });

app.use( bodyParser.json() );

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('/healthcheck', function (request, response){
    response.send('Running')
});

app.post('/login', function (req, res){
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    if (req.body && req.body.username && req.body.password) {
        dynamodb.get({
            TableName: 'todoApp-capstone-users',
            Key: {
                uid: req.body.username
            }
        }, (err, data) => {
            if (err) {
                console.log(err);
                res.status(401).end()
            }
            else {
                if (data.Item) {
                    console.log('User found.');
                    if (compareSync(req.body.password, data.Item.password)) {
                        console.log('Password matched.')
                        res.json({
                            status: true,
                            username: req.body.username,
                            todos: data.Item.todos
                        })
                    } else {
                        console.log('Password rejected.')
                        res.status(401).json({
                            status: false,
                            todos: []
                        })
                    }
                } else {
                    console.log('User not found.')
                    res.status(401).json({
                        status: false,
                        todos: []
                    })
                }
            }
        })
    } else {
        res.status(400).end()
    }
});

app.put('/adduser', (req, res) => {
    var dynamodb = new AWS.DynamoDB.DocumentClient();
    let salt = genSaltSync(10);
    let hash = hashSync(req.body.password, salt);
    let dbObject = {
        uid: req.body.username,
        password: hash,
        todos: []
    };
    dynamodb.put({
        TableName: 'todoApp-capstone-users',
        Item: dbObject
    }, (err, data) => {
        if (err) res.status(401).send(err)
        else res.json(dbObject)
    })
});

app.post('/updatetodos', (req, res) => {
    var dynamodb = new AWS.DynamoDB.DocumentClient();
    dynamodb.get({
        TableName: 'todoApp-capstone-users',
        Key: {
            uid: req.body.username
        }
    }, (err, data) => {
        if (err) {
            console.log(e);
            res.status(401).end();
        } else {
            dynamodb.put({
                TableName: 'todoApp-capstone-users',
                Item: {
                    uid: data.Item.uid,
                    password: data.Item.password,
                    todos: req.body.todos
                }
            }, (err, data) => {
                if (err) res.send({status: false});
                else res.send({status: true})
            })
        }
    })
})

app.listen(port)
console.log("server started on port " + port)