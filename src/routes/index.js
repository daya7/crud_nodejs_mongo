const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async (req, res) => {
  const Tks = await Task.find();
  console.log(Tks);
  res.render('index', {
    Tks
  });
});

router.post('/add', async (req, res) => {
  const Tk = new Task(req.body);
  await Tk.save();
  res.redirect('/');
});

router.get('/done/:id', async (req, res) => {
  const {id} = req.params;
  const Tk = await Task.findById(id);
  Tk.status = !Tk.status;
  await Tk.save();
  res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
  const {id} = req.params;
  await Task.remove({_id: id});
  res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
  const {id} = req.params;
  const Tk = await Task.findById(id);
  res.render('edit', {
    Tk
  });
});

router.post('/update/:id', async (req, res) => {
  const {id} = req.params;
  await Task.replaceOne({_id: id}, req.body);
  res.redirect('/');
});

module.exports = router;