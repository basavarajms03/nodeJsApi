const jwt = require('jsonwebtoken');

function authentication(req,res, next){
    const token = req.header('auth-token');
    if(!token){
        return res.json({
            "msg" : "Access Denied",
            "Status" : 401
        });
    }
    try {
        const verified = jwt.verify(token, "Amazecodes");
        req.user = verified;
        next();
    } catch (error) {
        return res.json({
            "msg" : "Invalid Token",
            "Status" : 400
        });        
    }
}

module.exports = authentication;