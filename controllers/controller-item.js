const Model = require('../models/item-model')

class Controller{
    static getItem(req,res){
        Model.find()
        .then(items=>{
            res.status(200).json({
                message: 'get Data',
                items
            })
        })
        .catch(err=> {
            res.status(400).json({
                message: err
            })
        })
    }
    static postItem(req,res){
        console.log(req.body)
        let obj = {
            itemName: req.body.itemName,
            price: req.body.price,
            imgSrc: req.body.imgSrc
        }
        let newPost = new Model(obj)
        newPost.save()
        .then(items=> {
            res.status(200).json({
                message: 'sukses posting',
                items
            })
        })
        .catch(err=> {
            res.status(400).json({
                message: err
            })
        })
    }
    static deleteItem(req,res) {
        Model.findByIdAndRemove({
            _id: req.params.id
        })
        .then(()=>{
            res.status(200).json({
                message: "item deletd"
            })
        })
    }
}

module.exports = Controller