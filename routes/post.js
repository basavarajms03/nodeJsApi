const router = require('express').Router();
const verify = require('./reviewAuthentication');

router.get('/',verify, (req, res) => {
    res.json({
        "Post" : "My Post Type",
        "desciption" : "Random Data you can give more information"
    });
})

module.exports = router;