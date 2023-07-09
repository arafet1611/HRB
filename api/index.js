require("./configs/db");
const express = require("express");
const userRoute = require("./routes/userRoute");
const employeeRoute = require("./routes/employeeRoute");
const statisticsRoute = require("./routes/statistisRoute");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
app.use("/api/users", userRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/s", statisticsRoute);
