const reportitems = require("../models/reports");
exports.additems = async (req, res) => {
  try {
    await reportitems.create({
      initiatedby: req.user.name,
      role: req.user.role,
      report: req.body.report,
    });

    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};
exports.showitems = async (req, res) => {
  try {
    let items = await reportitems.find().sort({ _id: -1 });

    if (items.length != 0) {
      res.status(200).json({
        items: items,
        role: req.user.role,
      });
    } else {
      res.status(200).json({
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
exports.deleteitems = async (req, res) => {
  try {
    console.log(req.params.id)
    await reportitems.findOneAndDelete({ _id: req.params.id });
    const items = await reportitems.find();
    if (items.length != 0) {
      res.status(200).json({
        items: items,
      });
    } else {
      res.status(200).json({
        items: [],
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};
exports.updateitems = async (req, res) => {
  try {
    const updateditem = await reportitems.updateOne(
      { _id: req.body._id },
      {
        $set: {
          report: req.body.quantity,
        },
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        item: updateditem,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};
