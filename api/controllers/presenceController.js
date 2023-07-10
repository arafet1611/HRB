
const presenceModel = require('./presenceModel');


exports.getAllPresences = async (req, res) => {
  try {
    const presences = await presenceModel.find();
    res.json(presences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getPresenceById = async (req, res) => {
  try {
    const presence = await presenceModel.findById(req.params.id);
    if (!presence) {
      return res.status(404).json({ message: 'Presence not found' });
    }
    res.json(presence);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.createPresence = async (req, res) => {
  const presence = new presenceModel({
    idemp: req.body.idemp,
    statut: req.body.statut,
    date: req.body.date
  });

  try {
    const newPresence = await presence.save();
    res.status(201).json(newPresence);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.updatePresence = async (req, res) => {
  try {
    const presence = await presenceModel.findById(req.params.id);
    if (!presence) {
      return res.status(404).json({ message: 'Presence not found' });
    }

    presence.idemp = req.body.idemp || presence.idemp;
    presence.statut = req.body.statut || presence.statut;
    presence.date = req.body.date || presence.date;

    const updatedPresence = await presence.save();
    res.json(updatedPresence);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.deletePresence = async (req, res) => {
  try {
    const presence = await presenceModel.findById(req.params.id);
    if (!presence) {
      return res.status(404).json({ message: 'Presence not found' });
    }

    await presence.remove();
    res.json({ message: 'Presence deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
