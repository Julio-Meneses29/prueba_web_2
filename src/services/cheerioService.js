const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

exports.scrapeLocalHTML = async () => {
    try {
        const filePath = path.join(__dirname, '..', 'prueba.html');
        
        if (!fs.existsSync(filePath)) {
            throw new Error('Archivo prueba.html no encontrado');
        }

        const html = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(html);
        const results = [];

        // Extracción de 3+ datos: nombre, precio, categoría [cite: 14, 66]
        $('.item').each((i, el) => {
            results.push({
                nombre: $(el).find('.title').text().trim() || 'Sin nombre',
                precio: $(el).find('.price').text().trim() || '0',
                categoria: $(el).find('.category').text().trim() || 'General'
            });
        });

        if (results.length === 0) throw new Error('No se detectaron elementos .item');
        return results;
    } catch (error) {
        throw new Error('Error en Scraping: ' + error.message);
    }
};