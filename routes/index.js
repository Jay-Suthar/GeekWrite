const express = require('express');
const router = express.Router();
const Story = require('../db_models/Story');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
// Login page route.
// GET/
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
})

// dashboard page route.
// GET/
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean()
    res.render('dashboard', {
      name: req.user.firstName,
      stories,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})
module.exports = router;