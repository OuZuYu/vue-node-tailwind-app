const express = require('express')
const router = express.Router()
const { Comments } = require('../models')

router.get('/:postId', async (req, res) => {
  const list = await Comments.findAll({ where: { PostId: req.params.postId }})
  res.json(list)
})
router.post('/', async (req, res) => {
  const comment = await Comments.create(req.body)
  res.json(comment)
})

module.exports = router