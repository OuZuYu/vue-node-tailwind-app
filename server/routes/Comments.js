const express = require('express')
const router = express.Router()
const { Comments } = require('../models')

router.get('/:postId', async (req, res) => {
  try {
    const list = await Comments.findAll({ where: { PostId: req.params.postId }})
    res.json(list)
  } catch (err) {
    res.status(500).json({
      error: err
    })
  }
})
router.post('/', async (req, res) => {
  try {
    const comment = await Comments.create(req.body)
    res.json(comment)
  } catch (err) {
    res.status(500).json({
      error: err
    })
  }
})

module.exports = router