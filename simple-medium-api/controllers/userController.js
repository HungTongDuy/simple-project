const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const User = mongoose.model('User');
const passwordHash = require('password-hash');
const cloudinary = require('cloudinary');

module.exports = {
    addUser: (req, res, next) => {
        if (req.body.hasOwnProperty('provider_id')) {
            console.log('provider_id');
            User.find({ provider_id : req.body.provider_id })
            .exec((err, user)=> {
                console.log('user-----', user);
                if (err) {
                    res.send(err);
                } else if (user.length == 0) {
                    let data = {
                        name: req.body.name,
                        email: req.body.email,
                        provider: req.body.provider,
                        provider_id: req.body.provider_id,
                        token: req.body.token,
                        provider_pic: {
                            url: req.body.provider_pic
                        }
                    }
                    console.log('!!!user');
                    new User(data).save((err, newUser) => {
                        if (err)
                            return res.send(err)
                        else if (!newUser)
                            return res.send(400)
                        else {
                            console.log('newUser');
                            return res.send(newUser)
                        }
                    });
                } else {
                    console.log('user-409');
                    return res.status(200).send(user[0]);
                }
                //next()      
            })
        } else {
            console.log('none provider_id');
            let data = {
                name: req.body.name,
                email: req.body.email,
                provider: req.body.provider,
                provider_id: req.body.provider_id,
                token: req.body.token,
                provider_pic: {
                    url: req.body.provider_pic
                }
            }
            if(req.body.hasOwnProperty('password')) {
                data.password = passwordHash.generate(req.body.password);
            }
            new User(data).save((err, newUser) => {
                if (err)
                    res.send(err)
                else if (!newUser)
                    res.send(400)
                else
                    res.send(newUser)
            });
        }
    },
    getUser: (req, res, next) => {
        User.findById(req.params.id).then
        /*populate('following').exec*/((err, user)=> {
            console.log('id', req.params.id);
            if (err)
                res.send(err)
            else if (!user)
                res.send(404)
            else {
                res.send(user);
                //res.send(user);
            }
            next()            
        })
    },
    getAllUser: (req, res, next) => {
        User.find({})
        .exec((err, users) => {
            if (err)
                res.send(err)
            else if (!users)
                res.send(404)
            else
                res.send(users)
            next() 
        })
    },
    /**
     * user_to_follow_id, user_id
     */
    followUser: (req, res, next) => {
        User.findById(req.body.id).then((user) => {
            return user.follow(req.body.user_id).then(() => {
                return res.json({msg: "followed"})
            })
        }).catch(next)
    },
    getUserProfile: (req, res, next) => {
        User.findById(req.params.id).then
        ((_user) => {
            return User.find({'following': req.params.id}).then((_users)=>{
                _users.forEach((user_)=>{
                    _user.addFollower(user_)
                })
                _user.following.forEach((userId, key) => {
                    User.findById(userId).then((user_) => {
                        _user.following[key] = user_;
                    })
                })
                return Article.find({'author': req.params.id}).then((_articles)=> {
                    return res.json({ user: _user, articles: _articles })
                })
            })
        }).catch((err)=>console.log(err))
    },
    editUser: (req, res, next) => {
        if(req.body.hasOwnProperty("provider_pic")) {
            req.body.provider_pic = JSON.parse(req.body.provider_pic);
        }
        console.log('req-body: ', req.body);
        console.log('req-files: ', req.files);
        if (req.files != undefined && req.files.image) {
                cloudinary.uploader.upload(req.files.image.path, (result) => {
                    console.log('result-user: ', result);
                    let provider_pic = {
                        _id: result.public_id,
                        version: result.version,
                        format: result.format,
                        url: result.url
                    }
                    let obj = { name: req.body.name, provider_pic: result.url != null ? provider_pic : ''}
                    if(req.body.provider_pic.hasOwnProperty('_id') && req.body.provider_pic._id != null) {
                        console.log('destroy', req.body.provider_pic._id);
                        cloudinary.uploader.destroy(req.body.provider_pic._id, (res_destroy) => {
                            saveUser(obj)
                        })
                    } else {
                        console.log('non-destroy', req.body.provider_pic._id);
                        saveUser(obj)
                    }
                },{
                    resource_type: 'image',
                    eager: [
                        {effect: 'sepia'}
                    ]
                })
        } else {
            let obj = { name: req.body.name, provider_pic: req.body.provider_pic != null ? req.body.provider_pic : ''}
            saveUser(obj);
        }
        function saveUser(obj){
            User.findOneAndUpdate({_id: req.params.id }, obj, {new : true} , (err, user) => {
                if (err)
                    res.send(err)
                else if (!user)
                    res.send(404)
                else
                    res.send(user)
            })
        }

    }
}