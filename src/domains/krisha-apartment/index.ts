import axios from 'axios';
import cheerio from 'cheerio';

const proxyConfig = {
    protocol: 'https',
    host: "129.159.112.251", 
    port: 3128
  };

class KrishaApartment {
  static async getApartmentData(id: number) {
    const html = `https://m.krisha.kz/a/show/${id}`;
    const response = await axios.get(html);
    const $ = cheerio.load(response.data);
    const title = $('.offer__advert-title h1').text().trim();
    const price = parseInt($('.offer__price').text().trim().replace(/[^\d]/g, ''), 10);
    
    return{
        id,
        title,
        price,
        html
    };
  }

  static async getPageData(city: string, page: number) {
    const url = `https://krisha.kz/arenda/kvartiry/${city}/?page=${page}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const elements = $('.a-card__header-left');

    const ids: string[] = elements
      .map((index, element) => {
        const anchorTag = $(element).find('a.a-card__title');
        return anchorTag.attr('href')?.split('/').pop() || '';
      })
      .get();

    return ids;
  }

  static async getDataStatus(city: string, page: number) {
    const url = `https://krisha.kz/arenda/kvartiry/${city}/?page=${page}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const divElements = $("div.paid-labels");

    return divElements.toArray().some((divElement) => $(divElement).find(".fi-paid-hot").length);
  }

  static async getNumberOfViews(ids: any) {
    const url = `https://krisha.kz/ms/views/krisha/live/`;
    const response = await axios.get(url + ids + '/');
    
    const result: Record<string, number> = {};

    for (const key in response.data['data']) {
        result[key] = response.data['data'][key]['nb_views'];
    }

    return result;
  }

  static async getMaxPage(city: string) {
    const url = `https://krisha.kz/prodazha/kvartiry/${city}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const divElements = $(".paginator__btn");
    
    return parseInt($(divElements[divElements.length - 2]).text().trim());
  }
}

export { KrishaApartment };
