import mongoose, { ConnectOptions } from "mongoose";

export async function initDb(){
    try {
        // const MONGO_URI_CONN: string | undefined = process.env.MONGO_URI;
        // if (!MONGO_URI_CONN) {
        //     console.log("Configure the corresponding URI");
        //     return;
        //   }

        await mongoose.connect("mongodb://localhost:27017/", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          } as ConnectOptions);

        console.log(`Mongo database is connected!!!`);
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1); 
    }
}