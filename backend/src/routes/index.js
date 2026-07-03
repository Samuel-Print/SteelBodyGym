'use strict';

const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const sedeRoutes = require('./sede.routes');
const usuarioRoutes = require('./usuario.routes');
const actividadRoutes = require('./actividad.routes');
const claseRoutes = require('./clase.routes');
const horarioclaseRoutes = require('./horarioclase.routes');
const planRoutes = require('./plan.routes');
const promocionRoutes = require('./promocion.routes');

router.use('/auth', authRoutes);
router.use('/sedes', sedeRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/actividades', actividadRoutes);
router.use('/clases', claseRoutes);
router.use('/horarios-clases', horarioclaseRoutes);
router.use('/planes', planRoutes);
router.use('/promociones', promocionRoutes);

module.exports = router;
