import express from "express";
import * as rentalsController from "./controllers/Rentals.controller.js";

const rentalsRouter = express.Router();

rentalsRouter.post("/", rentalsController.createRental);
rentalsRouter.patch("/:id", rentalsController.updateRental);
rentalsRouter.delete("/:id", rentalsController.DeleteRental);
rentalsRouter.get("/allRentals", rentalsController.allRentals);
rentalsRouter.get("/:id", rentalsController.specificRental);

export default rentalsRouter;
