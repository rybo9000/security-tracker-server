const StatusService = {
  // SELECT ALL ENTRIES IN STATUS TABLE
  getStatus(knex) {
    return knex.select("*").from("status");
  },
  // GET ALL ENTRIES IN STATUS TABLE BUT JOIN NAME FIELD
  getStatusWithName(knex) {
    return knex
      .select(
        "status.id",
        "status.status",
        "status.clientid",
        "securityitems.name"
      )
      .from("status")
      .join("securityitems", "status.securityitem", "=", "securityitems.id")
      .orderBy("securityitems.name");
  },
  // ADD A NEW STATUS ENTRY
  addStatus(knex, clientid, securityitem) {
    return knex
      .insert({ status: false, clientid: clientid, securityitem: securityitem })
      .into("status")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  // UPDATE A STATUS ENTRY TO NEW VALUE
  toggleStatus(knex, id, value) {
    return knex("status").where({ id }).update({ status: value });
  },
};

module.exports = StatusService;
