const express =require("express")
const app=express()
require("dotenv").config()
const cors=require("cors")

app.use(express.json())
app.use(cors())

const port=process.env.PORT || 8080

//DB

const ConnnectDB=require("./Connections/DB")

ConnnectDB()



//Routes

const UserRoute=require("./Routes/UserRoutes")
const CategoryRoute=require("./Routes/CategoryRoutes")
const ProductRoutes=require("./Routes/ProductRoutes")
const CartRoutes=require("./Routes/CartRoutes")
const BrainTreeRoutes=require("./Routes/BrainTree")
const OrderRoutes=require("./Routes/OrderRoutes")
// Serve static files from the 'uploads' directory


app.use('/uploads', express.static('uploads'));

app.use("/api",UserRoute)
app.use("/api",CategoryRoute)
app.use("/api",ProductRoutes)
app.use("/api",CartRoutes)
app.use("/api",BrainTreeRoutes)
app.use("/api",OrderRoutes)
app.use("/",(req,res)=>{
    res.send("helllo apsj")
})




app.listen(port,()=>{
    console.log(`listening on the port ${port}`)
})

