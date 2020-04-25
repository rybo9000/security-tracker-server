const knex = require("knex");
const app = require("../src/app");

describe("STATUS Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  it("GET /api/status responds with 200", () => {
    return supertest(app)
      .get("/api/status")
      .send({
        username: "test",
        password: "test",
        mcid: "1",
        classid: "1",
      })
      .expect(200);
  });
});
