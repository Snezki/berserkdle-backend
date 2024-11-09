const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const sequelize = require('./config/db')
const { createDailyEntries } = require('./cronTasks')
const { Op } = require('sequelize')
const app = express()

const { Character, CharacterQuestion, Question, Sequelize } = require('./models')
const { getStartOfDay, getEndOfDay } = require('./utils/dateUtils')

const allowedOrigins = ['http://localhost:8080']

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
};

app.use(cors(corsOptions))
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

/**
 * 
 */
app.get('/api/questions-characters', async (req, res) => {
    try {
        const results = await CharacterQuestion.findAll({
            where: {
                createdAt: {
                    [Op.between]: [getStartOfDay(), getEndOfDay()],
                }
            },
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

        res.json(results.map(entry => ({
            question: entry.Question.question,
            character: entry.Character.name
        })));
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching questions with characters' })
    }
})

/**
 * Get all characters
 */
app.get('/api/characters', async (req, res) => {
    try {
        const characters = await Character.findAll()
        res.json(characters)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error fetching characters' })
    }
})

/**
 * Get one random character
 */
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
        res.status(500).json({ error: 'Error fetching random character'})
    }
})

/**
 * Get question quote / character for today
 */
app.get('/api/quote', async (req, res) => {
    const typeQuestion = 'quote'
    try {
        const question = await getTodayQuestionByType(typeQuestion)
        const todayQuestion = await getTodayQuestionCharacter(question.id)
        const todayQuote = todayQuestion.Character.quotes

        res.json({question: question.question, quotes: todayQuote})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error fetching quote question'})
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

app.post('/guesses', async (req, res) => {
    const { questionId, guess } = req.body

    const questionCharacter = await getTodayQuestionCharacter(questionId)
    const guessCharacter = await getCharacterByName(guess)
    const characterToFind = questionCharacter.Character.name
    
    if (guessCharacter.name === characterToFind) {
        res.json('Well done ! The answer was ' + characterToFind)
    } else {
        res.json('Wrong Answer')
    }
    
})

const getTodayQuestionByType = async (typeQuestion) => {
    try {
        return await Question.findOne({
            where: {
                typeQuestion
            },
        })
    } catch (error) {
        res.status(500).json({ error: 'Error fetching question'})
    }
}

const getTodayQuestionCharacter = async (questionId) => {
    try {
        const result = await CharacterQuestion.findOne({
            where: {
                createdAt: {
                    [Op.between]: [getStartOfDay(), getEndOfDay()],
                },
                questionId
            },
            include: [
                {
                    model: Question,
                    as: 'Question',
                    attributes: ['question'],
                }, 
                {
                    model: Character,
                    as: 'Character',
                    attributes: ['name', 'quotes'],
                }
            ]
        });

        if (!result) {
            console.log('No question-character pair found for the given date.');
        }

        return result;
    } catch (error) {
        console.error('Error fetching question character:', error);
        throw error;
    }
}

const getCharacterByName = async (name) => {
    return await Character.findOne({
        where: {
            name
        }
    })
}

module.exports = app