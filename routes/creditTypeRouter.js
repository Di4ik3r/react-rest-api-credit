const express = require("express")
const router = express.Router()

const creditTypeController = require("../controllers/creditTypeController")

router.get("/", creditTypeController.getAll)
router.get("/:id", creditTypeController.getById)
router.post("/", creditTypeController.postCreditType)
router.put("/:id", creditTypeController.putCreditType)
router.delete("/:id", creditTypeController.deleteCreditType)

module.exports = router