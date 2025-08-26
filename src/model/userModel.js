const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
  links: [
    {
      title: { type: String },
      link: { type: String },
      status: { type: String },
    },
  ],
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
