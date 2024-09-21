'use strict'

const characters = [
  ["Guts", "Human", "Band of the Hawk, Guts' Party", "Volume 1, Chapter 1", "Dragonslayer (Greatsword)", "I’m going to survive, no matter what."],
  ["Griffith", "Human (later Femto)", "Band of the Hawk, God Hand", "Volume 3, Chapter 8", "Sabre", "A dream... it can sustain a man."],
  ["Casca", "Human", "Band of the Hawk", "Volume 4, Chapter 10", "Sword", "You made me weak, Griffith."],
  ["Zodd", "Apostle", "None (later Griffith's ally)", "Volume 5, Chapter 14", "Dual blades", "You're not going to die yet, struggler."],
  ["Puck", "Elf", "Guts' Party", "Volume 1, Chapter 2", "None", "Quit acting like a tough guy! I know you're hurting!"],
  ["Skull Knight", "Undead", "None", "Volume 9, Chapter 28", "Sword of Beherit", "Do not forget this. Your body and soul... belong to me."],
  ["Farnese", "Human", "Holy See, Guts' Party", "Volume 14, Chapter 95", "Sword", "A captive soul in a prison of my own making."],
  ["Serpico", "Human", "Holy See, Guts' Party", "Volume 14, Chapter 95", "Rapier, Sylph Sword", "I'm her servant, but more importantly... I'm her friend."],
  ["Void", "God Hand", "God Hand", "Volume 13, Chapter 83", "Magic and spatial manipulation", "You are destined to be consumed by the dark."],
  ["Femto", "God Hand", "God Hand", "Volume 13, Chapter 83", "Cosmic powers", "I will crush you."],
  ["Rickert", "Human", "Band of the Hawk", "Volume 3, Chapter 8", "None", "I'm not like the rest of you. I can't let it go."],
  ["Judeau", "Human", "Band of the Hawk", "Volume 5, Chapter 15", "Throwing knives", "I was never meant to be a hero."],
  ["Corkus", "Human", "Band of the Hawk", "Volume 3, Chapter 8", "Axe", "It's all just a dream..."],
  ["Pippin", "Human", "Band of the Hawk", "Volume 5, Chapter 15", "Warhammer", "..."],
  ["Mozgus", "Human", "Holy See", "Volume 17, Chapter 116", "Fists (in transformed form)", "This is divine punishment!"],
  ["Rosine", "Apostle", "None", "Volume 16, Chapter 111", "Wings, Elf form", "This is the only way we can live... as elves."],
  ["Ganishka", "Apostle", "Kushan Empire", "Volume 22, Chapter 179", "Lightning, storm powers", "I will not bow before anyone."],
  ["Grunbeld", "Apostle", "Griffith's Army", "Volume 22, Chapter 181", "Flaming warhammer", "I am the flame that burns all."],
  ["Locus", "Apostle", "Griffith's Army", "Volume 22, Chapter 180", "Lance", "The battlefield is where I belong."],
  ["Irvine", "Apostle", "Griffith's Army", "Volume 23, Chapter 187", "Bow", "I never miss."],
  ["Roshinu", "Apostle", "None", "Volume 16, Chapter 111", "Elf-like wings", "Fly with me into eternity."],
  ["Behelit", "Artifact", "None", "Throughout the series", "None", "Offer your blood and soul to transcend humanity."],
  ["Flora", "Witch", "None", "Volume 22, Chapter 180", "Magic", "All things must pass in due time."],
  ["Schierke", "Human", "Guts' Party", "Volume 24, Chapter 201", "Magic", "Stay true to yourself, no matter what."],
  ["Isidro", "Human", "Guts' Party", "Volume 21, Chapter 178", "Shortsword", "I'll be the greatest swordsman ever!"],
  ["Azan", "Human", "Holy See", "Volume 17, Chapter 115", "Mace", "Justice is my blade."],
  ["Charlotte", "Human", "Midland", "Volume 6, Chapter 23", "None", "I can never forget him..."],
  ["Rakshas", "Apostle", "Griffith's Army", "Volume 22, Chapter 181", "Daggers", "I live for chaos."],
  ["Wyald", "Apostle", "Black Dog Knights", "Volume 9, Chapter 37", "Brutal strength", "I feast on fear and carnage."]
]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('characters', characters.map(character => ({
      name: character[0],
      raceSpecies: character[1],
      affiliation: character[2],
      firstAppearance: character[3],
      weapon: character[4],
      quotes: character[5],
      createdAt: new Date(),
      updatedAt: new Date()
    })), {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('characters', null, {});
  }
}
