const Webtoon = require('../models/Webtoons');

module.exports = {
  getWebtoons: async (req, res) => {
    try {
      const webtoonItems = await Webtoon.find({ userId: req.user.id });
      res.render('webtoons.ejs', { webtoon: webtoonItems, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  addWebtoon: async (req, res) => {
    try {
      await Webtoon.create({
        title: req.body.title,
        lastReadChapter: req.body.lastReadChapter,
        source: req.body.source,
        dateAdded: new Date().toLocaleDateString(`en`, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        userId: req.user.id,
      });
      console.log('Webtoon has been added!');
      res.redirect('/webtoons');
    } catch (err) {
      console.log(err);
    }
  },

  deleteWebtoon: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await Webtoon.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).send('Document not found');
      }
      res.send('Document deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};
