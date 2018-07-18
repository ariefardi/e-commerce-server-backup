const mongoose = require('mongoose')
const Schema = mongoose.Schema

let itemSchema = Schema({
    itemName: String,
    price: Number,
    imgSrc: String,
},{timestamp: true})

let Items = mongoose.model('Item',itemSchema)

module.exports = Items