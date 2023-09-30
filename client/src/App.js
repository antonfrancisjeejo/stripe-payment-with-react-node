import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./App.css";

const stripePromise = loadStripe(
  "pk_test_51Lmf2kSHHWeBEFlfwVfKEbkneBCmKx3rhDw4VKS7hZXt375yKUMDtXFh0fKdqVs7VwIxg4kMnrUm2nhazObK9uLW00gn8GEwsS"
);

const App = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/create-payment", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <div>
      <h1>Payment Gateway</h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm secretKey={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default App;
