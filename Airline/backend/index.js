import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import FlightsDAO from "./dao/flightsDAO.js"
import UsersDAO from "./dao/usersDAO.js"
import ReservationsDAO from "./dao/reservationsDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient
import jwt from "jsonwebtoken"


const port = process.env.PORT || 8000



MongoClient.connect(
  
    process.env.AIRLINE_DB_URI,
    {
      MaxPoolSize: 50,
      wtimeoutMS: 2500,
      useNewUrlParser: true }
    )
    .catch(err => {
      console.error(err.stack)
      process.exit(1)
    })
    .then(async client => {
      await FlightsDAO.injectDB(client)
      await UsersDAO.injectDB(client)
      await ReservationsDAO.injectDB(client)
      app.listen(port, () => {
        console.log(`listening on port ${port}`)
      })
    })