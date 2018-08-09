var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true},
    password: String,
    date: { type: Date, default: Date.now},

});

userSchema.pre('save', function(next){
    var user = this;

    if (!user.isModified('password'))
    {return next();}

    bcrypt.genSalt(10, function(err, salt){
        if (err)
        {return next(err);}

        bcrypt.hash(user.password, salt, function(err, hash){
            if (err)
            {return next(err);}

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err)
        {return cb(err);}

        cb(null, isMatch);
    });
};
module.exports = mongoose.model('User', userSchema);
