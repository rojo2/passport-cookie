/**
 * Module dependencies.
 */
var passport = require("passport-strategy");
var util = require("util");

/**
 * Creates an instance of `Strategy`.
 *
 * Options:
 *
 *   - `cookieName`  Cookie name (defaults to "token")
 *   - `signed` Are the cookie signed? (defaults to false)
 *   - `passReqToCallback`  when `true`, `req` is the first argument to the verify callback (default: `false`)
 *
 * Examples:
 *
 *  passport.use(new CookieStrategy(
 *    function(token, done) {
 *      User.findByToken({ token: token }, function(err, user) {
 *        if (err) { return done(err); }
 *        if (!user) { return done(null, false); }
 *        return done(null, user);
 *      });
 *    }
 *  ));
 *
 * @constructor
 * @param {Object} [options]
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  if (typeof options === "function") {
    verify = options;
    options = {};
  }

  if (!verify) {
    throw new TypeError("CookieStrategy requires a verify callback");
  }

  passport.Strategy.call(this);
  this.name = "cookie";
  this._cookieName = options.cookieName || "token";
  this._signed = options.signed || false;
  this._verify = verify;
  this._passReqToCallback = options.passReqToCallback;
}

/**
 * Inherits from `passport.Strategy`
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Authenticate request based on cookie.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function(req) {
  if ((!this._signed && !req.cookies) || (this._signed && !req.signedCookies)) {
    throw new TypeError("Maybe you forgot to use cookie-parser?");
  }

  var token;
  if (this._signed) {
    if (req.signedCookies[this._cookieName]) {
      token = req.signedCookies[this._cookieName];
    }
  } else {
    if (req.cookies[this._cookieName]) {
      token = req.cookies[this._cookieName];
    }
  }

  if (!token) {
    return this.fail(401);
  }

  var self = this;
  function verified(err, user) {
    if (err) { return self.error(err); }
    if (!user) {
      return self.fail(401);
    }
    self.success(user);
  }

  try {
    if (self._passReqToCallback) {
      this._verify(req, token, verified);
    } else {
      this._verify(token,verified);
    }
  } catch (ex) {
    return self.error(ex);
  }
};

/**
 * Expose `Strategy`
 */
module.exports = Strategy;
