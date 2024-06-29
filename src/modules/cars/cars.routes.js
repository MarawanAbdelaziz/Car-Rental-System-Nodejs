import express from "express";

import * as carsController from "./controllers/cars.controller.js";

const carsRouter = express.Router();

carsRouter.post("/", carsController.addCar);
carsRouter.get("/allcars", carsController.getCars);
carsRouter.get("/", carsController.getCar);
carsRouter.patch("/", carsController.updateCars);
carsRouter.delete("/", carsController.deleteCars);

carsRouter.get("/hondaAndToyota", carsController.hondaAndToyota);
carsRouter.get("/availableWithOneModel", carsController.availableWithOneModel);
carsRouter.get("/rentedOrSpecificModel", carsController.rentedOrSpecificModel);
carsRouter.get(
  "/availableOrRentedWithOneModel",
  carsController.availableOrRentedWithOneModel
);

export default carsRouter;
