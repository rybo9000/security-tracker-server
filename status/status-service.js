const StatusService = {
  getStatus(knex) {
    return knex.select("*").from("status");
  },
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
  addStatus(knex, clientid, securityitem) {
    return knex
      .insert({ status: false, clientid: clientid, securityitem: securityitem })
      .into("status")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  toggleStatus(knex, id, value) {
    return knex("status").where({ id }).update({ status: value });
  },
};

module.exports = StatusService;
