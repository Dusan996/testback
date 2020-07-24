"use strict";
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define(
    "Document",
    {
      /** ID */
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      /** Created At */
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },

      /** Updated At */
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },

      /** Deleted At */
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },

      /** Original Name */
      originalName: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      /** Mime Type */

      /** URL */
      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      /** File Name */
      fileName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { paranoid: true, timestamps: true }
  );
  return Document;
};
