const express = require("express");
const mongoose = require("mongoose");
const app = express();
 


mongoose
  .connect(
    "mongodb+srv://Biniam:12Biniam.12@cluster0.k6qor.mongodb.net/Cluster0?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(8000, () => {
  console.log("Server running on port: 5000");
});
