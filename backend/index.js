const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bloqly = require('./bloqly');


const keys = require('./keys.json');
//const PRIVATE_KEY = keys.privateKey;//'x9oZ6jrUVEBDP5C0005fPseqPwLshQbb9io7Upg8sNM=';

const NODE_URL = 'http://localhost:8082';

const SPACE = 'space1';


async function createTransaction(privateSecret, key, data, tags) {
    console.log('getting lastIt', NODE_URL, SPACE, key);
    let lastId = await bloqly.getLastId(NODE_URL, SPACE, key);

    const nonce = lastId.nonce + 1;
    console.log('signingTransaction', privateSecret, SPACE, key, nonce, tags);
    let signedTransaction = bloqly.signTransaction(
        privateSecret,
        SPACE,
        key,
        nonce,
        Date.now(),
        JSON.stringify(data),
        'memo',
        tags
    );
    
    console.log(signedTransaction)

    const encodedTransaction = bloqly.encodeTransaction(signedTransaction);

    const res = await bloqly.sendSignedTransaction(NODE_URL, encodedTransaction);

    console.log(res)
    return res;
}

 
const app = express()
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.post('/register', async (req, res) => {
    console.log('register', req.body);
    const tags = req.body.needHelp ? ['needhelp'] : [];
    const key = req.body.name;
    try {
        const tx = await createTransaction(keys.privateKey, key, req.body, tags)
        console.log('created transaction', tx);
        res.json({success: true, privateKey: '', tx});
    } catch(ex) {
        console.error('failure while registering', ex);
        res.json({success: false, error: ex.message});
    }
});

app.get('/list', async (req, res) => {
    try {
        const list = await axios.get('http://localhost:8082/api/events/?tags=needhelp');
        res.json({success: true, list});
    } catch(ex) {
        res.json({success: false, error: ex.message});
    }
})

app.listen(3005, function () {
    console.log('Example app listening on port 3005!');
});