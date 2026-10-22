import mongoose from 'mongoose';
const vehicleSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  vehicleNo: { type: String, required: true, trim: true, uppercase: true, maxlength: 20 },
  type: { type: String, required: true, enum: ['Car', 'Van', 'Truck', 'Bus', 'Motorcycle', 'Other'] },
  driver: { type: String, required: true, trim: true, maxlength: 100 },
  status: { type: String, enum: ['Active', 'Maintenance', 'Inactive'], default: 'Active' },
  lastServiceDate: { type: Date, required: true },
  nextServiceDate: { type: Date },
  notes: { type: String, trim: true, maxlength: 500, default: '' }
}, { timestamps: true });
vehicleSchema.index({ owner: 1, vehicleNo: 1 }, { unique: true });
export default mongoose.model('Vehicle', vehicleSchema);
