const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')

const jwt = require('jsonwebtoken')

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

router.post('/login',
    async (req, res) => {
      try {
        const {username, password} = req.body
        console.log(username)
        const user = await Users.findOne({
          where: { username: username }
        })

        if (!user) {
          res.status(403).json({
            error: '账号错误'
          })
        }

        if (user.password === password) {
          const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '7d' })
          res.json({user, token})
        } else {
          res.status(403).json({
            error: '密码错误'
          })
        }
      } catch (err) {
        res.status(500).json({
          error: err
        })
      }
    })

module.exports = router