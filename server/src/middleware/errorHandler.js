export function errorHandler(err, req, res, next) { // eslint-disable-line
console.error('[ERROR]', err);
if (res.headersSent) return;
const status = err.status || 500;
res.status(status).json({ error: err.message || 'Internal Server Error' });
}