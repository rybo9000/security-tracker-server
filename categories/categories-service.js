const CategoriesService = {
  getCategories(knex) {
    return knex.select("*").from("categories");
  },
  findDuplicateCategory(knex, name) {
    return knex.select("*").from("categories").where({ name });
  },
  getCategoryById(knex, id) {
    return knex.select('*').from('categories').where({ id })
  },
  addCategory(knex, name) {
    return knex
      .insert({ name: name })
      .into('categories')
      .returning("*")
      .then((rows) => {
        return rows[0];
      });

  },
};

module.exports = CategoriesService;
