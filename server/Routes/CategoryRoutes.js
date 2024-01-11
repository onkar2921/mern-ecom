const express=require("express")
const route=express.Router()

const {AdminMiddleware}=require("../Middlewares/AdminMiddleware")
const {createCategoryController,getAllCategoryController,deleteCategoryController,updateCategoryController,getSingleCategoryController}=require("../Controllers/CategoryController")

route.post("/createCategory/:AdminId",AdminMiddleware,createCategoryController)
route.get("/getAllCategory",getAllCategoryController)
route.delete("/deleteCategory/:AdminId/:CategoryId",AdminMiddleware,deleteCategoryController)
route.patch("/updateCategory/:AdminId/:CategoryId",AdminMiddleware,updateCategoryController)
route.get("/getSingleCategory/:CategoryId",getSingleCategoryController)

module.exports=route