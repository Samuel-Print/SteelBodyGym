const { Sede } = require('../models');

const getSedes = async (req, res) => {
  try {
    const sedes = await Sede.findAll({
      where: { activo: true },
      order: [['id_sede', 'ASC']]
    });
    res.json(sedes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSedeById = async (req, res) => {
  try {
    const sede = await Sede.findByPk(req.params.id);
    if (!sede) {
      return res.status(404).json({ error: 'Sede no encontrada' });
    }
    res.json(sede);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSede = async (req, res) => {
  try {
    const sede = await Sede.create(req.body);
    res.status(201).json(sede);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSede = async (req, res) => {
  try {
    const sede = await Sede.findByPk(req.params.id);
    if (!sede) {
      return res.status(404).json({ error: 'Sede no encontrada' });
    }
    await sede.update(req.body);
    res.json(sede);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSede = async (req, res) => {
  try {
    const sede = await Sede.findByPk(req.params.id);
    if (!sede) {
      return res.status(404).json({ error: 'Sede no encontrada' });
    }
    await sede.update({ activo: false });
    res.json({ mensaje: 'Sede desactivada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSedes,
  getSedeById,
  createSede,
  updateSede,
  deleteSede
};