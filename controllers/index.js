module.exports = {
    getIndex: (req, res) => {
        res.render('index.ejs')
    },

    getGuest: (req, res) => {
      res.render('webtoons.ejs')
    }
}