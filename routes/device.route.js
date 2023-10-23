const express = require('express');
const router = express.Router();
const { deviceModel } = require("../models");

// Rute untuk menambah data
router.post('/devices', async (req, res) => {
  try {
    // Periksa apakah "name" sudah ada
    const existingDevice = await deviceModel.findOne({ where: { name: req.body.name } });
    if (existingDevice) {
      return res.status(400).json({ error: 'Device dengan nama yang sama sudah ada.' });
    }

    const device = await deviceModel.create(req.body);
    res.status(201).json(device);
  } catch (error) {
    res.status(400).json({ error: 'Gagal menambahkan data.' });
  }
});

// Rute untuk mengubah data
router.put('/devices/:id', async (req, res) => {
  try {
    const device = await deviceModel.findByPk(req.params.id);
    if (!device) {
      return res.status(404).json({ error: 'Data tidak ditemukan.' });
    }

    // Periksa apakah "name" sudah ada
    const existingDevice = await deviceModel.findOne({ where: { name: req.body.name } });
    if (existingDevice && existingDevice.id !== parseInt(req.params.id)) {
      return res.status(400).json({ error: 'Device dengan nama yang sama sudah ada.' });
    }

    const updatedDevice = await device.update(req.body);
    res.status(200).json(updatedDevice);
  } catch (error) {
    res.status(400).json({ error: 'Gagal mengubah data.' });
  }
});

// Rute untuk melihat data
router.get('/devices', async (req, res) => {
  const devices = await deviceModel.findAll();
  res.status(200).json(devices);
});

// Rute untuk menghapus data
router.delete('/devices/:id', async (req, res) => {
  try {
    const device = await deviceModel.findByPk(req.params.id);
    if (!device) {
      return res.status(404).json({ error: 'Data tidak ditemukan.' });
    }

    await device.destroy();
    res.status(204).json({ message: 'Data berhasil dihapus' }); 
  } catch (error) {
    res.status(400).json({ error: 'Gagal menghapus data.' });
  }
});
module.exports = router;
