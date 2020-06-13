# passport-cookie

[![Build Status](https://travis-ci.org/rojo2/passport-cookie.svg?branch=master)](https://travis-ci.org/rojo2/passport-cookie)
[![Coverage Status](https://coveralls.io/repos/github/rojo2/passport-cookie/badge.svg?branch=master)](https://coveralls.io/github/rojo2/passport-cookie?branch=master)

Cookie authentication strategy for [Passport](http://passportjs.org)

This module lets you authenticate HTTP requests using cookies, it only allows
you to recover the content of a cookie.

By plugging into Passport, bearer token support can be easily and unobtrusively
integrated into any application or framework that supports [Connect](http://www.senchalabs.org/connect)-style
middleware, including [Express](http://expressjs.com/)..

## Install

```sh
$ npm install passport-cookie
```

## Usage

#### Configure Strategy

The cookie authentication strategy authenticates users using a cookie. The
strategy requires a verify callback, which accepts that credential and calls
done providing a user.

```javascript
passport.use(new CookieStrategy(
  function(token, done) {
    User.findByToken({ token: token }, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  }
));
```

You can pass the following options to the `CookieStrategy`:

    - `cookieName`: Cookie name (defaults to "token")
    - `signed`: Are the cookie signed? (defaults to false)
    - `passReqToCallback`: when `true`, `req` is the first argument to the verify callback (default: `false`)

```javascript
passport.use(new CookieStrategy({
  cookieName: 'auth',
  signed: true,
  passReqToCallback: true
}, function(req, token, done) {
  User.findByToken({ token: token }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    return done(null, user);
  });
})
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the 'cookie' strategy, to authenticate
requests. Requests containing cookies do not require session support, so the
session option can be set to `false`.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```javascript
app.get("/profile",
  passport.authenticate("cookie", { session: false }),
  function(req, res) {
    res.json(req.user);
  });
```

## Tests

```sh
$ npm install
$ npm test
```

## Thanks

Thanks to [Jared Hanson](https://github.com/jaredhanson) for his great [Passport](http://passportjs.org)

## Contributors

- [AzazelN28](https://github.com/azazeln28)
- [Jershon](https://github.com/jylopez)
- [kai101](https://github.com/kai101)

## License

[The MIT License](http://opensource.org/licenses/MIT)

## Donate

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VL264WAE64MLQ&source=url)

Made with ❤ by ROJO 2 (http://rojo2.com)
