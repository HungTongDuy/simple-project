// server/models/User.js
const mongoose = require('mongoose')
let UserSchema = new mongoose.Schema (
    {
        name: String,
        email: String,
        provider: String,
        provider_id: String,
        token: String,
        provider_pic: {
            _id: String,
            version: String,
            format: String,
            url: String
        },
        password: String,
        first_name: String,
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }, { timestamps: true }
)

UserSchema.methods.follow = function (user_id) {
    if (this.following.indexOf(user_id) === -1) {
        this.following.push(user_id);
    } else {
        this.following.splice(this.following.indexOf(user_id), 1);
    }
    return this.save()
}

UserSchema.methods.addFollower = function (fs) {
    this.followers.push(fs)        
}

module.exports = mongoose.model('User', UserSchema)