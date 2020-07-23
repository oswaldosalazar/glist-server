const moment = require('moment');
const jwt = require('jsonwebtoken');

function encodeToken(user) {
  const payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user.email
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}

function decodeToken(token, callback) {
  const payload = jwt.verify(token, process.env.TOKEN_SECRET);
  const now = moment().unix();

  // check if token has expired

  if (now > payload.exp) callback('Token has expired');
  else callback(null, payload);
}

module.exports = {
  encodeToken,
  decodeToken
};
