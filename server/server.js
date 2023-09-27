const express = require("express");
const app = express();
const cors = require("cors");

const stripe = require("stripe")("secret key");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Backend Data" });
});

app.post("/create-payment", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 54000 * 100,
    currency: "inr",
    description: "Test Custom Payment",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4000, () => {
  console.log("Server is up and running");
});
