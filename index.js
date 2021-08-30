const express = require('express')
const jawaskrip = require('jawaskrip')
const methodOverride = require('method-override')
const { body, validationResult } = require('express-validator')

const app = express()

const PORT = 3000

app.use(express.json())

app.use(methodOverride())

app.get('/', (req, res) => {
    res.send({
        "message": "This is Jawaskrip repl backend"
    })
})



app.post('/compile', body('code').notEmpty(), async (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        let compiled = await jawaskrip.compile(req.body.code)
        res.status(200).json({
            "compiled": compiled
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            'error': error
        })
    }

})

app.listen(PORT, () => console.log(`Listening Jawaskrip Backend on port ${PORT}`))