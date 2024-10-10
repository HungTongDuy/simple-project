const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const User = mongoose.model('User');
const passwordHash = require('password-hash');

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
                    console.log('!!!user');
                    new User(req.body).save((err, newUser) => {
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
            if(req.body.hasOwnProperty('password')) {
                req.body.password = passwordHash.generate(req.body.password);
            }
            new User(req.body).save((err, newUser) => {
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
        console.log('req-user: ', req.body);
        console.log('req-user: ', req.files);
        if (req.files != undefined && req.files.image) {
                cloudinary.uploader.upload(req.files.image.path, (result) => {
                    let obj = { name: req.body.name, provider_pic: result.url != null ? result.url : ''}
                    saveUser(obj)
                },{
                    resource_type: 'image',
                    eager: [
                        {effect: 'sepia'}
                    ]
                })
        } else {
            console.log('req.files undefined');
            let obj = { name: req.body.name, provider_pic: req.body.provider_pic != null ? req.body.provider_pic : ''}
            saveUser(obj);
        }
        function saveUser(obj){
            User.findOneAndUpdate({_id: req.body._id }, obj, {new : true} , (err, user) => {
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