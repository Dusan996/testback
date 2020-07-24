"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      userName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  return User;
};
