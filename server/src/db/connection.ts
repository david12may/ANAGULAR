import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('almacen', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false

  });

  export default sequelize;