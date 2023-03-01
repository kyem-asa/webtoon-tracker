module.exports = {
  getIndex: async (request, response) => {
    try {
      response.render('home.ejs')
    } catch (error) {
      console.error(error);
    }
  },
  
}
