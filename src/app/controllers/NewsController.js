
class NewsController {
    
    // [GET] /news
    index(req, res, next) {
        res.render('new');
    }

    // [GET] /news/:slug
    show(req, res, next) {
        res.send('show');
    }

}

module.exports = new NewsController;