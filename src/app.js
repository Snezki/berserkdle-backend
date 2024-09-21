const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const sequelize = require('./config/db');
const { Character } = require('./models');

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!')
    })
    .catch(err => {
        console.error('Error syncing database:', err)
    });

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Berserkdle API' })
})

app.get('/api/characters', async (req, res) => {
    try {
        const characters = await Character.findAll()
        res.json(characters)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error fetching characters' })
    }
})

module.exports = app