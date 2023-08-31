import mongoose from "mongoose";

export function connect() {
  mongoose
    .connect(process.env.MONGDB_URL as string)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
}
