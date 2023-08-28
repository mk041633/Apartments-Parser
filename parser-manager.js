const QueueScheduler = require('bull');
const Worker = require('bull');
const Queue = require('bull');
const { parserQueue } = require('./domains/queues/parser-queue')

const config = require('./domains/config');
var pageNumber = 2;

function addParserTask(pageNumber, city) {
  return parserQueue.add({ pageNumber, city }, { removeOnFail: true, removeOnCompleted: true });
}

async function hasActiveTasksInQueue() {
  const counts = await parserQueue.getJobCounts();
  return counts.active + counts.waiting > 0;
}

async function runManager() {
  const hasTasks = await hasActiveTasksInQueue();

  if (!hasTasks) {
    if (pageNumber < 11) {
      const city = 'almaty';
      await addParserTask(pageNumber, city);
      pageNumber += 1;
      console.log('New tasks added to the queue.');
    }
    else {
      console.log('Excited 10 pages.');
    }
  } else {
    console.log('Tasks are already in the queue. Waiting for them to be processed...');
  }
}

setInterval(runManager, 15 * 1000);

runManager();