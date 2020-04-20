const ClientsService = {
  getClients(knex) {
    return knex.select("*").from("clients");
  },
  findDuplicateClient(knex, name) {
    return knex.select("*").from("clients").where({ name });
  },
  getNameFromId(knex, id) {
    return knex.select("*").from("clients").where({ id });
  },
  addClient(knex, name) {
    return knex
      .insert({ name: name })
      .into("clients")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = ClientsService;
