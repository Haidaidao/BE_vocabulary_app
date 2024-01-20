const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

//shape data
const userSchema = new mongoose.Schema({
    username: String,
    email: String
});

const vocabularySchema = new mongoose.Schema({
    name: String,
    mean: String,
})

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        userInfor: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        listVocabulary: [{ type: mongoose.Schema.Types.ObjectId, ref: 'vocabulary' }],
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

// Override all methods
courseSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Course = mongoose.model('course', courseSchema);

module.exports = Course;