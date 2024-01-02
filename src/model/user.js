const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
var crypto = require('crypto'); 

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required : true
        },
        password: {
            type: String,
            required : true
        },
        email: String,
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

userSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const User = mongoose.model('user', userSchema);

module.exports = User;
