const { ApartmentData } = require('../../data/apartment');

class Apartment {
  constructor() { }

  static async saveApartment(apartmentData) {
    return await ApartmentData.saveApartment(apartmentData);
  }

  static async updateApartment(apartmentId, updateData) {
      return await ApartmentData.updateApartment(apartmentId, updateData);
  }

  static async updateApartmentPhoneNumber(apartmentId, phoneNumber) {
      return await ApartmentData.updateApartmentPhoneNumber(apartmentId, phoneNumber);
  }
}

module.exports = { Apartment };