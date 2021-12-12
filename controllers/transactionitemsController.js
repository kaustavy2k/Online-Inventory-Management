const collegeitems = require("../models/collegeitems");
const transactionitems = require("../models/transactionitems");
const stripe = require("stripe")(
  "sk_test_51JISvASGTGDeZiN2lrEjvnv8Y8z8dzVYgAvqypudsuORQdIUVZvDkA05VMR9aU35jw5lDQUVzMVRSsEr24MzkmnH00VR1nMvcf"
);
const dateFormat = require("dateformat");
const { v4: uuidv4 } = require("uuid");
exports.additems = async (req, res) => {
  try {
    for (let i of req.body.data) {
      i.item = i.item.toLowerCase();
      i.initiatedby = req.user.name;
      i.statusby = req.user.role;
      i.initiateddate = dateFormat(new Date(), "dd, mmmm dS, yyyy, h:MM:ss TT");
      await transactionitems.create(i);
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
      items = await transactionitems.find({
        $or: [
          { item: { $regex: `.*${req.query.search}` } },
          { status: { $regex: `.*${req.query.search}` } },
        ],
      });
    } else {
      items = await transactionitems.find().sort({ _id: -1 });
    }
    if (items.length != 0) {
      res.status(200).json({
        message: "college items",
        items: items,
        role: req.user.role,
      });
    } else {
      res.status(200).json({
        message: "college items",
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
    await transactionitems.findOneAndDelete({ _id: req.params.id });
    const items = await transactionitems.find();
    if (items.length != 0) {
      res.status(200).json({
        message: "College items",
        totalitems: items.length,
      });
    } else {
      res.status(200).json({
        message: "College items",
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
    let updateditem;
    if (req.body.flag === 1) {
      updateditem = await transactionitems.updateOne(
        { _id: req.body._id },
        {
          $set: {
            item: req.body.item.toLowerCase(),
            quantity: req.body.quantity,
          },
        }
      );
    } else if (req.body.flag === 2) {
      updateditem = await transactionitems.updateOne(
        { _id: req.body._id },
        {
          $set: {
            status: req.body.status.toLowerCase(),
            statusby: req.user.role,
            cost: req.body.cost ? req.body.cost : "--",
            statusdate: dateFormat(new Date(), "dd, mmmm dS, yyyy, h:MM:ss TT"),
          },
        }
      );
    } else {
      updateditem = await transactionitems.updateOne(
        { _id: req.body._id },
        {
          $set: {
            status: req.body.status.toLowerCase(),
            statusby: req.user.role,
            statusdate: dateFormat(new Date(), "dd, mmmm dS, yyyy, h:MM:ss TT"),
          },
        }
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        item: updateditem,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};
exports.payment = async (req, res) => {
  try {
    const { token, total } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const idempotencyKey = uuidv4();
    await stripe.charges.create(
      {
        amount: total * 84,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased Food`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencyKey,
      }
    );

    await transactionitems.updateOne(
      { _id: req.body.id },
      {
        $set: {
          status: "paid",
          statusby: req.user.role,
          statusdate: dateFormat(new Date(), "dd, mmmm dS, yyyy, h:MM:ss TT"),
        },
      }
    );
    items = await collegeitems.find({
      item: req.body.item,
    });
    if (items.length) {
      let total = items.quantity + req.body.quantity;
      await collegeitems.updateOne(
        { _id: items._id },
        {
          $set: {
            quantity: items[0].quantity + req.body.quantity,
          },
        }
      );
    } else {
      await collegeitems.create({
        item: req.body.item,
        quantity: req.body.quantity,
      });
    }
    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log("e", err);
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};
