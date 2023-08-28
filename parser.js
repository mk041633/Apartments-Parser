const { initDatabase } = require('./db/apartment/init-database');
const { Apartment } = require('./domains/apartment');
const { KrishaApartment } = require('./domains/krisha-apartment');
const {parserQueue} = require('./domains/queues/parser-queue')

async function parseApartmentDetails(id) {
    const apartmentData = await KrishaApartment.getApartmentData(id);
    const savedApartment = await Apartment.saveApartment(apartmentData);
    console.log('Объявление успешно сохранено:', savedApartment);
}

initDatabase();

parserQueue.process(async function (job, done) {
  try{
    const {city,pageNumber} = job.data;

    const pageData = await KrishaApartment.getPageData(city, pageNumber);

    for (const id of pageData) {
      await parseApartmentDetails(id);
    }

    done();

  } catch (error) {
    console.log(`Ошибка при парсинге ${job.data}`, error);
  }
});
