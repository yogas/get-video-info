const express = require('express')
const router = express.Router()
const fs = require('fs')

// @route   GET /
// @desc    Index page
// @access  Public
router.get('/', (req, res) => {
    const html = fs.readFileSync(__dirname.replace('/routers', '') + '/public/index.html', 'utf-8')
    res.send(html)
})

module.exports = router