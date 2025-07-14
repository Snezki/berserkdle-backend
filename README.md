npm run generateConf
npx sequelize-cli db:migrate 
npx sequelize-cli db:seed:all
npm run dev

then, run /api/create-questions to create question for today