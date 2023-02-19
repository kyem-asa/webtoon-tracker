const mongoose = require("mongoose");

const WebtoonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  lastReadChapter: {
    type: Number,
    required: true,
  },

  source: {
    type: String,
    required: true,
  },

  dateAdded: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('Webtoon', WebtoonSchema)

