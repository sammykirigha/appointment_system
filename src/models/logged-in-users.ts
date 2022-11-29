'use strict';
import { Model } from "sequelize";
import { userRoleStatus } from "../api/common/enums/userRoles";

type UserAttributes = {
  id: string,
  username: string,
  user_id: string,
  email: string,
  password: string,
  token: string,
  role: userRoleStatus,
  confirmed: boolean,
  confirmToken: string,
  passwordResetToken: string,
  passwordResetExpires: Date
}
module.exports = (sequelize: any, DataTypes: any) => {
  const { Sequelize } = sequelize;
  class logedInUser extends Model<UserAttributes> implements UserAttributes {

    id: string;
    user_id: string;
    email: string;
    username: string;
    role: userRoleStatus;
    password: string;
    token: string;
    confirmed: boolean;
    confirmToken: string;
    passwordResetToken: string;
    passwordResetExpires: Date

    static associate(models: any) {
      // define association here
    }
  }
  logedInUser.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: Sequelize.ENUM("user", "admin", "patient", "doctor"),
      defaultValue: "user",
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    confirmToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
    {
      sequelize,
      modelName: "logged_in_users",
      tableName: "logged_in_users",
      timestamps: true,
      freezeTableName: true,
    }

  );
  return logedInUser;
};