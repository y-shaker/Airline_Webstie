import express from "express"
import ReservationsCtrl from "./reservations.controller.js"
import ReservationsMailer from "../mailers/reservation-mailer.js"

const router = express.Router();

router.route("/").get(ReservationsCtrl.apiGetReservations)
router.route("/").post(ReservationsCtrl.apiPostReservation)

router.route("/user/:id").get(ReservationsCtrl.apiGetReservationsByUserId)
router.route("/:id").get(ReservationsCtrl.apiGetReservationById)
router.route("/:id").delete(ReservationsCtrl.apiCancelReservation)
router.route("/:id/nomail").delete(ReservationsCtrl.apiCancelReservationNoMail)
router.route("/:id").put(ReservationsCtrl.apiUpdateReservation)

router.route("/mail").post(ReservationsCtrl.apiMailBooking)          


export default router;