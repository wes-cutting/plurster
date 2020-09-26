const express = require('express');

module.exports = function (collection) { 
    const router = express.Router(); 
    router.get('/:key/:value', async function(req, res, next){
        try{
            const info = {
                key: req.params.key,
                value: req.params.value
            }
            console.log(info);
            const data = await collection.findMany(info);
            res.json(data);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    })

    router.get('/:id', async function(req, res, next) {
        try{
            const data = await collection.findOne(req.params.id);
            res.json(data);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });

    router.get('/', async function(req, res, next) {
        try{
            const data = await collection.findAll();
            res.json(data);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    router.post('/bulk', async function(req, res, next){
        try{
            const data = await collection.createMany(req.body);
            res.json(data);
        } catch (err) {
            res.status(500).send(err);
        }
    })

    router.post('/', async function(req, res, next){
        try{
            const data = await collection.createOne(req.body);
            res.json(data);
        } catch (err) {
            res.status(500).send(err);
        }
    })

    router.patch('/:id', async function(req, res, next){
        try{
            const info = {
                id: req.params.id,
                data: req.body
            }
            const data = await collection.updateOne(info);
            res.json(data);
        } catch (err) {
            res.status(500).send(err);
        }
    })

    router.delete('/:id', async function(req, res, next){
        try{
            const data = await collection.deleteOne(req.params.id);
            res.json(data);
        } catch (err) {
            res.status(500).send(err);
        }
    })

    return router;
}