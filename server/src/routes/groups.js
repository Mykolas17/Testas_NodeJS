const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');

const isLoggedIn = require('../middleware/authorization');
// const jwt = require('jsonwebtoken');
const DB_CONFIG = require('../../config');

const router = express.Router();

const groupSchema = joi.object({ name: joi.string().required() });

router.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      'SELECT g.id, g.name FROM `groups` g'
    );
    await connection.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', isLoggedIn, async (req, res) => {
  const { name } = req.body;
  try {
    await groupSchema.validateAsync({ name });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query(
      'INSERT INTO `groups` (`name`) VALUES (?)',
      [name]
    );
    const groupData = {
      id: response.insertId,
      name,
    };
    await connection.end();
    return res.json(groupData);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
