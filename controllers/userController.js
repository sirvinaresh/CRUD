const User = require('../models/User');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'languagepdf@gmail.com',
    pass: 'xagi tymx lcox sfwk'
  }
});


// Create User
exports.createUser = async (req, res) => {
  try {

    var mailOptions = {
      from: 'languagepdf@gmail.com',
      to: req.body.email,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, async function(error, info){
      if (error) {
        console.log(error);
      } else {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
      }
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  try {

    const limit = 2
    var TotalRecord = await User.countDocuments();
    const TotalPage = Math.ceil(TotalRecord / limit);
    var PageNo = req.query.pageno || 1;
    var start = (PageNo-1)*limit; 

    const users = await User.find().limit(limit).skip(start);
    res.json({users,TotalPage,PageNo});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single User
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

