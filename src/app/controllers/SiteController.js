const Course = require('../models/Course')
const {mutipleMongooseToObject} = require('../../util/mongoose')
class SiteController {
  // [GET] /Site
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses)
                })
            })
            .catch(next);
            // res.render('home');    
    }

    // [GET] /news/:slug
    search(req, res, next) {
        res.render('search');
    }
}

module.exports = new SiteController();
