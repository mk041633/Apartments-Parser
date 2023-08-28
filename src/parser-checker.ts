import { initDatabase } from './db/apartment/init-database';
import { Apartment } from './domains/apartment';
import { KrishaApartment } from './domains/krisha-apartment';

const city = 'almaty';
let left = 1;
let find = 1;

async function main(): Promise<void> {
    initDatabase();
    let right = await KrishaApartment.getMaxPage(city);
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const check = await KrishaApartment.getDataStatus('almaty', mid);
        const check2 = await KrishaApartment.getDataStatus('almaty', mid+1);
        console.log(mid);
        if (check && !check2) {
            find = mid;
            break; 
        } else if (check) {
            left = mid + 1; 
        } else {
            right = mid - 1; 
        }
    }
    const savedApartment = await Apartment.savePage({city: city, page: find});
    console.log('Город и страница сохранены:', savedApartment);
}

setInterval(main, 30 * 60 * 1000);

main();