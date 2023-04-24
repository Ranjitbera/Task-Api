const express = require('express');
const { Router } = require('express');
const Tasks = require('../model/tasks.js')
const router = Router();

router.post('/v1/tasks', async (req, res) => {


    try {
        if (req.body.tasks) {
            const data = await Tasks.insertMany(req.body.tasks);
            res.status(201).json({ tasks: data })
        } else {
            const data = new Tasks(req.body);
            const newdata = await data.save();
            res.status(201).json({ id: newdata._id });
        }

    } catch (err) {
        console.log(err)
    }

});
router.get('/v1/tasks', async (req, res) => {
    try {
        const newdata = await Tasks.find();
        res.status(200).json({ tasks: newdata });
    } catch (err) {
        console.log(err)
    }

});
router.get('/v1/tasks/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const newdata = await Tasks.find({ _id: id })
        res.status(200).json(newdata);
    } catch (err) {
        res.status(404).json({ error: "There is no task at that id" })
    }

});
router.delete('/v1/tasks/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const newdata = await Tasks.deleteOne({ _id: id })
        res.status(204).send("none")
    } catch (err) {
        console.log(err)
    }

});

router.put('/v1/tasks/:id', async (req, res) => {
    const id = req.params.id;
    const update = req.body;

    try {
        const newdata = await Tasks.updateMany({ _id: id }, { $set: update })
        res.status(204).send("none");
    } catch (err) {
        res.status(404).json({ error: "There is no task at that id" })
    }

});

router.delete('/v1/tasks', async (req, res) => {
    const id = req.params.id;

    try {
        const data = req.body.tasks;
        for(let i = 0; i<data.length; i++){
        const newdata = await Tasks.deleteOne({ _id:data.id })
        }
        res.status(204).send("none")
    } catch (err) {
        console.log(err)
    }

});




module.exports = router