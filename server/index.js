const express =require("express")
const app=express()
require("dotenv").config()
const cors=require("cors")
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');

app.use(express.json())
app.use(cors({
   origin:'*'
}))

const port=process.env.PORT || 8080

//DB

const ConnnectDB=require("./Connections/DB")

ConnnectDB()


app.use(fileUpload({
    useTempFiles: true
  }));
  

//cloudinary configs

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET  
  });


//Routes

const UserRoute=require("./Routes/UserRoutes")
const CategoryRoute=require("./Routes/CategoryRoutes")
const ProductRoutes=require("./Routes/ProductRoutes")
const CartRoutes=require("./Routes/CartRoutes")
const BrainTreeRoutes=require("./Routes/BrainTree")
const OrderRoutes=require("./Routes/OrderRoutes")
// Serve static files from the 'uploads' directory


// app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use("/api",UserRoute)
app.use("/api",CategoryRoute)
app.use("/api",ProductRoutes)
app.use("/api",CartRoutes)
app.use("/api",BrainTreeRoutes)
app.use("/api",OrderRoutes)


app.post('/upload', (req, res) => {
        console.log("body", req.files.file);
    const file = req.files.file;
    cloudinary.uploader.upload(file.tempFilePath, {
    folder:"photos"
    
    },(err, result) => {
      if (err) {
        console.error("Error uploading to Cloudinary:", err);
        return res.status(500).json({ error: 'Failed to upload image' });
      }
      console.log("img cloudinary", result);
      return res.status(200).json({ success: 'Image uploaded to Cloudinary' });
    });
  });
  


  
app.use("/",(req,res)=>{
   res.status(200).json("hi buddy ksiuermdjsy7e8r")
})

//   app.use("/",(req,res)=>{
//     res.send("helllo apsj")
// })



app.listen(port,()=>{
    console.log(`listening on the port ${port}`)
})

