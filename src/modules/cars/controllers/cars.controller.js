import { ObjectId } from "mongodb";
import { db } from "../../../../DB/connection.js";

const coll = db.collection("cars");

export const addCar = async (req, res, next) => {
  const car = await coll.insertOne(req.body);

  const _id = new ObjectId(car.insertedId);

  const findCar = await coll.findOne({ _id });

  return res
    .status(201)
    .json({ message: "Car added successfully", car: findCar });
};

export const getCars = async (req, res, next) => {
  const Cars = await coll.find().toArray();

  res.json({ Cars: Cars });
};

export const getCar = async (req, res, next) => {
  const _id = new ObjectId(req.body._id);

  const car = await coll.findOne({ _id });

  if (car) {
    res.json({ car: car });
  } else {
    res.status(404).json({ message: "Car not found" });
  }
};

export const updateCars = async (req, res, next) => {
  const { id, name, model, rentalStatus } = req.body;

  const _id = new ObjectId(id);

  let findCar = await coll.findOne({ _id });

  if (findCar) {
    const Car = await coll.updateOne(
      { _id },
      { $set: { name: name, model: model, rentalStatus: rentalStatus } }
    );

    findCar = await coll.findOne({ _id });
    res.json({ car: findCar });
  } else {
    res.status(404).json({ message: "Car not found" });
  }
};

export const deleteCars = async (req, res, next) => {
  const { id } = req.body;

  const _id = new ObjectId(id);

  let findCar = await coll.findOne({ _id });

  if (findCar) {
    await coll.deleteOne({ _id });

    res.json({ message: "car deleted" });
  } else {
    res.status(404).json({ message: "car not found" });
  }
};

export const hondaAndToyota = async (req, res) => {
  const cars = await coll
    .find({ model: { $in: ["Honda", "Toyota"] } })
    .toArray();
  res.json({ cars });
};

export const availableWithOneModel = async (req, res) => {
  const modelRegex = new RegExp(`^${req.body.model}$`, "i");

  const cars = await coll
    .find({
      $and: [{ model: { $regex: modelRegex } }, { rentalStatus: "available" }],
    })
    .toArray();
  res.json({ cars });
};

export const rentedOrSpecificModel = async (req, res) => {
  const modelRegex = new RegExp(`^${req.body.model}$`, "i");

  const cars = await coll
    .find({
      $or: [{ model: { $regex: modelRegex } }, { rentalStatus: "rented" }],
    })
    .toArray();
  res.json({ cars });
};

export const availableOrRentedWithOneModel = async (req, res) => {
  const model1Regex = new RegExp(`^${req.body.model1}$`, "i");
  const model2Regex = new RegExp(`^${req.body.model2}$`, "i");

  const cars = await coll
    .find({
      $or: [
        {
          $and: [
            { model: { $regex: model1Regex } },
            { rentalStatus: "available" },
          ],
        },
        {
          $and: [
            { model: { $regex: model2Regex } },
            { rentalStatus: "rented" },
          ],
        },
      ],
    })
    .toArray();
  res.json({ cars });
};
