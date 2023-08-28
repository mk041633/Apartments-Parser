const axios = require('axios');
const cheerio = require('cheerio');

class KrishaApartment {

  static async getApartmentData(id) {
    const url = `https://m.krisha.kz/a/show/${id}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const title = $('.offer__advert-title h1').text().trim();
    const price = parseInt($('.offer__price').text().trim().replace(/[^\d]/g, ''), 10);
    const houseType = $('.offer__info-item[data-name="flat.building"] .offer__advert-short-info').text();
    const yearBuilt = parseInt($('.offer__info-item[data-name="house.year"] .offer__advert-short-info').text());
    const area = parseInt($('.offer__info-item[data-name="live.square"] .offer__advert-short-info').text().replace(/[^\d]/g, ''), 10);
    const bathroom = $('.offer__info-item[data-name="flat.toilet"] .offer__advert-short-info').text();

    return {
        id,
        title,
        price,
        houseType,
        yearBuilt,
        area,
        bathroom,
      };
  }

  static async getPageData(city, page) {
    const url = `https://krisha.kz/prodazha/kvartiry/${city}/?page=${page}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const elements = $('.a-card__header-left');

    const ids = elements.map((index, element) => {
      const anchorTag = $(element).find('a.a-card__title');
      return anchorTag.attr('href').split('/').pop();
    }).get();

    return ids;
  }
}

module.exports = { KrishaApartment };