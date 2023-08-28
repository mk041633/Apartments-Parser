const { ApartmentModel } = require('../../db/apartment');

class ApartmentData {
  constructor() {}

  static async saveApartment(apartmentData) {
      const apartment = new ApartmentModel(apartmentData);
      return await apartment.save();
  }

  static async updateApartment(apartmentId, updateData) {
      return await ApartmentModel.updateOne(
        { id: apartmentId },
        updateData,
        { new: true }
      );
  }

  static async updateApartmentPhoneNumber(apartmentId, phoneNumber) {
      return await ApartmentModel.findOneAndUpdate(
        { id: apartmentId },
        { phoneNumber },
        { new: true }
      );
  }
}

module.exports = { ApartmentData };
