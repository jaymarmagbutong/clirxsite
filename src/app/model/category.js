import mongoose, { Schema } from "mongoose";

const categorySchema =  new Schema ({
    name: {
        type: String,
        required: true,
        trim:true
    },
    slug: {
        type: String,
        trim: true,
        default: null,
    },
    description: {
        type: String,
        trim: true
    },
    parentId: {
        type: Number,
        default: null,
    },
    isActive:{
        type: Number,
        default: 1,
    },
    displayOrder:{
        type: Number,
        trim: true
    }


});


const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export default Category;