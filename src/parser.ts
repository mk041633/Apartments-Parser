import { initDatabase } from './db/apartment/init-database';
import { Apartment } from './domains/apartment';
import { KrishaApartment } from './domains/krisha-apartment';
import { Job, DoneCallback } from 'bull';
import { parserQueue } from './domains/queue/parser-queue';

interface JobData {
  city: string;
  pageNumber: number;
}

const parseApartmentDetails = async (id: number): Promise<void> => { 
    const apartmentData = await KrishaApartment.getApartmentData(id);
    if(apartmentData.price <= 200000){
        const savedApartment = await Apartment.saveApartment(apartmentData);
        console.log('Объявление успешно сохранено:', savedApartment);
    }
}

async function main(): Promise<void> {
    initDatabase();

    parserQueue.process(async function (job: Job<JobData>, done: DoneCallback) {
        try {
            const { city, pageNumber } = job.data;
            const pageData = await KrishaApartment.getPageData(city, pageNumber);
            const views = await KrishaApartment.getNumberOfViews(pageData.join(','));

            for (const key in views) {
                if(views[key] < 300){
                    try{
                        await parseApartmentDetails(parseInt(key)); 
                    } catch(error) {
                        console.log(`Ошибка при парсинге ${job.data}`, error);
                        continue;
                    }
                }
                else{
                    console.log(`Объявление id: ${key} страница: ${pageNumber} имеет 300 < ${views[key]} просмотров`)
                }
            }
            done();
        } catch (error) {
            console.log(`Ошибка при парсинге ${job.data}`, error);
            done();
        }
    });
}

main();