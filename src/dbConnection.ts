import mongoose, { ConnectOptions } from "mongoose";


export async function initDb(){
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          } as ConnectOptions);
        console.log(`Mongo database is connected!!!`);
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1); 
    }
}