const Webtoon = require("../models/Webtoons");

module.exports = {
  getWebtoons: async (request, response) => {
    try {
      const webtoonItem = await Webtoon.find();
      console.log(webtoonItem);
      response.render("home.ejs", { webtoon: webtoonItem });
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
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
      console.log("Webtoon added");
      response.redirect("/webtoons");
    } catch (err) {
      console.log(err);
    }
  },
};
