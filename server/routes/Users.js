const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')

router.post('/register',
    AuthenticationControllerPolicy.register, // 校验
    async (req, res) => {
      try {
        const user = await Users.create(req.body)
        res.json(user)
      } catch (err) {
        res.status(400).send({
          error: '用户名已被注册'
        })
      }
    })

module.exports = router