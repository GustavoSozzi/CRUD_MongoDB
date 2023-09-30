const mongoose = require('mongoose')

const Person = mongoose.model('Pessoa', {
    name: String,
    salary: Number,
    approved: Boolean,
})

module.exports = Person