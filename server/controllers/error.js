exports.handleError = (res, err, displayErr, code, connection) => {
  connection.release();
  console.log(err);
  return res.status(code).json({
    err: displayErr
  });
};
