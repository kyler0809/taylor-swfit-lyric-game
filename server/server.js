/*  This is the backend file that attains and supplies the random lyric
    to the frontend. cors, axios, and express are needed to be able
    to support the backend. These need to be installed with npm install
    The corsOptions, credentials, and allowed Origins are all functions
    needed by the backend to be able run.
*/

const express = require("express")
const cors = require('cors')
const axios = require('axios')

const app = express();

const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'http://localhost:3000'
]

const corsOptions = {
  origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin){ 
          callback(null, true) 
      } else {
          callback(new Error('Not allowed by CORS'))
      }
  }, 
  optionsSuccessStatus: 200
}

const credentials = (req, res, next) => {
  const origin = req.headers.origin
  if(allowedOrigins.includes(origin)){
    res.header('Access-Control-Allow-Credentials', true)
  }
  next()
}

app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({extended: false}))

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

/*  Called from the frontend to grab a lyric from the Taylor swift API
    dependant on the desired album. Uses axios to grab the json data.
*/
app.get("/grablyric", async (req, res) => {
  const album = req.query.album
  if (album === "Any"){
    response = await axios.get("https://taylorswiftapi.herokuapp.com/get")
  }
  else{  
    response = await axios.get("https://taylorswiftapi.herokuapp.com/get?album="+album)
  }
  console.log(response.data)
  res.send(response.data)
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});