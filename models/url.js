const mongoose = require("mongoose");
const newSchema = new mongoose.Schema({
    originalURL: { type: String, required: true },
    shortURLKey: { type: String, unique: true, required: true }
})
const Url = mongoose.model("url", newSchema);
module.exports = Url;