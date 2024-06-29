import rentalsRouter from "./modules/Rentals/Rentals.routes.js";
import carsRouter from "./modules/cars/cars.routes.js";
import usersRouter from "./modules/users/users.routes.js";

function bootstrap(app, express) {
  app.use(express.json());

  app.use("/cars", carsRouter);
  app.use("/rentals", rentalsRouter);
  app.use("/users", usersRouter);
}

export default bootstrap;
