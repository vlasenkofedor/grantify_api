"use strict";

const Events = require("../services/event_emitter");

Events.on("payment_succeeded", async () => {
  console.log("💰 Payment captured!");
});

Events.on("payment_failed", (data) => {
  console.log("❌ Payment failed.");
  console.log(data);
});
