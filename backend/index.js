const express = require("express");
const mongoose = require("mongoose");
const pinRoute = require("./routes/pins")
const userRoute = require("./routes/users")
const cors = require('cors')

const app = express();
 
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(express.json())
app.use(cors(corsOptions))
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

app.use("/api/pins", pinRoute)
app.use("/api/users", userRoute)

app.listen(8000, () => {
  console.log("Server running on port: 5000");
});
