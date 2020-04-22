const SecurityItemsService = {
  // SELECT ALL FROM SECURITYITEMS TABLE
  getSecurityItems(knex) {
    return knex.select("*").from("securityitems");
  },
  // FIND A SECURITY ITEM BY NAME
  getSecurityItem(knex, name) {
    return knex.select("*").from("securityitems").where({ name });
  },
  // ADD A NEW SECURITY ITEM
  addSecurityItem(knex, name, category) {
    return knex
      .insert({ name: name, category: category })
      .into("securityitems")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = SecurityItemsService;
