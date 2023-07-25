const express = require("express");
const route = express.Router();

const { UserMiddleware } = require("../Middlewares/UserMiddleware");
const { AdminMiddleware } = require("../Middlewares/AdminMiddleware");
const {
  createOrderController,
  getAllOrdersController,
  getStatusController,
  updateStatus,
  getUserHistoryController
} = require("../Controllers/OrderController");

route.post("/createOrder/:UserId", UserMiddleware, createOrderController);
route.get("/getOrders/:AdminId", AdminMiddleware, getAllOrdersController);
route.get("/getStatus/:AdminId", AdminMiddleware, getStatusController);
route.patch("/updateStatus/:AdminId", AdminMiddleware, updateStatus);

route.get("/userHistory/:UserId", UserMiddleware, getUserHistoryController);

module.exports = route;
