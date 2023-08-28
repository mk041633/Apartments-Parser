import { ApartmentData } from '../../data/apartment';

class Apartment {
  constructor() { }

  static async saveApartment(apartmentData: any): Promise<any> {
    return await ApartmentData.saveApartment(apartmentData);
  }

  static async updateApartment(apartmentId: string, updateData: ApartmentData): Promise<any> {
    return await ApartmentData.updateApartment(apartmentId, updateData);
  }

  static async savePage(pageData: any): Promise<any> {
    return await ApartmentData.savePage(pageData);
  }
}

export { Apartment };
