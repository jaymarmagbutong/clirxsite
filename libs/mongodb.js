import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI); // No need for useNewUrlParser or useUnifiedTopology
        console.log('Connection established with MongoDB');
    } catch (error) {
        console.error('Connection failed:', error);
        throw new Error('Failed to connect to MongoDB'); // Optional: rethrow error for further handling
    }
};

export default connectMongoDB;
