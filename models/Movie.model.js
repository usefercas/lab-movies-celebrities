const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  plot: {
    type: String,
  },
  cast: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Celebrity',
  }],
});



const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
