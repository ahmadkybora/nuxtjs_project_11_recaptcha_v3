const express = require('express');

const router = express.Router();


const app = express();

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(req, app.request);
  req.res = res;
  res.req = req;
  next();
});

router.push('/', (req, res) =>{
  console.log("start", req.body.data);
  res.status(200).json({ message: "success" });
});

module.exports = {
  path: '/',
  handler: router,
};

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {}
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

(async () => {
  await sequelize.sync();
  const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
  console.log(jane.toJSON());
})();
