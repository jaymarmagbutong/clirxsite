import mongoose, { Schema } from "mongoose";

// Define the UserRole schema
const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  permissions: [{
    type: String,
    enum: ['read', 'write', 'delete', 'admin'], // Example permissions, adjust as needed
  }],
}, {
  timestamps: true,
});


const Role = mongoose.models.Role || mongoose.model('Role', RoleSchema);
