module.exports = {
  mongoURI: process.env.MONGO_URI,
  sessionSecret: process.env.SESSION_SECRET,
  Port: process.env.PORT,
  facebook: {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  },
  google: {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  }
};