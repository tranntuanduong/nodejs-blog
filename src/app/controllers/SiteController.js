
class SiteController {
    
    // [GET] /Site
    index(req, res, next) {
        res.render('home');
    }

    // [GET] /news/:slug 
    search(req, res, next) {
        res.render('search');
    }

}

module.exports = new SiteController;