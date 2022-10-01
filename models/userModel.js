const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const createError = require('http-errors');

const userSchema = new mongoose.Schema({
  email: { type: String, requred: true, unique: true },
  password: { type: String, required: true },
});
//static signup method
userSchema.statics.signup = async function (email, password) {
  //input validation
  if (!validator.isEmail(email)) throw createError(422, 'Email is not valid');
  if (!validator.isStrongPassword(password)) throw createError(422, 'Password not strong enough');

  const exists = await this.findOne({ email });

  if (exists) throw createError(409, 'Email already in use');

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};
//static login method
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) throw createError(401, 'invalid login credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw createError(401, 'invalid login credentials');

  return user;
};

module.exports = mongoose.model('user', userSchema);
