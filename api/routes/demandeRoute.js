const express = require("express");
const router = express.Router();

const {
  getDemande,
  createDemande,
  deleteDemande,
  changeDemandeStatus,
} = require("../controllers/demandeController");

router.get("/", getDemande);

router.post("/", createDemande);

router.delete("/:id", deleteDemande);
router.put("/status/", changeDemandeStatus);
module.exports = router;
