const express = require("express");
const router = express.Router();
const contactModel = require("../models/Contact");
const RequireLogin = require("../middleware/RequireLogin");
const { check } = require("express-validator");

router.post(
  "/createcontact",
  RequireLogin,
  [
    check("fullname", "Fullname of the user is required").not().isEmpty(),
    check("address", "Address souldnot be empty").not().isEmpty(),
    check("phoneone", "Phone souldnot be empty")
      .not()
      .isLength({ min: 10, max: 13 })
      .isEmpty(),
    check("phonetwo", "Phone souldnot be empty")
      .not()
      .isLength({ min: 10, max: 13 })
      .isEmpty(),
  ],
  (req, res) => {
    // req.user.password = undefined;
    const {
      fullname,
      age,
      gender,
      nickname,
      address,
      phoneone,
      phonetwo,
      category,
    } = req.body;
    console.log(req.user);
    console.log(req.body);
    const contact = new contactModel({
      fullname,
      age,
      gender,
      nickname,
      address,
      phoneone,
      phonetwo,
      category,
      addedBy: req.user,
    });
    contact
      .save()
      .then((result) => {
        res.json({ contact: result });
      })
      .catch((err) => console.log(err));
  }
);

router.get("/", RequireLogin, (req, res) => {
  contactModel
    .find({})
    .sort({ createdAt: -1 })
    .then((contact) => {
      res.status(500).json({ contact });
    });
});



router.get("/my/:text", RequireLogin, (req, res) => {
  var kho = req.params.text;
  if (kho == "All") {
    contactModel
      .find({ addedBy: req.user._id })
      .sort("-createdAt")
      .then((mycontact) => {
        res.json({ mycontact })
      }).catch((err) => console.log(err));
  } else {
    contactModel
      .find({ addedBy: req.user._id, category: kho })
      .sort("-createdAt")
      .then((mycontact) => {
        res.json({ mycontact });
      })
      .catch((err) => console.log(err));
  }
});

router.delete("/delete/:contactId", RequireLogin, (req, res) => {
  contactModel.findOne({ _id: req.params.contactId }).exec((err, contact) => {
    if (err || !contact) {
      return res.status(422).json({ error: err });
    }
    if (contact.addedBy._id.toString() === req.user._id.toString()) {
      contact
        .remove()
        .then((result) => {
          res.json(result);
        })
        .catch((err) => console.log(err));
    }
  });
});

module.exports = router;
