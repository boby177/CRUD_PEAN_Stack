const express = require("express");
const cors = require("cors");
const app = express();
// var corsOptions = {
//   origin: "http://localhost:8000",
// };

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require("./models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: ");
  });

  db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome CRUD." });
});

require("../back-end/routes/tutorial.routes")(app);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
