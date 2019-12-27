const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/taskids";

const database = () => {
  const init = () => {
    mongoose.connect(
      mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      (err, client) => {
        if (err) throw err;
        console.log("MongoDB connected sucessfully");
      }
    );
  }

  return {
    init
  }
}

module.exports = database();