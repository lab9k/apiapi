module.exports = {
  createOne (req, res, next) {
    res.json({ 'recieved': { ...req.body } })
  }
}
