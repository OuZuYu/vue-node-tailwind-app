const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = Joi.object({
        username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,32}$')),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,32}$')),

      })

    const {error} = schema.validate(req.body)

    if (error) {
      switch (error.details[0].context.key) {
        case 'username':
          res.status(400).send({
            error: '用户名为 6 到 32 个数字或字母'
          })
          break
        case 'password':
          res.status(400).json({
            error: '密码为 6 到 32 个数字或字母'
          })
          break
        default:
          res.status(400).json({
            error: '用户名或或密码格式验证不通过'
          })
      }

    } else {
      next()
    }
  }
}