const express = require('express');
const db = require('./data/hubs-model');

const server = express();

server.listen(4000, ()=>{
    console.log('*** listening on port 4000');
});

server.use(express.json());

server.get('/', (req, res)=>{
    res.send('Hello World!');
});

server.get('/now', (req, res)=>{
    res.send(`${Date.now()}`);
});

server.get('/hubs', (req, res)=>{
    db.find()
        .then(hubs => {
            res.status(200).json(hubs);
        })
        .catch(err=>{
            res.status(500).json({ success:false, err });
        });
});

server.post('/hubs', (req, res)=>{
    const hubinfo = req.body;

    db.add(hubinfo)
        .then(hub => {
            res.status(201).json({ success:true, hub });
        })
        .catch(err =>{
            res.status(500).json({ success:false, err });
        });
});

server.delete('/hubs/:id', (req, res)=>{
    const {id} = req.params;

    db.remove(id)
        then(deleted=>{
            if(deleted) {
                res.status(204).end();
            }else{
                res.status(404).json({ success:false, message:'id not found'})
        }
        })
        .catch(err=>{
            res.status(500).json({ success:false, err });
        });
});

server.put('/hubs/:id', (req, res)=>{
    const {id} = req.params;
    const changes = req.body;

    db.update(id, changes)
        .then(updated=>{
            if(updated){
                res.status(200).json({success:true, updated});
            }else{
                res.status(404).json({success:false, message:'id not found'})
            }
        })
        .catch(err=>{
            res.status(500).json({ success:false, err });
        });
});