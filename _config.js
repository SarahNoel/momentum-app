module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'my-precious',
  SALT_WORK_FACTOR: 10,
  mongoURI: {
  development: 'mongodb://localhost/momentum-app',
  }
};


