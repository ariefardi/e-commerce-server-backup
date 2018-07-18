const Model = require('../models/user-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class Controller {
    static getPost(req,res){
        Model.find()
        .then(dataUsers => {
            res.status(200).json({
                message: 'data users',
                dataUsers
            })
        })
    }

    static signUp(req,res){
        console.log(req.body);
        let username = req.body.username;
        let email = req.body.email;
        if (req.body.password.length < 8) {
          res.status(500).json({
            message: "password need 8 characters"
          });
        } else {
          const salt = bcrypt.genSaltSync(7);
          const hash = bcrypt.hashSync(req.body.password, salt);
          let password = hash;
          Model.findOne({ username })
            .then(found => {
              if (found) {
                res.status(500).json({
                  message: "username is used"
                });
              } else {
                Model
                  .create({
                    username,
                    email,
                    password
                  })
                  .then(user => {
                    res.status(200).json({
                      message: "successfully sign up",
                      user
                    });
                  });
              }
            })
            .catch(err => {
              if (err) {
                console.log(err);
              }
            });
        }
      }

    static login(req,res){
        console.log(req.body)
        Model.findOne({username: req.body.username})
        .then(found =>{
            console.log(found.password,'ini found')
            if (found.length!==0) {  
                const isPassword = bcrypt.compareSync(req.body.password,found.password)
                if(isPassword){
                    console.log(isPassword,'ini mauk gka')
                    const token = jwt.sign({userId: found._id},`superfox`)
                    res.status(200).json({
                        message: `sigin succed`,
                        token,
                        found
                    })
                }
                else {
                    res.status(500).json({
                        message: `username/password salah`
                    })
                }
            }
            else {
                req.status(500).json({
                    message: `username/password salah`
                })
            }
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                message: 'duh  error patrick'
            })
            console.log(err)
        })
    }
}

module.exports = Controller