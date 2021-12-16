const users = require("../models/user");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("./../utils/email");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};
exports.signup = async (req, res) => {
  try {
    if (await users.findOne({ email: req.body.email })) {
      return res.status(500).json({
        status: "failure",
        message: {
          errors: {
            email: {
              message: "email already registered",
            },
          },
        },
      });
    } else {
      const newuser = await users.create(req.body);
      newuser.password = undefined;
      const token = signToken(newuser._id);
      res.cookie("jwt", token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      });

      res.status(200).json({
        status: "success",
        token,
        data: {
          user: newuser,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};
exports.login = async (req, res) => {
  try {
    let correct;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).json({
        status: "failure",
        message: "Please provide email and password",
      });
    }

    const user = await users.findOne({ email });
    if (user.blocked) {
      return res.status(500).json({
        status: "failure",
        message: "You are blocked",
      });
    }
    if (user) {
      correct = await bcrypt.compare(password, user.password);
    }
    if (!user || !correct) {
      return res.status(500).json({
        status: "failure",
        message: "Incorrext email or password",
      });
    }

    const token = signToken(user._id);
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });

    user.password = undefined;
    res.status(200).json({
      status: "success",
      token,
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  let token = req.cookies.jwt;
  let decoded;
  if (!token) {
    return res.status(500).json({
      status: "failure",
      message: "you are not logged in. Please log in to continue",
    });
  }
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
  const currentUser = await users.findById(decoded.id);
  if (!currentUser) {
    return res.status(500).json({
      status: "failure",
      message: "the user doesnt exist anymore",
    });
  }
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return res.status(500).json({
      status: "failure",
      message: "User recently changed password! Please log in again.",
    });
  }
  req.user = currentUser;
  next();
};

exports.forgotPassword = async (req, res) => {
  const user = await users.findOne({ email: req.body.email });
  if (!user) {
    return res.status(500).json({
      status: "failure",
      message: "no email found",
    });
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const message = `Forgot your password? Here is your reset token ${resetToken} Copy and Paste it `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
      resetToken,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(500).json({
      status: "failure",
      message: "error sending email!",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await users.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(500).json({
        status: "failure",
        message: {
          errors: {
            token: {
              message: "Wrong Token",
            },
          },
        },
      });
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    user.password = undefined;
    const token = signToken(user._id);
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    console.log(req.body);
    const user = await users.findById(req.user.id);
    if (
      !(await user.correctPassword(req.body.oldpassword, user.password))
    ) {
      return res.status(500).json({
        status: "failure",
        message: {
          errors: {
            email: {
              message: "Your password is wrong",
            },
          },
        },
      });
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    user.password = undefined;
    const token = signToken(user._id);
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
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
exports.updateUser = async (req, res) => {
  try {
    let user = await users.findById(req.user.id);
    console.log(user);
    if (!user) {
      return res.status(500).json({
        status: "failure",
        message: "Users not found",
      });
    }
    await users.updateOne(
      { _id: req.user.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
        },
      }
    );
    user = await users.findById(req.user.id);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};
