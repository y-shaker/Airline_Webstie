import FlightsDAO from "../dao/flightsDAO.js"

export default class FlightsController {
  static async apiGetFlights(req, res, next) {

    
let filters = {}
    if (req.query.FlightNumber) {
      filters.FlightNumber = req.query.FlightNumber
    } if (req.query.DepartureTime) {
      filters.DepartureTime = req.query.DepartureTime
    } if (req.query.ArrivalTime) {
      filters.ArrivalTime = req.query.ArrivalTime
    } if (req.query.Date) {
      filters.Date = req.query.Date
    } if (req.query.DepartureAirport) {
      filters.DepartureAirport = req.query.DepartureAirport
    } if (req.query.DestinationAirport) {
      filters.DestinationAirport = req.query.DestinationAirport
    }if (req.query.CabinClass) {
      filters.CabinClass = req.query.CabinClass
    }if (req.query.Seats) {
      filters.Seats = req.query.Seats
    }
    


    const { flightsList, totalNumFlights } = await FlightsDAO.getFlights({filters})

    let response = {
      flights: flightsList,
      filters: filters,
      total_results: totalNumFlights,
    }
    res.json(response)
  }

  static async apiGetFlightById(req, res, next) {
    try {
      let id = req.params.id || {}
      let flight = await FlightsDAO.getFlightByID(id)
      if (!flight) {
        res.status(404).json({ error: "Flight not found" })
        return
      }
      res.json(flight)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

 
  static async apiPostFlight(req, res, next) {
    try {
      const FlightNumber = req.body.fnumber
      const DepartureTime= req.body.deptime
      const ArrivalTime= req.body.arrtime
      const Date = req.body.date
      const EconomySeats= parseInt(req.body.ecseats)
      const BusinessSeats=parseInt(req.body.bseats)
      const FirstSeats=parseInt(req.body.fseats)
      const DepartureAirport=req.body.depairport
      const DestinationAirport=req.body.destairport
      const TripDuration= req.body.tripdur
      const Price= parseInt(req.body.price)
      const BaggageAllowance= req.body.bagallwd

      const FlightResponse = await FlightsDAO.addFlight(
       FlightNumber,
       DepartureTime,
       ArrivalTime,
       Date,
       EconomySeats,
       BusinessSeats,
       FirstSeats,
       DepartureAirport,
       DestinationAirport,
       TripDuration,
       Price,
       BaggageAllowance
      )
      res.json({ status: "success" })
    } catch (e) {
      console.log(e)
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateFlight(req, res, next) {
    try {
      const flightId = req.params.id
      const Fnumber = req.body.fnumber
      const deptime = req.body.deptime
      const arrtime = req.body.arrtime
      const date = req.body.date
      const ecseats= parseInt(req.body.ecseats)
      const bseats=parseInt(req.body.bseats)
      const fseats=parseInt(req.body.fseats)
      const depairport=req.body.depairport
      const destairport=req.body.destairport
      const TripDuration= req.body.tripdur
      const Price= parseInt(req.body.price)
      const BaggageAllowance= req.body.bagallwd

      const reviewResponse = await FlightsDAO.updateFlight(flightId, Fnumber, deptime, arrtime, date, ecseats, bseats, fseats, depairport, destairport, TripDuration, Price, BaggageAllowance,[])
      var { error } = reviewResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update flight",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteFlight(req, res, next) {
    try {
      const flightId = req.params.id
      const flightResponse = await FlightsDAO.deleteFlight(flightId)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
}
}