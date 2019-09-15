const express = require('express');
const bodyParser = require('body-parser');
const bloqly = require('bloqly');

const keys = require('./keys.json');
const PRIVATE_KEY = keys.privateKey;//'x9oZ6jrUVEBDP5C0005fPseqPwLshQbb9io7Upg8sNM=';

const NODE_URL = 'http://localhost:8082';

const SPACE = 'space1';


async function createTransaction(KEY, data, tags) {
    let lastId = await bloqly.getLastId(NODE_URL, SPACE, KEY);

    const nonce = lastId.nonce + 1;

    let signedTransaction = bloqly.signTransaction(
        PRIVATE_KEY,
        SPACE,
        KEY,
        nonce,
        Date.now(),
        data,
        'memo',
        tags
    );
    
    console.log(signedTransaction)

    const encodedTransaction = bloqly.encodeTransaction(signedTransaction);

    const res = await bloqly.sendSignedTransaction(NODE_URL, encodedTransaction);

    console.log(res)
}

 
const app = express()
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.post('/register', async (req, res) => {
    const tags = req.body.needHelp ? ['needhelp'] : [];
    const key = req.body.name;
    const res = await createTransaction(key, req.body, tags)

    res.json({success: true, privateKey: '', tx: res});
});

app.get('/list', async (req, res) => {
    try {
        const list = await axios.get('http://localhost:8082/api/events/?tags=needhelp');
        res.json({success: true, list});
    } catch(ex) {
        res.json({success: false, error: ex.message});
    }
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});