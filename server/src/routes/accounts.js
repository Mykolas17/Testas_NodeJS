const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('../../config');
const isLoggedIn = require('../middleware/authorization');

const router = express.Router();

const accountSchema = joi.object({
  groupId: joi.number().required(),
});

router.get('/', isLoggedIn, async (req, res) => {
  try {
    // console.log('req.userId', req.userId);
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      'SELECT g.id, g.name FROM `groups` g JOIN `accounts` a ON g.id=a.group_id WHERE a.user_id = ?',
      [req.userId]
    );
    await connection.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', isLoggedIn, async (req, res) => {
  const { groupId } = req.body;
  try {
    await accountSchema.validateAsync({ groupId });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query(
      'INSERT INTO accounts (`group_id`, `user_id`) VALUES (?, ?)',
      [groupId, req.userId]
    );
    const accountData = {
      id: response.insertId,
      userId: req.userId,
      groupId,
    };
    await connection.end();
    return res.json(accountData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
