require('dotenv').config()

const mongoose = require('mongoose');
const app = require('./route')
const PORT = process.env.PORT || 3000

async function main() {
  console.log(`Starting Mongoose + Express on port ${PORT}...`);
  await mongoose.connect(process.env.DB_URI);

  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  })
}

main().catch(err => console.log(err));