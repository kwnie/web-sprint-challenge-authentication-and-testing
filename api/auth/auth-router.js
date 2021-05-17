const router = require('express').Router();
const { required, checkUsernameExists } = require("../middleware/restricted")
const { add, findBy } = require("../jokes/jokes-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../secrets/index")

router.post('/register', required(), checkUsernameExists(), async (req, res, next) => {
  try {
    const { username, password } = req.body
  
    const newUser = await add({
      username: username,
      password: await bcrypt.hash(password, 14)
    })

    res.status(201).json(newUser)
  } catch(err) {
      next(err)
  }
});

router.post('/login', async (req, res, next) => {
    try {
	    const { username, password } = req.body

        // if username not in database
	    const user = await findBy(username)
		    if (!user) {
			    return res.status(401).json({
				    message: "invalid credentials",
			    })
		    }

        const passwordValid = await bcrypt.compare(password, user.password)
		console.log(passwordValid)
		    if (!passwordValid) {
			    return res.status(401).json({
				    message: "invalid credentials",
			    })
		    }

	    // generate a new token
	    const token = jwt.sign({
		    userID: user.id,
		    userName: user.username,
	    }, JWT_SECRET)

	    res.cookie("token", token)
	    res.json({
		    message: `Welcome ${user.username}!`,
            token: token
	    })
    } catch(err) {
		next(err)
	}
});

module.exports = router;
