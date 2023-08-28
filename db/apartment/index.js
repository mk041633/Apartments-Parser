const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apartmentSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: String,
  price: Number,
  houseType: String,
  yearBuilt: Number,
  area: Number,
  bathroom: String,
}, { timestamps: true });

const ApartmentModel = mongoose.model('Apartment', apartmentSchema);

module.exports = { ApartmentModel };