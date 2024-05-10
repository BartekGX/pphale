import mongoose from "mongoose"

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Conected to db.")
    } catch(error) {
        console.log("Error while connecting.", error);
    }
}