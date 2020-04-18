const StatusService = {

    addStatus(knex, clientid, securityitem) {
        return knex
            .insert({ status: false, clientid: clientid, securityitem: securityitem })
            .into('status')
            .returning("*")
            .then((rows) => {
                return rows[0];
            });

    },
};

module.exports = StatusService;