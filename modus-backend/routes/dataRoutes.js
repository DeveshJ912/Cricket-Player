const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.route('/')
    .get(dataController.getData)
    .post(dataController.addData)

    router.route('/update')
    .post(dataController.updateData)


router.route('/delete')
    .post(dataController.deleteData)

    module.exports = router;