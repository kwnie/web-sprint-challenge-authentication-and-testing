const supertest = require("supertest")
const server = require("./server")

describe("dad joke integration tests", () => {
  it("registers a new account", async () => {
		const res = await supertest(server)
      .post("/register")
      .send({
        username: "kelseysusername",
        password: "kelseyspassword"
      })

		expect(res.statusCode).toBe(201)
		expect(res.type).toBe("application/json")
    expect(res.body[0].username).toBe("kelseysusername")
	})

  it("logs into account", async () => {
		const res = await supertest(server)
      .post("/login")
      .send({
        username: "kelseysusername",
        password: "kelseyspassword"
      })

		expect(res.statusCode).toBe(200)
		expect(res.type).toBe("application/json")
		expect(res.body[0].username).toBe("kelseysusername")
	})

  it("gets all jokes when logged in", async () => {
      await supertest(server)
        .post("/register")
        .send({
          username: "kelseysusername",
          password: "kelseyspassword"
        })
      await supertest(server)
        .post("/login")
        .send({
          username: "kelseysusername",
          password: "kelseyspassword"
        })
      const res = await supertest(server).get("/")

		expect(res.statusCode).toBe(200)
		expect(res.type).toBe("application/json")
		expect(res.body).toBeTruthy()
	})
})
