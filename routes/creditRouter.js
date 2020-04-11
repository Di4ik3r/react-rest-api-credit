const express = require("express")
const router = express.Router()

const creditController = require("../controllers/creditController")

router.get("/", creditController.getAll)
router.get("/:id", creditController.getById)
router.post("/", creditController.postCredit)
router.put("/:id", creditController.putCredit)
router.delete("/:id", creditController.deleteCredit)

module.exports = router