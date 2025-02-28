const Hypercore = require('hypercore');
const Hyperswarm = require('hyperswarm');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const feed = new Hypercore('./data/help-requests', { valueEncoding: 'json' });
const swarm = new Hyperswarm();

feed.ready(() => {
    swarm.join(feed.discoveryKey);
    swarm.on('connection', (socket) => feed.replicate(socket));
});

// Add new help request
app.post('/add-request', async (req, res) => {
    const { name, location, message } = req.body;
    await feed.append({ name, location, message, timestamp: new Date().toISOString() });
    res.json({ success: true });
});

// Get all requests
app.get('/requests', async (req, res) => {
    const requests = [];
    feed.createReadStream()
        .on('data', (data) => requests.push(data))
        .on('end', () => res.json(requests));
});

app.listen(5000, () => console.log('Server running on port 5000'));
