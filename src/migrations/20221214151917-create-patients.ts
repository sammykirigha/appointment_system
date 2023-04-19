'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('patients', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      firstname: {
        type: Sequelize.STRING,
        required: true
      },
      lastname: {
        type: Sequelize.STRING,
        required: true
      },
      email: {
        type: Sequelize.STRING,
        required: true
      },
      phone: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING,
        required: true
      },
      address: {
        type: Sequelize.STRING,
        required: true
      },
      image: {
        type: Sequelize.STRING,
        defaultValue:
          'https://nellions.co.ug/wp-content/uploads/2018/06/male-placeholder-image.jpeg',
        required: true
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        required: true
      },
      disability: {
        type: Sequelize.BOOLEAN,
        required: true
      },
      bloodGroup: {
        type: Sequelize.STRING,
        required: true
      },
      county: {
        type: Sequelize.STRING,
        required: true
      },
      nationality: {
        type: Sequelize.STRING,
        required: true
      },
      maritalStatus: {
        type: Sequelize.STRING,
        required: true
      },
      age: {
        type: Sequelize.INTEGER,
        required: true
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('patients');
  }
};
