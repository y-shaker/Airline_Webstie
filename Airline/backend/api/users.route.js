import express from "express"
import UsersCtrl from "./users.controller.js"

const router = express.Router()

router.route("/").get(UsersCtrl.apiGetUsers)
router.route("/").post(UsersCtrl.apiPostUser)
router.route("/login").post(UsersCtrl.apiAuthentication)

router.route("/:id").put(UsersCtrl.apiUpdateUser)
router.route("/:id").get(UsersCtrl.apiGetUserById)



export default router