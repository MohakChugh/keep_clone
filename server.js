const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8080

const routes = require('./routes/routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get('/', async (req, res) => {
    res.send('Hello world');
})

app.use('/api', routes)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});