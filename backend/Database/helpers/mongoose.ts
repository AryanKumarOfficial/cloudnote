import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    if (mongoose.connection.readyState) {
        console.log('Database already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;
