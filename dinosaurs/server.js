// server.js

require('dotenv').config()
const express = require('express');
const app = express();
const {Pool} = require('pg')
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get('/dinosaurs', async (req, res) => {
  const { continent, country, period, museum } = req.query;

  let baseQuery = `
    SELECT
      d.dinosaur_id,
      d.dinosaur_name,
      d.diet,
      d.time_period,
      d.common_name,
      d.wiki_link,
      COALESCE(countries.habitats, 'Unknown') AS habitat,
      COALESCE(continents.continents, 'Unknown') AS continents,
      COALESCE(museums.museums_list, 'Unknown') AS museums_list
    FROM dinosaur d
    LEFT JOIN (
      SELECT h.dinosaur_id, STRING_AGG(DISTINCT c.country_name, ', ') AS habitats
      FROM habitat h JOIN country c ON h.country_id = c.country_id
      GROUP BY h.dinosaur_id
    ) countries ON countries.dinosaur_id = d.dinosaur_id
    LEFT JOIN (
      SELECT h.dinosaur_id, STRING_AGG(DISTINCT cn.continent_name, ', ') AS continents
      FROM habitat h
      JOIN country c ON h.country_id = c.country_id
      JOIN continent cn ON c.continent_id = cn.continent_id
      GROUP BY h.dinosaur_id
    ) continents ON continents.dinosaur_id = d.dinosaur_id
    LEFT JOIN (
      SELECT md.dinosaur_id, STRING_AGG(DISTINCT m.museum_name, ', ') AS museums_list
      FROM museum_dinosaur md
      JOIN museum m ON md.museum_id = m.museum_id
      GROUP BY md.dinosaur_id
    ) museums ON museums.dinosaur_id = d.dinosaur_id
    WHERE 1=1
  `;

  const params = [];
  
  if (continent) {
    baseQuery += ` AND continents.continents ILIKE $${params.length + 1}`;
    params.push(`%${continent}%`);
  }

  if (country) {
    baseQuery += ` AND countries.habitats ILIKE $${params.length + 1}`;
    params.push(`%${country}%`);
  }

  if (period) {
    baseQuery += ` AND d.time_period ILIKE $${params.length + 1}`;
    params.push(`%${period}%`);
  }

  if (museum) {
    baseQuery += ` AND museums.museums_list ILIKE $${params.length + 1}`;
    params.push(`%${museum}%`);
  }

  baseQuery += ` ORDER BY d.dinosaur_name`;

  try {
    const result = await pool.query(baseQuery, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Filter query error: ', err);
    res.status(500).send('Filtering error');
  }
});




// const dinoquery = `
//     SELECT
//     d.dinosaur_id,
//     d.dinosaur_name,
//     d.diet,
//     d.time_period,
//     d.common_name,
//     d.wiki_link,
    
//     -- Aggregate countries (habitat)
//     COALESCE(countries.habitats, 'Unknown') AS habitat,
    
//     -- Aggregate continents (optional, if needed)
//     COALESCE(continents.continents, 'Unknown') AS continents,
    
//     -- Aggregate museums
//     COALESCE(museums.museums_list, 'Unknown') AS museums_list

//     FROM dinosaur d

//     -- Subquery to get all countries per dino as a comma list
//     LEFT JOIN (
//     SELECT
//         h.dinosaur_id,
//         STRING_AGG(DISTINCT c.country_name, ', ') AS habitats
//     FROM habitat h
//     JOIN country c ON h.country_id = c.country_id
//     GROUP BY h.dinosaur_id
//     ) countries ON countries.dinosaur_id = d.dinosaur_id

//     -- Subquery to get all continents per dino as a comma list
//     LEFT JOIN (
//     SELECT
//         h.dinosaur_id,
//         STRING_AGG(DISTINCT cn.continent_name, ', ') AS continents
//     FROM habitat h
//     JOIN country c ON h.country_id = c.country_id
//     JOIN continent cn ON c.continent_id = cn.continent_id
//     GROUP BY h.dinosaur_id
//     ) continents ON continents.dinosaur_id = d.dinosaur_id

//     -- Subquery to get all museums per dino as a comma list
//     LEFT JOIN (
//     SELECT
//         md.dinosaur_id,
//         STRING_AGG(DISTINCT m.museum_name, ', ') AS museums_list
//     FROM museum_dinosaur md
//     JOIN museum m ON md.museum_id = m.museum_id
//     GROUP BY md.dinosaur_id
//     ) museums ON museums.dinosaur_id = d.dinosaur_id
//     ORDER BY d.dinosaur_name
// ;`

//     app.get('/dinosaurs', async (req, res) => {
//     try {
//         const result = await pool.query(dinoquery);
//         res.json(result.rows);
//     } catch (err) {
//         console.error('DB Error: ', err);
//         res.status(500).send('Error querying database');
//     }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });