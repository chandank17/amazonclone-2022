import express from "express";
import data from "./jsondata";

const app = express();

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const product_id = req.params.id;

  const productdetails = data.products.find((value) => {
    return value.id == product_id;
  });
  if (productdetails) {
    res.send(productdetails);
  } else {
    res.send(400).send({ msg: "Product Not Found" });
  }
});

app.listen(5000, () => {
  console.log("Server is started");
});
