import Mongoose from 'mongoose';

Mongoose.Promise = global.Promise;

// eslint-disable-next-line import/prefer-default-export
export const connectToDB = async (url) => {
  if (!url) {
    throw Error('Mongo uri is undefined');
  }

  try {
    await Mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to mongo!!!');
  } catch (err) {
    console.log('Could not connect to MongoDB');
  }
};
