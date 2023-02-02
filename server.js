import config from "./config/env.config.js"
import app from "./app.js";
import mongoose from "mongoose";


// Self Invoking Function For Database Connection
(async () => {
  // Runs As soon as the app starts
  try {

     mongoose.set("strictQuery",true);
     await mongoose.connect(config.MONGODB_URL);
      console.log("Connected to Database Successfully");

      app.on("error", (error)=>{
          console.log(error);
          throw error;
      });

      const onListening = () => {
          console.log(`
          Listening on PORT : ${config.PORT}
          It is a ${(config.NODE_ENV).toUpperCase()} Environment
          `);
      };

      app.listen(config.PORT, onListening);
      
  } catch (error) {
      console.log ("ERROR", error);
      throw error;
  }
})();

