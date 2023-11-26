require("./configs/db");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const userRoute = require("./routes/userRoute");
const employeeRoute = require("./routes/employeeRoute");
const statisticsRoute = require("./routes/statisticRoute");
const attendanceRoute = require("./routes/attendanceRoute");
const attendanceHistoryRoute = require("./routes/attendanceHistoryRoute");
const demandeRouter = require("./routes/demandeRoute");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("demandeCreated", (data) => {
    io.emit("newDemandeNotification", data);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
app.use("/api/users", userRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/s", statisticsRoute);
app.use("/api/att", attendanceRoute);
app.use("/api/att/history", attendanceHistoryRoute);
app.use("/api/demandes", demandeRouter);
