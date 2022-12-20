const mongoose = require("mongoose");
const { hash } = require("bcrypt");
const { BCRYPT_ROUNDS } = require("../utils/constants");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true,
    unique:true
  },
  password: {
    type: String,
    required:true
  }
},{timestamps: true});

userSchema.pre("save",async function(next){
    this.password = await hash(this.password,BCRYPT_ROUNDS);
    next();
})

module.exports = mongoose.model("User",userSchema);