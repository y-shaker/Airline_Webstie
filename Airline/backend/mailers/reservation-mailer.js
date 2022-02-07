import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

export default class ReservationsMailer {

    static async CancelReservation(email, price) {

        // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  const options ={
    from: 'airlineasquared@outlook.com', // sender address
  to: email, // list of receivers
  subject: "Ticket Cancellation", // Subject line
  text: `This is to confirm that you have cancelled your ticket reservation and will be refunded $${price}`,
}

  // send mail with defined transport object
transporter.sendMail(options, function(err,info){
if(err){
  console.log(err);
  return;
}
console.log("Sent: "+info.response);
  });



    }

    static async CancelFlightReservation(email, price, bn) {

      // create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.PASSWORD, // generated ethereal password
  },
});

const options ={
  from: 'airlineasquared@outlook.com', // sender address
to: email, // list of receivers
subject: "Flight Cancellation", // Subject line
text: `We are sorry to inform you that one of the flights on your Booking ${bn} was cancelled therefore your reservation has been cancelled and you will be refunded $${price}`,
}

// send mail with defined transport object
transporter.sendMail(options, function(err,info){
if(err){
console.log(err);
return;
}
console.log("Sent: "+info.response);
});



  }

  static async SuccessfulReservation(res) {

    // create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
service: "hotmail",
auth: {
  user: process.env.EMAIL, // generated ethereal user
  pass: process.env.PASSWORD, // generated ethereal password
},
});

const options ={
from: 'airlineasquared@outlook.com', // sender address
to: res.User.email, // list of receivers
subject: "Your Booking", // Subject line
text: `Thank You for booking with us!\n
Booking Number: ${res.BookingNumber}\n\n
Departure Flight\n
${res.DepartureFlight.DepartureAirport} TO ${res.DepartureFlight.DestinationAirport}\n
FlightNumber: ${res.DepartureFlight.FlightNumber}\n
Date: ${res.DepartureFlight.Date}\n
Departure Time: ${res.DepartureFlight.DepartureTime}\n
Arrival Time: ${res.DepartureFlight.ArrivalTime}\n
Trip Duration: ${res.DepartureFlight.TripDuration}\n
Baggage Allowance: ${res.DepartureFlight.BaggageAllowance}\n
Selected Seat Numbers: ${res.DepSeats.sort().toString()}\n\n\n
Return Flight\n
${res.ReturnFlight.DepartureAirport} TO ${res.ReturnFlight.DestinationAirport}\n
FlightNumber: ${res.ReturnFlight.FlightNumber}\n
Date: ${res.ReturnFlight.Date}\n
Departure Time: ${res.ReturnFlight.DepartureTime}\n
Arrival Time: ${res.ReturnFlight.ArrivalTime}\n
Trip Duration: ${res.ReturnFlight.TripDuration}\n
Baggage Allowance: ${res.ReturnFlight.BaggageAllowance}\n
Selected Seat Numbers: ${res.RetSeats.sort().toString()}\n\n\n`,
}

// send mail with defined transport object
transporter.sendMail(options, function(err,info){
if(err){
console.log(err);
return;
}
console.log("Sent: "+info.response);
});



}



}