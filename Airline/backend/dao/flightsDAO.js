import mongodb from "mongodb"
import ReservationsDAO from "./reservationsDAO.js"
const ObjectId = mongodb.ObjectID
import ReservationsMailer from "../mailers/reservation-mailer.js"

let flights

export default class FlightsDAO {
  static async injectDB(conn) {
    if (flights) {
      return
    }
    try {
      flights = await conn.db(process.env.AIRLINE_NS).collection("flights")
    } catch (e) {
      console.error(`Unable to establish collection handles in flightsDAO: ${e}`)
    }
  }

  static async getFlights({filters = null}={}) {
    let query
    if (filters) {
      query = {}
      if ("FlightNumber" in filters) {
        query["FlightNumber"] =  { $eq: filters["FlightNumber"]}
      }  if ("DepartureTime" in filters) {
        query["DepartureTime"] =  { $eq: filters["DepartureTime"]}
      }  if ("ArrivalTime" in filters) {
        query["ArrivalTime"] =  { $eq: filters["ArrivalTime"]}
      }  if ("Date" in filters) {
        query["Date"] =  { $eq: filters["Date"]}
      }  if ("DepartureAirport" in filters) {
        query["DepartureAirport"] =  { $eq: filters["DepartureAirport"]}
      }  if ("DestinationAirport" in filters) {
        query["DestinationAirport"] =  { $eq: filters["DestinationAirport"]}
      }  
      
      if ("CabinClass" in filters) {
        if(filters["CabinClass"]=="Economy"){query["EconomyAvailable"] =  { $eq: true}}
        else if(filters["CabinClass"]=="BusinessClass"){query["BusinessAvailable"] =  { $eq: true}}
        else if(filters["CabinClass"]=="FirstClass"){query["FirstAvailable"] =  { $eq: true}}  
      }  

      if ("Seats" in filters) {
        if(filters["CabinClass"]=="Economy"){query["EconomySeats"] =  { $gte: parseInt(filters["Seats"])}}
        else if(filters["CabinClass"]=="BusinessClass"){query["BusinessSeats"] =  { $gte: parseInt(filters["Seats"])}}
        else if(filters["CabinClass"]=="FirstClass"){query["FirstSeats"] =  { $gte: parseInt(filters["Seats"])}}
      }  

    }

    let cursor
    
    try {
      cursor = await flights.find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { flightsList: [], totalNumFlights: 0 }
    }


    try {
      const flightsList = await cursor.toArray()
      const totalNumFlights = await flights.countDocuments(query)

      return { flightsList, totalNumFlights }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { FlightsList: [], totalNumFlights: 0 }
    }
  }

  static async getFlightByID(id) {
    try {
      return await flights.findOne( {"_id": new ObjectId(id)})
    } catch (e) {
      console.error(`Unable to get flight, ${e}`)
    }
  }
  

  static async addFlight(Fnumber="", deptime="", arrtime="", date="", ecseats=0, bseats=0, fseats=0, depairport="", destairport="", tripdur="", price=0, bagallwd="") {
    try {

      let ecseatsavlbl = false
      let bseatsavlbl = false
      let fseatsavlbl = false



      if (ecseats>0) ecseatsavlbl = true 
      if (bseats>0) bseatsavlbl = true 
      if (fseats>0) fseatsavlbl = true 



      const flightDoc = { 
        FlightNumber: Fnumber,
        DepartureTime: deptime,
        ArrivalTime: arrtime,
        Date: date,
        EconomySeats: ecseats,
        BusinessSeats: bseats,
        FirstSeats: fseats,
        DepartureAirport: depairport,
        DestinationAirport: destairport,
        TripDuration: tripdur,
        Price: price,
        BaggageAllowance: bagallwd,
        EconomyAvailable: ecseatsavlbl,
        BusinessAvailable: bseatsavlbl,
        FirstAvailable: fseatsavlbl,
        ReservedSeats:[],
        Reservations:[]


    }

      return await flights.insertOne(flightDoc)
    } catch (e) {
      console.error(`Unable to add flight: ${e}`)
      return { error: e }
    }
  }

  static async updateFlight(flightId="", Fnumber="", deptime="", arrtime="", date="", ecseats=0, bseats=0, fseats=0, depairport="", destairport="", tripdur="", price=0, bagallwd="", seats=[],resid=null, add=null) {
    try {

      let ecseatsavlbl = false
      let bseatsavlbl = false
      let fseatsavlbl = false

      let flight
      let reserved = []
      let resids = []

      flight = await FlightsDAO.getFlightByID(flightId)
      resids = flight.Reservations
      reserved = flight.ReservedSeats
      
      if (add) {
        reserved = reserved.concat(seats); 
        if(resid!=null) 
        {
          resids.push(resid)
        }
      }
      
      else if(!add){
        for (let i=0;i<=reserved.length;i++)
        {
          for (let j=0;j<=seats.length;j++)
          {
            if(reserved[i]==seats[j])
            {
              reserved.splice(i,1);
            }


          }
        }
        if(resid!=null) 
        {
          for (let i=0;i<=resids.length;i++)
        {
          if(resids[i]==resid)
            {
              resids.splice(i,1);
            }

        }
      }
      } 

      reserved.sort()

      if (ecseats>0) ecseatsavlbl = true 
      if (bseats>0) bseatsavlbl = true 
      if (fseats>0) fseatsavlbl = true 

      for(let i=0; i<resids.length; i++)
      {
        const res = await ReservationsDAO.getReservationByBN(resids[i]);

        if(res.DepartureFlight.id == flightId){
          //console.log(`entered dep`+"\n\n\n")        
          await ReservationsDAO.UpdateReservationDepFlight(res._id,
            {
                  id: flightId,
                  FlightNumber: Fnumber,
                  DepartureTime: deptime,
                  ArrivalTime: arrtime,
                  Date: date,
                  DepartureAirport: depairport,
                  DestinationAirport: destairport,
                  TripDuration: tripdur,
                  BaggageAllowance: bagallwd,
                  Price: price,
                  EconomySeats: ecseats,
                  BusinessSeats: bseats,
                  FirstSeats: fseats,
                  ReservedSeats: reserved

            }
          );

        }
        else if(res.ReturnFlight.id == flightId){
          //console.log(`entered ret`+"\n\n\n")

          await ReservationsDAO.UpdateReservationRetFlight(res._id,
            {
                  id: flightId,
                  FlightNumber: Fnumber,
                  DepartureTime: deptime,
                  ArrivalTime: arrtime,
                  Date: date,
                  DepartureAirport: depairport,
                  DestinationAirport: destairport,
                  TripDuration: tripdur,
                  BaggageAllowance: bagallwd,
                  Price: price,
                  EconomySeats: ecseats,
                  BusinessSeats: bseats,
                  FirstSeats: fseats,
                  ReservedSeats: reserved

            }
          );
        }
      }

      const updateResponse = await flights.updateOne(
        { _id: ObjectId(flightId)},
        { $set: { FlightNumber:Fnumber, DepartureTime:deptime, ArrivalTime:arrtime, Date: date,  EconomySeats:ecseats, 
          BusinessSeats:bseats, FirstSeats:fseats, DepartureAirport:depairport, DestinationAirport:destairport, 
          TripDuration: tripdur, Price: price,BaggageAllowance: bagallwd, EconomyAvailable: ecseatsavlbl,  
          BusinessAvailable: bseatsavlbl, FirstAvailable: fseatsavlbl, ReservedSeats:reserved, Reservations:resids } },
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update flight: ${e}`)
      return { error: e }
    }
  }

  static async deleteFlight(flightId) {

    try {
      let flight = await FlightsDAO.getFlightByID(flightId)
      let resids = flight.Reservations

      for(let i=0; i<resids.length; i++)
      {
        const res = await ReservationsDAO.getReservationByBN(resids[i]);

        await ReservationsDAO.deleteReservation(res._id)

        await ReservationsMailer.CancelFlightReservation(res.User.email,res.Price, resids[i])

      }


      const deleteResponse = await flights.deleteOne({
        _id: ObjectId(flightId),
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete flight: ${e}`)
      return { error: e }
    }
  }

}