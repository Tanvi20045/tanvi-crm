const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
  const token = req.headers.authorization;

  if(!token){
    return res.send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, 'secret');
    req.user = verified;
    next();
  } catch(err){
    res.send("Invalid Token");
  }
};