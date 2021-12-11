const inventoryitems = require("../models/inventoryitems");
exports.additems = async (req, res) => {
  try {
    for (let i of req.body.data) {
      i.item = i.item.toLowerCase();
      await inventoryitems.create(i);
    }
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
    let items,
      total = [];
    if (req.query.search) {
      items = await inventoryitems.find({
        item: { $regex: `.*${req.query.search}` },
      });
    } else {
      items = await inventoryitems
        .find()
        .sort({ _id: -1 })
        .skip((req.query.page * 1 - 1) * req.query.numPerPage)
        .limit(req.query.numPerPage * 1);
      total = await inventoryitems.find();
    }
    if (items.length != 0) {
      res.status(200).json({
        message: "inventory items",
        items: items,
        role: req.user.role,
        totalitems: total.length,
      });
    } else {
      res.status(200).json({
        message: "inventory items",
        items: [],
        role: req.user.role,
        totalitems: 0,
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
    await inventoryitems.findOneAndDelete({ _id: req.params.id });
    const items = await inventoryitems.find();
    if (items.length != 0) {
      res.status(200).json({
        message: "inventory items",
        totalitems: items.length,
      });
    } else {
      res.status(200).json({
        message: "inventory items",
        items: [],
        totalitems: 0,
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
    const updateditem = await inventoryitems.updateOne(
      { _id: req.body._id },
      {
        $set: {
          item: req.body.item.toLowerCase(),
          cost: req.body.cost,
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
