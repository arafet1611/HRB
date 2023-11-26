const Demande = require("../model/demandeModel");

const getDemande = async (req, res) => {
  try {
    const demandes = await Demande.find();
    res.json(demandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const changeDemandeStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    const demande = await Demande.findByIdAndUpdate(
      id,
      { Status: status },
      { new: true }
    );
    if (!demande) {
      return res.status(404).json({ message: "Demande not found" });
    }
    res.json({ message: "Demande status changed successfully", data: demande });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createDemande = async (req, res) => {
  const { debut, fin, reason, msg } = req.body;
  try {
    const demande = await Demande.create({
      debut: new Date(debut),
      fin: new Date(fin),
      reason,
      msg,
    });

    io.emit("demandeCreated", {
      message: "New demande created",
      data: demande,
    });

    res
      .status(201)
      .json({ message: "demande created successfully", data: demande });
  } catch (error) {
    res.status(500).json({ error: error.message }, { error });
  }
};

const deleteDemande = async (req, res) => {
  try {
    await Demande.findByIdAndDelete(req.params.id);
    res.json({ message: "Demande deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDemande,
  createDemande,
  deleteDemande,
  changeDemandeStatus,
};
