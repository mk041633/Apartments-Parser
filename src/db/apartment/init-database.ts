import mongoose from 'mongoose';

const initDatabase = async (): Promise<void> => {
  const dbUri: string = 'mongodb+srv://mk:160498m33@cluster0.tg7jjjm.mongodb.net/';

  try {
    await mongoose.connect(dbUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export { initDatabase };
