exports.getAllFacilities = (req, res) => {
  let name = req.user.name;
  res.status(200).json({
    name: name,
  });
};
