const Course = require('../models/Course')
const {mutipleMongooseToObject} = require('../../util/mongoose')
class MeController {

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({}).lean();

        if(req.query.hasOwnProperty('_sort')) {
            const sortType = req.query.type === 'default' ? '' : req.query.type;
            courseQuery = courseQuery.sort({
                [req.query.column]: sortType
            });
        }

        Promise.all([Course.countDocumentsDeleted(), courseQuery])
            .then(([deletedCount, courses]) => 
                res.render('me/stored-courses', {
                    courses,
                    deletedCount,
                })
            )
            .catch(next)
    }   

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Promise.all([Course.countDocuments(), Course.findDeleted({}).lean()])
            .then(([deletedCount, courses]) => 
                res.render('me/trash-courses', {
                    courses,
                    deletedCount,
                })
            )
            .catch(next) 
    }
}

module.exports = new MeController();
