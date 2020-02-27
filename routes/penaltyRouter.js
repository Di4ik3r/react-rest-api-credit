const express = require("express")
const router = express.Router()

const penaltyController = require("../controllers/penaltyController")

router.get("/", penaltyController.getAll)
router.get("/:id", penaltyController.getById)
router.post("/", penaltyController.postPenalty)
router.put("/:id", penaltyController.putPenalty)
router.delete("/:id", penaltyController.deletePenalty)

module.exports = router