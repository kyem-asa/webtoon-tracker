const Webtoon = require('../models/Webtoons')
const Guest = require('../models/Guest')

module.exports = {
    getWebtoons: async (req,res)=>{
      //show who is logged in via user property that request has with passport
        console.log(req.user)
        try{
          //find in db todo items from the request id by specific user
            const webtoonItems = await Webtoon.find({userId:req.user.id})
            res.render('webtoons.ejs', {webtoon: webtoonItems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    getWebtoonsGuest: async (req,res)=>{
      //show who is logged in via user property that request has with passport
      console.log(req.body)

       console.log(req.session)
       
        try{
          //find in db todo items from the request id by specific user
            const webtoonItems = await Webtoon.find({userName: 'test'})
            res.render('webtoons.ejs', {webtoon: webtoonItems, userName: 'test'})
        }catch(err){
            console.log(err)
        }
    },
    addWebtoon: async (req, res)=>{
        try{
          //create todo and add userid from req body
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
            })
            console.log('Webtoon has been added!')
            res.redirect('/webtoons')
        }catch(err){
            console.log(err)
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
  }
}    