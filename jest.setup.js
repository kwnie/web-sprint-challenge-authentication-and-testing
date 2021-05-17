const db = require("./data/dbConfig")

// beforeEach(async () => {
// 	await db.seed.run()
// })

beforeAll(async () => {
	await db.migrate.rollback()
	await db.migrate.latest()
})

afterAll(async () => {
	await db.destroy()
})