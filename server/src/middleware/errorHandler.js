export function notFound(req, res) { res.status(404).json({ message: 'Endpoint not found.' }); }
export function errorHandler(err, req, res, next) {
  if (err?.code === 11000) return res.status(409).json({ message: 'That vehicle number is already in your fleet.' });
  if (err?.name === 'ValidationError' || err?.name === 'CastError') return res.status(400).json({ message: 'Please check the submitted data.' });
  console.error(err);
  res.status(500).json({ message: 'Something went wrong. Please try again.' });
}
