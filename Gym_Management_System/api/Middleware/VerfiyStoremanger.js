export const verfiyStoreManger = (req, res, next) => {
    if (!req.user.isStoreManger) {
        return res.status(403).json({ success: false, message: 'Access denied. Only StoreManger are allowed.' });
    }
    next();
};