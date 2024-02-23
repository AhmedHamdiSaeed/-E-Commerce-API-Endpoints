require("dotenv").config();
const express = require('express');
require('./db')
const app=express();
app.use(express.json())


/////////             Heba

const  userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes')

app.use(express.static("public"))

app.use('/api/v1/user', userRoutes);

app.use("/api/v1/profile", profileRoutes);

app.listen(3000, () => {
  console.log(`Listening on port 3000 ....`);
});





////////////////// amal 









////////////////   radwa









////////// ahmed











///////////emad
