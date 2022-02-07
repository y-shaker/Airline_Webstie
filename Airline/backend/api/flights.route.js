import express from "express"
import FlightsCtrl from "./flights.controller.js"

const router = express.Router()

router.route("/").get(FlightsCtrl.apiGetFlights)
router.route("/").post(FlightsCtrl.apiPostFlight)


router
  .route("/:id").get(FlightsCtrl.apiGetFlightById)
  .put(FlightsCtrl.apiUpdateFlight)
  .delete(FlightsCtrl.apiDeleteFlight)

export default router