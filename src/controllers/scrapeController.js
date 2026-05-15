const { scrapeLocalHTML } = require('../services/cheerioService');
const { saveResults } = require('../services/databaseService');

exports.getHome = (req, res) => {
    const lastSearch = req.cookies.lastSearch || 'Ninguna';
    res.render('index', { lastSearch, error: null });
};

exports.runScrape = async (req, res) => {
    try {
        const data = await scrapeLocalHTML();
        await saveResults(data, 'Local: prueba.html');
        
        // Uso de cookies [requisito solicitado]
        res.cookie('lastSearch', 'prueba.html', { maxAge: 900000, httpOnly: true });

        res.render('results', { items: data });
    } catch (error) {
        // Manejo de errores controlado (HTTP 500) [cite: 14, 68]
        res.status(500).render('index', { 
            error: error.message, 
            lastSearch: req.cookies.lastSearch || 'Ninguna' 
        });
    }
};