const db = require("../../data/dbConfig")

const add = async (user) => {
	const [id] = await db("users").insert(user)
	return findBy(id)
}

const findBy = async (username) => {
	return await db("users")
		.where({
			username: username
	  })
}

module.exports = {
    findBy,
    add
}