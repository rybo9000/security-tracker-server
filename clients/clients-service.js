const ClientsService = {
  // GET ALL FROM CLIENTS TABLE
  getClients(knex) {
    return knex.select("*").from("clients");
  },
  // FIND A CLIENT BY NAME
  findDuplicateClient(knex, name) {
    return knex.select("*").from("clients").where({ name });
  },
  // FIND A CLIENT BY ID
  getNameFromId(knex, id) {
    return knex.select("*").from("clients").where({ id });
  },
  // ADD A CLIENT
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
