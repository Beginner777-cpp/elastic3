const fileSistem = require('fs'),
    path = './gulp/tasks'
arrayPathFills = fileSistem.readdirSync(path).map(cell => cell = path + '/' + cell)

module.exports = arrayPathFills 