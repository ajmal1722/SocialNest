import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        // mongoDB connection string
        const con = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }) 

        console.log(`MongoDB connected on: ${con.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

// export connectDB
export default connectDB;