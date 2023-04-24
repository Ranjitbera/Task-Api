const mongoose = require('mongoose');
const TASKS = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    is_completed:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('TASKS',TASKS)