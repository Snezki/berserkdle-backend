const { CharacterQuestion, Question, Character } = require('./models')
const Sequelize = require('sequelize')

const createDailyEntries = async () => {
    try {
        const questions = await Question.findAll()

        for (const question of questions) {
            const randomCharacter = await getRandomCharacter()
            await CharacterQuestion.create({
                characterId: randomCharacter.id,
                questionId: question.id,
            })
        }
        console.log('Daily entries created successfully.')
    } catch (err) {
        console.error('Error creating daily entries', err)
    }
}

const getRandomCharacter = async () => {
    try {
        const randomCharacter = await Character.findOne({
            order: Sequelize.literal('RANDOM()')
        })

        return randomCharacter
    } catch (error) {
        console.error('Error fetching random character', error)
    }
}

module.exports = { createDailyEntries }