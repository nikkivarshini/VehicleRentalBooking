const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const stripe = require('stripe')('sk_test_51MbqChKLf3MTi9NR41Ya4IhfxFneVOhn8r9h4dEccuYLIrn6RlHAsHu1Yzxj9x6AbZnYuP9vmUIIwVCgEjOp3oO700ESgy5oAc');

router.post("/bookcar", async (req, res) => {
  try {
    console.log('Booking process started');

    // Find the car that is being booked
    const car = await Car.findOne({ _id: req.body.car });
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    // Create a Stripe session for payment
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: car.name,
              images: [car.image],
            },
            unit_amount: req.body.totalAmount * 100, // Stripe expects amounts in cents
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    console.log('Stripe session created:', session.id);

    // Send the session URL to the frontend
    res.json({ url: session.url });

    // Proceed with saving the booking only if the session is created
    if (session) {
      // Attach the transactionId to the booking
      req.body.transactionId = session.id;

      // Include the rentPerDay from the car object
      req.body.rentPerDay = car.rentPerDay;

      // Save the booking in the database
      const newBooking = new Booking(req.body);
      await newBooking.save();
      console.log('Booking saved successfully:', newBooking);

      // Update the car's bookedTimeSlots
      const bookedCar = await Car.findOne({ _id: req.body.car });
      if (!Array.isArray(bookedCar.bookedTimeSlots)) {
        bookedCar.bookedTimeSlots = [];
      }

      // Ensure bookedTimeSlots is pushed as an array
      bookedCar.bookedTimeSlots.push(req.body.bookedTimeSlots);
      await bookedCar.save();
      console.log('Car booked slots updated:', bookedCar.bookedTimeSlots);
    }

  } catch (error) {
    console.error('Error during booking:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate('car');
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to retrieve bookings' });
  }
});

// Get bookings by user
router.get('/getBookingsByUser', async (req, res) => {
  try {
    const { userId } = req.query;
    const bookings = await Booking.find({ user: userId }).populate('car');
    res.json(bookings);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
