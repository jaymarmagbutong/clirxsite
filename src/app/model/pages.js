import mongoose, { Schema } from "mongoose";

const PagesSchema = new Schema (
    {
        title: { 
            type: String, 
            required: true 
        },
        description: {
             type: String, 
             required: true 
        },
        category: {
            type: String, 
            default: null
       },
        attachments: { 
            type: String
        }  // Adjust this type as needed (e.g., Array, Object)
    },
    {
        timestamps: true
    }
);


const Pages = mongoose.models.Pages || mongoose.model('Pages', PagesSchema);

export default Pages;