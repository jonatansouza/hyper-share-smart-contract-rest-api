var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({
    description: 'gateway to hyper share smart contract'
  });
});

router.get('/shared-data/:id', (req, res, next) => {
  const {id} = req.params;
  res.json({
    description: 'get shared-data ' + id
  });
});

router.post('/shared-data/:id', (req, res, next) => {
  const {id} = req.params;
  res.json({
    description: 'post shared-data ' + id
  });
});

router.patch('/shared-data/:id', (req, res, next) => {
  const {id} = req.params;
  res.json({
    description: 'patch shared-data ' + id
  });
});


router.delete('/shared-data/:id', (req, res, next) => {
  const {id} = req.params;
  res.json({
    description: 'delete shared-data ' + id
  });
});

router.post('/shared-data/:id/grant-access', (req, res, next) => {
  const {id} = req.params;
  res.json({
    description: 'grantAccess ' + id
  });
});

router.post('/shared-data/:id/revoke-access', (req, res, next) => {
  const {id} = req.params;
  res.json({
    description: 'revokeAccess ' + id
  });
});


router.post('/shared-data/:id/request-permission', (req, res, next) => {
  const {id} = req.params;
  res.json({
    description: 'requestPermission ' + id
  });
});

router.get('/owners/:id', (req, res, next) => {
  const {id} = req.params;
  res.json({
    description: 'byOwner ' + id 
  });
});

router.get('/shared-data/:id/history', (req, res, next) => {
  const {id} = req.params;
  res.json({
    description: 'history ' + id
  });
});


module.exports = router;
