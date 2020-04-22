const CategoriesService = {
  // SELECT ALL FROM CATEGORIES TABLE
  getCategories(knex) {
    return knex.select("*").from("categories");
  },
  // FIND A CATEGORY WITH A GIVEN NAME
  findDuplicateCategory(knex, name) {
    return knex.select("*").from("categories").where({ name });
  },
  // FIND A CATEGORY BY ID
  getCategoryById(knex, id) {
    return knex.select("*").from("categories").where({ id });
  },
  // INSERT A NEW CATEGORY INTO THE TABLE
  addCategory(knex, name) {
    return knex
      .insert({ name: name })
      .into("categories")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = CategoriesService;
