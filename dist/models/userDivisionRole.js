'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const UserDivisionRole = sequelize.define('UserDivisionRole', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false
    }
  });
  UserDivisionRole.associate = models => {
    UserDivisionRole.belongsTo(models.User, { foreignKey: 'UserId' });
    UserDivisionRole.belongsTo(models.Role, { foreignKey: 'RoleId' });
    UserDivisionRole.belongsTo(models.Division, { foreignKey: 'DivisionId' });
  };
  return UserDivisionRole;
};
// CREATE TABLE `UserEvents` (
//   `id` varchar(255) NOT NULL,
//   `createdAt` datetime NOT NULL,
//   `updatedAt` datetime NOT NULL,
//   `UserId` varchar(255) DEFAULT NULL,
//   `EventId` varchar(255) DEFAULT NULL,
//   `RoleId` varchar(255) DEFAULT NULL,
//   `DivisionId` varchar(255) DEFAULT NULL,
//   PRIMARY KEY (`id`),
//   UNIQUE KEY `id` (`id`),
//   UNIQUE KEY `UserEvents_id_unique` (`id`),
//   UNIQUE KEY `UserEvents_DivisionId_UserId_unique` (`UserId`,`DivisionId`),
//   UNIQUE KEY `UserEvents_DivisionId_EventId_unique` (`EventId`),
//   UNIQUE KEY `UserEvents_DivisionId_RoleId_unique` (`RoleId`),
//   KEY `DivisionId` (`DivisionId`),
//   CONSTRAINT `userevents_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
//   CONSTRAINT `userevents_ibfk_2` FOREIGN KEY (`EventId`) REFERENCES `Events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
//   CONSTRAINT `userevents_ibfk_3` FOREIGN KEY (`RoleId`) REFERENCES `Roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
//   CONSTRAINT `userevents_ibfk_4` FOREIGN KEY (`DivisionId`) REFERENCES `Divisions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8;