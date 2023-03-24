const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10;


router.post('/register',
    AuthenticationControllerPolicy.register, // 校验
    async (req, res) => {
      try {
        const reqBody = req.body
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(reqBody.password, salt);
        const user = await Users.create({username: reqBody.username, password: hashedPassword})
        // const userJson = user.get({ plain: true, attributes: { exclude: ['password'] } });
        res.json({username: user.username, msg: '注册成功'})
      } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
          res.status(400).send({
            error: '账号已被注册'
          })
        } else {
          console.error(err);
        }
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
          res.status(403).send({
            error: '账号错误'
          })
          return
        }

        const match = bcrypt.compareSync(password, user.password);
        if (match) {
          const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '7d' })
          res.json({username: user.username, token, msg: '登录成功'})
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