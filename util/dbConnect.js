import mongoose from 'mongoose'

const connection = {}

async function dbConnect() {
    if (connection.isConnected) {
        return
    }

    const db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedToplogy: true,
    })

    connection.isConnected = db.connections[0].readyState
    console.log("MongoDB connection status: ", connection.isConnected)
}

export default dbConnect