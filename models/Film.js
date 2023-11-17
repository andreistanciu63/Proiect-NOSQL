const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FilmSchema = new Schema({
  titlu: {
    type: String,
    required: true,
  },
  regizor: {
    type: String,
    required: true,
  },
  an_lansare: {
    type: Number,
    required: true,
  },
  gen: {
    type: String,
    required: true,
  },
  actori: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  durata: {
    type: Number,
    required: true,
  },
  tara_productie: {
    type: String,
    required: true,
  },
  limba: {
    type: String,
    required: true,
  },
})

mongoose.model("films", FilmSchema)
