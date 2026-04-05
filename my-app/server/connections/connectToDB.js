import mongoose from "mongoose";    
    
    export const connectToDB = async (dbURI, db_name) => {  
      try {  
        await mongoose.connect(dbURI, {  
          dbName: db_name,  
        });  
        console.log("Connected to MongoDB successfully!", db_name);  
      } catch (error) {  
        console.error("Error connecting to MongoDB:", error);  
        process.exit(1);  
      }  
    };
    