const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://nonubasist_db_user:Nonu1431@ac-n8uopd7-shard-00-00.d2x6dyd.mongodb.net:27017,ac-n8uopd7-shard-00-01.d2x6dyd.mongodb.net:27017,ac-n8uopd7-shard-00-02.d2x6dyd.mongodb.net:27017/realestatecrm?ssl=true&replicaSet=atlas-grlh2m-shard-0&authSource=admin&retryWrites=true&w=majority");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;