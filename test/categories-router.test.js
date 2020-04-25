const knex = require("knex");
const app = require("../src/app");

describe("CATEGORIES Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  it("GET /api/categories responds with 200", () => {
    return supertest(app)
      .get("/api/categories")
      .send({
        username: "test",
        password: "test",
        mcid: "1",
        classid: "1",
      })
      .expect(200);
  });

  it("POST /api/categories responds with 201", () => {
    const newCategoryName = {
      name: "New Test Name" + Math.random(),
    };

    return supertest(app)
      .post("/api/categories")
      .send(newCategoryName)
      .expect(201)
      .expect((res) => {
        expect(res.body.name).to.eql(newCategoryName.name);
      });
    //   .then(postRes => {
    //     return supertest(app)
    //     .get(`/api/categories`)
    // })
  });
});
