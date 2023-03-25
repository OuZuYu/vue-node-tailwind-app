const express = require('express')
const router = express.Router()
const { Posts } = require('../models')

router.get('/', async (req, res) => {
  try {
    const list = await Posts.findAll()
    res.json(list)
  } catch (err) {
    res.status(500).json({
      error: err
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const post = req.body
    await Posts.create(post)
    res.json(post)
  } catch (err) {
    res.status(500).json({
      error: err
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findByPk(req.params.id)
    res.json(post)
  } catch (err) {
    res.status(500).json({
      error: err
    })
  }
})

module.exports = router