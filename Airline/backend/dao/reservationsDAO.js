import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let reservations

export default class ReservationsDAO {
  static async injectDB(conn) {
    if (reservations) {
      return
    }
    try {
      reservations = await conn.db(process.env.AIRLINE_NS).collection("reservations")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }


  static async getAllReservations() {

    let cursor
    
    try {
      cursor = await reservations.find()
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { resList: [], totalNumRes: 0 }
    }


    try {
      const resList = await cursor.toArray()
      const totalNumRes = await reservations.countDocuments()

      return { resList, totalNumRes }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { resList: [], totalNumRes: 0 }
    }
  }

  static async addReservation(data) {
    try {

      return await reservations.insertOne(data)
    } catch (e) {
      console.error(`Unable to add reservation: ${e}`)
      return { error: e }
    }
  }

  static async getReservations(userid) {

    let cursor
    
    try {
      cursor = await reservations.find({"UserId":userid})
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { ReservationsList: [], totalNumReservations: 0 }
    }


    try {
      const ReservationsList = await cursor.toArray()
      const totalNumReservations = await reservations.countDocuments({"UserId":userid})

      return { ReservationsList, totalNumReservations }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { ReservationsList: [], totalNumReservations: 0 }
    }
  }

  static async getReservationByBN(bn) {

    try{
    return await reservations.findOne({"BookingNumber":bn})
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
    }

  }

  static async getReservationByID(id) {
    try {
      return await reservations.findOne( {"_id": new ObjectId(id)})
    } catch (e) {
      console.error(`Unable to get reservation, ${e}`)
    }
  }

  static async deleteReservation(resId) {

    try {
      const deleteResponse = await reservations.deleteOne({
        _id: ObjectId(resId),
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to cancel reservation: ${e}`)
      return { error: e }
    }
  }
  static async UpdateReservation(id, data){
    try{
      const updateResponse = await reservations.updateOne({ _id: ObjectId(id)},{ $set: data})

      return updateResponse
    }
     catch (e) {
      console.error(`Unable to update reservation: ${e}`)
      return { error: e }
    }
    }

    static async UpdateReservationUser(id, data){
      try{
        const str = JSON.stringify(data);
        console.log("body:"+str)
        const updateResponse = await reservations.updateOne(
          { _id: ObjectId(id)},
          { $set:  {
             User:{
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            passportnumber: data.passportnumber,
            email: data.email
          }
        }
      },)
  
        return updateResponse
      }
       catch (e) {
        console.error(`Unable to update reservation: ${e}`)
        return { error: e }
      }
      }

      static async UpdateReservationDepFlight(id, data){
        try{
          // const str = JSON.stringify(data);
          // console.log("DAOdep:"+str)
          
          const updateResponse = await reservations.updateOne(
            { _id: ObjectId(id)},
            { $set:  {
               DepartureFlight:{
                id: data.id,
                FlightNumber: data.FlightNumber,
                DepartureTime: data.DepartureTime,
                ArrivalTime: data.ArrivalTime,
                Date: data.Date,
                DepartureAirport: data.DepartureAirport,
                DestinationAirport: data.DestinationAirport,
                TripDuration: data.TripDuration,
                BaggageAllowance: data.BaggageAllowance,
                Price: data.Price,
                EconomySeats: data.EconomySeats,
                BusinessSeats: data.BusinessSeats,
                FirstSeats: data.FirstSeats,
                ReservedSeats: data.ReservedSeats
            }
          }
        },)
    
          return updateResponse
        }
         catch (e) {
          console.error(`Unable to update reservation: ${e}`)
          return { error: e }
        }
        }

        static async UpdateReservationRetFlight(id, data){
          try{
          
            const str = JSON.stringify(data);
            console.log("DAOret:"+str)
           
            
            const updateResponse = await reservations.updateOne(
              { _id: ObjectId(id)},
              { $set:  {
                 ReturnFlight:{
                  id: data.id,
                  FlightNumber: data.FlightNumber,
                  DepartureTime: data.DepartureTime,
                  ArrivalTime: data.ArrivalTime,
                  Date: data.Date,
                  DepartureAirport: data.DepartureAirport,
                  DestinationAirport: data.DestinationAirport,
                  TripDuration: data.TripDuration,
                  BaggageAllowance: data.BaggageAllowance,
                  Price: data.Price,
                  EconomySeats: data.EconomySeats,
                  BusinessSeats: data.BusinessSeats,
                  FirstSeats: data.FirstSeats,
                  ReservedSeats: data.ReservedSeats
              }
            }
          },)
      
            return updateResponse
          }
           catch (e) {
            console.error(`Unable to update reservation: ${e}`)
            return { error: e }
          }
          }
  

}