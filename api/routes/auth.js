const router = require('express').Router();
const axios = require('axios');
const qs = require('querystring');

const { OIDC_CLIENT_ID, OIDC_CLIENT_SECRET, OIDC_REDIRECT_URI, OIDC_ISSUER } = process.env;


router.post('/auth', async (req, res) => {
  try {
    if (!req.body.code) {
        return res.status(400).send({ error: 'Param `code` is missing' });
    }

    if (!req.body.code_verifier) {
        return res.status(400).send({ error: 'Param `code_verifier` is missing' });
    }

    const info = await axios({
      url: `${OIDC_ISSUER}/.well-known/openid-configuration`,
    });

    const { token_endpoint } = info.data;
    const { data } = await axios({
      method: 'POST',
      url: `${token_endpoint}`,
      params: {
        client_id: OIDC_CLIENT_ID,
        client_secret: OIDC_CLIENT_SECRET,
        code: req.body.code,
        grant_type: 'authorization_code',
        redirect_uri: OIDC_REDIRECT_URI,
        code_verifier: req.body.code_verifier
      },
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          'Access-Control-Allow-Origin': '*'
      },
    });

    res.status(200).send(data);
  } catch (error) {
    console.log('An error occurred POST /auth :', error);
    res.status(500).send(error);
  }
})

module.exports = router;