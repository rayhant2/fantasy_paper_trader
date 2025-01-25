require("dotenv").config();
const express = require("express");
const app = express();

const stocksRouter = require("./routes/stocks");
const cryptoRouter = require("./routes/crypto");

app.use(express.json());

const PORT = process.env.PORT;

app.get("/", async (req, res, next) => {
  res.send({ message: ("Server running on port:", PORT) });
});

app.use("/api/stocks", stocksRouter);
app.use("/api/crypto", cryptoRouter);

app.listen(PORT, () => console.log(`@ http://localhost:${PORT}`));
