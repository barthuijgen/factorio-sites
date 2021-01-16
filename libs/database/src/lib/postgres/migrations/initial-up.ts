import { QueryInterface, Sequelize } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    queryInterface.createTable("user", {});
  },
  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    //
  },
};
