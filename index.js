const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000

//add whitelisted origins here
const corsOptions = {
	origin: ['http://localhost:3000'],//where our Next.js front-end would be served from
	optionsSuccessStatus: 200//for compatibility with older browsers
}

//for handling form input
app.use(express.json({limit: '5mb'}))
app.use(express.urlencoded({ extended: true }))

const carRoutes = require('./routes/cars')

//use cors as a middleware passing in options
app.use('/api/cars', cors(corsOptions), carRoutes)

app.listen(port, () => {
    console.log(`API is now online on port ${ port }`)
})