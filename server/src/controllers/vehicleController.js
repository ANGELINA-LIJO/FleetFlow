import mongoose from 'mongoose';
import Vehicle from '../models/Vehicle.js';
const allowedTypes = ['Car', 'Van', 'Truck', 'Bus', 'Motorcycle', 'Other'];
const allowedStatuses = ['Active', 'Maintenance', 'Inactive'];
function validate(body) {
  const vehicleNo = String(body.vehicleNo || '').trim().toUpperCase();
  const type = String(body.type || '');
  const driver = String(body.driver || '').trim();
  const status = String(body.status || 'Active');
  const lastServiceDate = body.lastServiceDate;
  if (vehicleNo.length < 2 || vehicleNo.length > 20) return 'Vehicle number must be 2–20 characters.';
  if (!allowedTypes.includes(type)) return 'Select a valid vehicle type.';
  if (driver.length < 2 || driver.length > 100) return 'Driver name must be 2–100 characters.';
  if (!allowedStatuses.includes(status)) return 'Select a valid status.';
  if (!lastServiceDate || Number.isNaN(Date.parse(lastServiceDate))) return 'Enter a valid last service date.';
  if (body.nextServiceDate && Number.isNaN(Date.parse(body.nextServiceDate))) return 'Enter a valid next service date.';
  return null;
}
function values(body) {
  return { vehicleNo: String(body.vehicleNo).trim().toUpperCase(), type: body.type, driver: String(body.driver).trim(), status: body.status || 'Active', lastServiceDate: new Date(body.lastServiceDate), nextServiceDate: body.nextServiceDate ? new Date(body.nextServiceDate) : null, notes: String(body.notes || '').trim() };
}
export async function listVehicles(req, res, next) {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit || '50', 10) || 50));
    const filter = { owner: req.userId };
    if (req.query.status && allowedStatuses.includes(req.query.status)) filter.status = req.query.status;
    if (req.query.type && allowedTypes.includes(req.query.type)) filter.type = req.query.type;
    if (req.query.search) {
      const escaped = String(req.query.search).slice(0, 80).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [{ vehicleNo: { $regex: escaped, $options: 'i' } }, { driver: { $regex: escaped, $options: 'i' } }, { type: { $regex: escaped, $options: 'i' } }];
    }
    const [vehicles, total] = await Promise.all([Vehicle.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(), Vehicle.countDocuments(filter)]);
    res.json({ vehicles, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (err) { next(err); }
}
export async function createVehicle(req, res, next) {
  try {
    const issue = validate(req.body); if (issue) return res.status(400).json({ message: issue });
    const vehicle = await Vehicle.create({ ...values(req.body), owner: req.userId });
    res.status(201).json({ vehicle });
  } catch (err) { next(err); }
}
export async function getVehicle(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: 'Vehicle not found.' });
    const vehicle = await Vehicle.findOne({ _id: req.params.id, owner: req.userId });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found.' });
    res.json({ vehicle });
  } catch (err) { next(err); }
}
export async function updateVehicle(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: 'Vehicle not found.' });
    const issue = validate(req.body); if (issue) return res.status(400).json({ message: issue });
    const vehicle = await Vehicle.findOneAndUpdate({ _id: req.params.id, owner: req.userId }, values(req.body), { new: true, runValidators: true });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found.' });
    res.json({ vehicle });
  } catch (err) { next(err); }
}
export async function deleteVehicle(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: 'Vehicle not found.' });
    const vehicle = await Vehicle.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found.' });
    res.json({ message: 'Vehicle deleted successfully.' });
  } catch (err) { next(err); }
}
export async function summary(req, res, next) {
  try {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const [total, active, maintenance, inactive, overdueService] = await Promise.all([
      Vehicle.countDocuments({ owner: req.userId }), Vehicle.countDocuments({ owner: req.userId, status: 'Active' }),
      Vehicle.countDocuments({ owner: req.userId, status: 'Maintenance' }), Vehicle.countDocuments({ owner: req.userId, status: 'Inactive' }),
      Vehicle.countDocuments({ owner: req.userId, nextServiceDate: { $lt: today } })
    ]);
    res.json({ stats: { total, active, maintenance, inactive, overdueService } });
  } catch (err) { next(err); }
}
