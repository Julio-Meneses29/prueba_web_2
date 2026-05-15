const pool = require('../config/db');

exports.saveResults = async (items, sourceUrl) => {
    const sql = 'INSERT INTO productos (nombre, precio, categoria, url_fuente) VALUES (?, ?, ?, ?)';
    try {
        for (const item of items) {
            await pool.execute(sql, [item.nombre, item.precio, item.categoria, sourceUrl]);
        }
    } catch (error) {
        console.error('Error MySQL:', error);
        throw new Error('Error al guardar en la base de datos');
    }
};