// app.js

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const NETLIFY_SUBDOMAIN = Math.random().toString(36).substring(2, 8);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const urls = {};

app.post('/shorten', (req, res) => {
  const longUrl = req.body.longUrl;
  const shortUrl = `https://${NETLIFY_SUBDOMAIN}.netlify.app/${generateShortUrl()}`;
  urls[shortUrl] = longUrl;
  res.json({ shortUrl });
});

app.get('/:shortUrl', (req, res) => {
  const longUrl = urls[`https://${NETLIFY_SUBDOMAIN}.netlify.app/${req.params.shortUrl}`];
  if (longUrl) {
    res.redirect(301, longUrl);
  } else {
    res.status(404).send('Not found');
  }
});

function generateShortUrl() {
  // implement your own URL shortening algorithm here
  return Math.random().toString(36).substring(2, 8);
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
