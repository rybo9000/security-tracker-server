const SecurityItemsService = {
  getSecurityItems(knex) {
    return knex.select("*").from("securityitems");
  },
  getSecurityItem(knex, name) {
    return knex.select("*").from("securityitems").where({ name });
  },
  addSecurityItem(knex, name, category) {
    return knex
      .insert({ name: name, category: category })
      .into('securityitems')
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  }
}

module.exports = SecurityItemsService;