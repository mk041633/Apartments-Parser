import { parserQueue } from './domains/queue/parser-queue';
import { initDatabase } from './db/apartment/init-database';
import { PageModel } from './db/apartment';

const city: string = 'almaty';
let pageNumber: number = 1;
initDatabase();

function addParserTask(pageNumber: number, city: string) {
    return parserQueue.add({
        city,
        pageNumber
    }, { removeOnFail: true, removeOnComplete: true, attempts: 2});
}

async function hasActiveTasksInQueue(): Promise<boolean> {
    const counts = await parserQueue.getJobCounts();
    return counts.active + counts.waiting > 0;
}

async function runManager() {
    
    const hasTasks: boolean = await hasActiveTasksInQueue();
    const pages = await PageModel.find({city: city});
    let pageCount = pages[0]['page']? pages[0]['page']-10 : 0;

    if (!hasTasks) {
        if (pageNumber < 11) {
            await addParserTask(pageNumber, city);
            pageNumber += 1;
            console.log('New tasks added to the queue.');
        } else if(pageNumber < 21){
            await addParserTask(pageCount + pageNumber, city);
            pageNumber += 1;
            console.log('New tasks added to the queue.');
        } else{
            console.log('All tasks completed.')
            pageNumber = 0;
        }
    } else {
        console.log('Tasks are already in the queue. Waiting for them to be processed...');
    }
}

setInterval(runManager, 30 * 1000);

runManager();