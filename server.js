const express = require('express')
const app = express()
const cors = require('cors')
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')

const {drawFive, duel, getPlayerStats, getAllBots} = require('./public/main')

app.use(express.json())
app.use(cors())

app.get('/robots', getAllBots),
app.get('/robots/five', drawFive),
app.post('/duel', duel),
app.get('/player', getPlayerStats),

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'e4dbcc959daa4802b29df0afa119a9d5',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/api/robots', (req, res) => {
    try {
        Rollbar.log('got bots')
        res.status(200).send(botsArr)
    } catch (error) {
        Rollbar.error('the bots are hard to get')
        console.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        Rollbar.info('Rollbar is pretty cool')
        res.status(200).send({choices, compDuo})
    } catch (error) {
        Rollbar.error('problems getting five bots')
        console.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            Rollbar.info('player lost')
            res.status(200).send('You lost!')
        } else {
            playerRecord.losses++
            Rollbar.info('we won')
            res.status(200).send('You won!')
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
})

app.listen(4000, () => {
  console.log(`Listening on 4000`)
})