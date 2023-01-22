const test = (req, res) => {
  res.status(200).json({
    message: process.env.NODE_ENV,
  });
};

export default test;
