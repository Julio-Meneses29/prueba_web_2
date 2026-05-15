const express = require('express');
const router = express.Router();
const scrapeController = require('../controllers/scrapeController');

router.get('/', scrapeController.getHome);
router.post('/scrape', scrapeController.runScrape);

module.exports = router;