const { JWT_SECRET } = require("../secrets");
const jwt = require("jsonwebtoken")

module.exports = () => {
  return async (req, res, next) => {
    try {
      // 2- On missing token in the Authorization header,
      // the response body should include a string exactly as follows: "token required".
      const token = req.cookies.token
      if(!token){
        return res.status(401).json({
          message: "Token required"
        })
      }

      // 3- On invalid or expired token in the Authorization header,
      // the response body should include a string exactly as follows: "token invalid".
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err) {
          return res.status(401).json({
            message: "Token invalid"
          })
        }

        //so other functions can access the token
        req.token = decoded

        // 1- On valid token in the Authorization header, call next.
        next()
      })
    } catch(err){
        next(err)
    }
  }
}