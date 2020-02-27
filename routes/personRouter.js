const express = require("express")
const router = express.Router()

const personController = require("../controllers/personController")

router.get("/", personController.getAll)
router.get("/:id", personController.getById)
router.post("/", personController.postPerson)
router.put("/:id", personController.putPerson)
router.delete("/:id", personController.deletePerson)

module.exports = router