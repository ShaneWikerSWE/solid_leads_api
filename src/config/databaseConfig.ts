import { Sequelize } from 'sequelize-typescript';
import models from '../api/v1/models';
import dotenv from 'dotenv';
dotenv.config();

const connection = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
  logging: false,
  models: models,
});

export default connection;
