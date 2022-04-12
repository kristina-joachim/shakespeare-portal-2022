const router = require("express-promise-router")();

/* GET auth callback. */
router.get("/signin", async function (req, res) {
  const urlParameters = {
    scopes: process.env.OAUTH_SCOPES.split(","),
    redirectUri: process.env.OAUTH_REDIRECT_URI,
  };

  try {
    const authUrl = await req.app.locals.msalClient.getAuthCodeUrl(urlParameters);
    res.redirect(authUrl);
  } catch (error) {
    console.log(`Error: ${error}`);
    req.flash("error_msg", {
      message: "Error getting auth URL",
      debug: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    });
    res.redirect("/");
  }
});

router.get("/signout", async function (req, res) {
  // Sign out
  if (req.session.userId) {
    // Look up the user's account in the cache
    const accounts = await req.app.locals.msalClient.getTokenCache().getAllAccounts();

    const userAccount = accounts.find((a) => a.homeAccountId === req.session.userId);

    // Remove the account
    if (userAccount) {
      req.app.locals.msalClient.getTokenCache().removeAccount(userAccount);
    }
  }

  // Destroy the user's session
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

module.exports = router;
