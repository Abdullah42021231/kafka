import { model, Schema } from "mongoose";

const logSchema =new Schema({
    userId: { 
        type: String,
         required: true 
    },
     action: { 
        type: String, 
        required: true
     },
  timestamp: { 
    type: Date, 
    default: Date.now },
  details: { 
    type: Object 
},

})

export const LOG = model('LOG',logSchema)