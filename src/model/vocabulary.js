const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');


const vocabularySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        mean: {
            type: String,
            required: true
        },
        important: Boolean,
        complete: Boolean
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

// Override all methods
vocabularySchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Vocabulary = mongoose.model('vocabulary', vocabularySchema);

module.exports = Vocabulary;