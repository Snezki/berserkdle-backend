const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const sequelize = require('./config/db')
const { Character, CharacterQuestion, Question, Sequelize } = require('./models')
const { createDailyEntries } = require('./cronTasks')
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
    })

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Berserkdle API' })
})

app.get('/api/questions-characters', async (req, res) => {
    try {
        const results = await CharacterQuestion.findAll({
            include: [
                {
                    model: Question,
                    as: 'Question',
                    attributes: ['question'],
                }, 
                {
                    model: Character,
                    as: 'Character',
                    attributes: ['name'],     
                }
            ]
        })

        for (const result of results) {
            console.log(result.Character)
            
        }
        res.json(results.map(entry => ({
            question: entry.Question.question,
            character: entry.Character.name
        })));
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching questions with characters' })
    }
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

app.get('/api/get-random-character', async (req, res) => {
    try {
        const randomCharacter = await Character.findOne({
            order: Sequelize.literal('RANDOM()')
        })

        if (randomCharacter) {
            res.json(randomCharacter)
        } else {
            res.status(400).send('No characters found')
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error fetching randoom character'})
    }
})

app.get('/api/create-questions', async (req, res) => {
    try {
        await createDailyEntries()
        res.json('Question created')
    } catch (error) {
        res.status(500).json({error})
    }
})

module.exports = app