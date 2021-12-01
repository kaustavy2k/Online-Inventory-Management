const users = require("../models/user");
exports.showitems = async (req, res) => {
  try {
    let items = [];
    if (req.query.search) {
      items = await users.find({
        $or: [
          { name: { $regex: `.*${req.query.search}` } },
          { email: { $regex: `.*${req.query.search}` } },
        ],
      });
    } else {
      items = await users.find();
    }
    if (items.length != 0) {
      res.status(200).json({
        message: "users",
        items: items,
        role: req.user.role,
      });
    } else {
      res.status(200).json({
        message: "users",
        items: [],
        role: req.user.role,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};

exports.deleteuser = async (req, res) => {
  await users.deleteOne({ _id: req.body.id });

  res.status(200).json({
    status: "success",
    message: "account deleted",
  });
};
exports.updateuser = async (req, res) => {
  await users.updateOne(
    { _id: req.body.id },
    {
      $set: {
        blocked: req.body.blocked,
      },
    }
  );

  res.status(200).json({
    status: "success",
    message: "account deleted",
  });
};
