import mongoose from 'mongoose';
import config from 'config';
import {log} from './logger';

export const connectToDb = async (): Promise<typeof mongoose> => {
    log.info(`Connecting to database... (Mongo DB)`);
    const dbUri = config.get<string>('dbUri');
    try {
        const mongoInstance = await mongoose.connect(dbUri);
        log.info(`App successfully connected to database! (Mongo DB)`);
        return mongoInstance;
    }catch(err) {
        console.error(err);
        process.exit(1);
    }
}