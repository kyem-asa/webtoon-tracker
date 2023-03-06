const { response } = require('express')
const Webtoon = require('../models/Webtoons');

module.exports = {
  getWebtoons: async (request, response) => {
    console.log(request.user)
    try {
      const webtoonItem = await Webtoon.find();
      console.log(webtoonItem);
      response.render('webtoons.ejs', { webtoon: webtoonItem });
    } catch (error) {
      console.error(error);
    }
  },

  addWebtoon: async (request, response) => {
    console.log(request.body);
    try {
      await Webtoon.create({
        title: request.body.title,
        lastReadChapter: request.body.lastReadChapter,
        source: request.body.source,
        dateAdded: new Date().toLocaleDateString(`en`, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      });
      console.log('Webtoon added');
      response.redirect('/webtoons');
    } catch (err) {
      console.log(err);
    }
  },

  deleteWebtoon: async (request, response) => {
    try {
      const id = request.params.id;
      const result = await Webtoon.findByIdAndDelete(id);
      if (!result) {
        return response.status(404).send('Document not found');
      }
      response.send('Document deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // getGuest: (request, response) => {
  //   response.render('webtoons.ejs')
  // }
};
