const router = require('express').Router();

router.get('/resource', (req, res) => {
  try {
    const data = { data: [
        { id: '1', name: 'resource1', date: new Date() },
        { id: '2', name: 'resource2', date: new Date() },
        { id: '3', name: 'resource3', date: new Date() }
      ], 
      total: 3
    }

    res.set({
      'Access-Control-Expose-Headers': ['Content-Range', 'X-Total-Count'],
      'Access-Control-Allow-Methods': '*',
      'X-Total-Count': data.total,
      'Content-Range': `resource:${0}-${10}/${data.total}`
    });

    res.status(200).send(data);
  } catch (error) {
    console.log('An error occurred GET /resource :', error);
    res.status(500).send(error);
  }
})

module.exports = router;