let express = require('express');
let router = express.Router();

router.get('/',function (req,res) {
    res.end('first router');
});

router.get('/hello',function (req,res) {
    res.end("Second router");
});

module.exports = router;
