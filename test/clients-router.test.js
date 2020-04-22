const knex = require("knex");
const app = require("../src/app");

describe("CLIENTS Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  it("GET /api/clients responds with 200", () => {
    return supertest(app)
      .get("/api/clients")
      .send({
        username: "test",
        password: "test",
        mcid: "1",
        classid: "1",
      })
      .expect(200);
  });

  it.skip("POST /api/clients responds with 201", () => {
    return supertest(app)
      .post("/api/clients")
      .send({
        name: "test_name22",
      })
      .expect(201);
  });

  it("GET /api/clients/:id responds with 200", () => {
    return supertest(app)
      .get("/api/clients/2")
      .send({
        username: "test",
        password: "test",
        mcid: "1",
        classid: "1",
      })
      .expect(200);
  });
});
