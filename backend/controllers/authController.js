const sign

exports.signUp = async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  if (!name || !email || !password || !passwordConfirm) {
    return res.status(400).json({
      status: "fail",
      message:
        'Please provide all the inputs "name, email, password, passwordConfirm"',
    });
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    const token = user.createToken();

    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};

// exports.login = async (req, res, next) => {};
