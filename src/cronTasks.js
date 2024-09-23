const { CharacterQuestion, Question, Character } = require('./models')
const Sequelize = require('sequelize')
const { Op } = require('sequelize')

const createDailyEntries = async () => {
    try {
        const questions = await Question.findAll()

        const today = new Date()
        const startOfDay = new Date(today.setHours(0, 0, 0, 0))
        const endOfDay = new Date(today.setHours(23, 59, 59, 999))

        const existingEntries = await CharacterQuestion.findAll({
            where: {
                createdAt: {
                    [Op.gte]: startOfDay,
                    [Op.lte]: endOfDay,
                },
            },
        })

        if (existingEntries.length > 0) {
            console.log('Entries for today already exist.');
            return;
        }

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