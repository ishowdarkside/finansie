import mongoose from "mongoose";
import app from "./app";

const port = process.env.PORT || 3000;

const connectLink = process.env.MONGODB_LINK?.replace(
  "PASSWORD",
  process.env.CLUSTER_PASSWORD!
);

mongoose
  .connect(connectLink!)
  .then(() => console.log("Successfully connected to database!"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
