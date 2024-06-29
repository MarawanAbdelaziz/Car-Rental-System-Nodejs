import { ObjectId } from "mongodb";
import { db } from "../../../../DB/connection.js";

const callRentals = db.collection("rentals");
const callCars = db.collection("cars");

export const createRental = async (req, res) => {
  const carId = new ObjectId(req.body.carId);

  const car = await callCars.findOne({ _id: carId });
  if (car) {
    if (car.rentalStatus == "available") {
      await callCars.updateOne(
        { _id: carId },
        { $set: { rentalStatus: "rented" } }
      );
      await callRentals.insertOne(req.body);
      return res.status(201).json({ message: "Car has been rented" });
    } else {
      return res.status(400).json({ message: "Sorry this car is rented" });
    }
  } else {
    return res.status(404).json({ message: "we don't have this car" });
  }
};

export const updateRental = async (req, res) => {
  try {
    const rentalId = new ObjectId(req.params);

    const rental = await callRentals.findOne({ _id: rentalId });
    const oldCarId = new ObjectId(rental.carId);
    console.log("old:", oldCarId);

    if (rental) {
      const newCarId = new ObjectId(req.body.carId);
      console.log("new:", newCarId);
      const car = await callCars.findOne({ _id: newCarId });

      if (car) {
        if (car.rentalStatus == "available") {
          await callCars.updateOne(
            { _id: oldCarId },
            { $set: { rentalStatus: "available" } }
          );

          await callCars.updateOne(
            { _id: newCarId },
            { $set: { rentalStatus: "rented" } }
          );

          await callRentals.updateOne({ _id: rentalId }, { $set: req.body });

          return res.json({ message: "Rental updated" });
        } else {
          return res.status(400).json({ message: "Sorry this car is rented" });
        }
      } else {
        return res.status(404).json({ message: "we don't have this car" });
      }
    } else {
      return res.status(404).json({ message: "rental not fount" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "cheack your id before call a backend", error: error });
  }
};

export const DeleteRental = async (req, res) => {
  try {
    const rentalId = new ObjectId(req.params);

    const rental = await callRentals.findOne({ _id: rentalId });
    const oldCarId = new ObjectId(rental.carId);

    if (rental) {
      await callCars.updateOne(
        { _id: oldCarId },
        { $set: { rentalStatus: "available" } }
      );

      await callRentals.deleteOne({ _id: rentalId });

      return res.json({ message: "Rental deleted" });
    } else {
      return res.status(404).json({ message: "rental not fount" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "cheack your id before call a backend", error: error });
  }
};

export const allRentals = async (req, res) => {
  const rentals = await callRentals.find().toArray();
  res.json({ rentals });
};

export const specificRental = async (req, res) => {
  const _id = new ObjectId(req.params);

  const rentals = await callRentals.findOne({ _id });

  if (rentals) {
    res.json({ rentals });
  } else {
    res.status(404).json({ message: "Rentals not found" });
  }
};
