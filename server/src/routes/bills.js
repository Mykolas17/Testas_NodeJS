const express = require('express');
const mysql = require('mysql2/promise');
const joi = require('joi');
const DB_CONFIG = require('../../config');

const router = express.Router();

const billSchema = joi.object({
  groupId: joi.number().required(),
  amount: joi.number().required(),
  description: joi.string(),
});

router.get('/:groupId', async (req, res) => {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      'SELECT g.id, g.name, b.id, b.amount, b.description FROM `groups` g JOIN `bills` b ON b.group_id=g.id WHERE g.id = ?',
      [req.params.groupId]
    );
    await connection.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { groupId, amount, description } = req.body;

    try {
      await billSchema.validateAsync({
        groupId,
        amount,
        description,
      });
    } catch (err) {
      return res.status(400).json(err);
    }
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query('SELECT 1 FROM `groups` WHERE id=?', [
      groupId,
    ]);
    if (rows.length === 0) {
      return res.status(400).json({
        status: 'Bad Request!',
        error: 'Group does not exist!',
      });
    }
    const [response] = await connection.query(
      'INSERT INTO `bills` (`group_id`, `amount`, `description`) VALUES (?,?,?)',
      [groupId, amount, description]
    );
    const billData = {
      id: response.insertId,
      groupId,
      amount,
      description,
    };
    await connection.end();
    return res.json(billData);
  } catch (err) {
    return res.status(500).json(err);
  }
});
module.exports = router;
