const secureRoute = async (req, res, next) => {
    try {
      if (!req.headers.authorization) throw new Error('Missing headers')
      const token = req.headers.authorization.replace('Bearer ', '')
      const payload = jwt.verify(token, process.env.SECRET)
      const { rows } = await client.query("SELECT * FROM users WHERE id = $1;", [payload.sub]
      const userToVerify = rows[0]
      if (!userToVerify) throw new Error('User not found')
      req.currentUser = userToVerify
      next()
    } catch (err) {
      res.status(401).json({ "message": err })
    }
  }