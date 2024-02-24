const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized (only admin can make this changes)' });
  }
};


module.exports = {
  isAdmin,
};
