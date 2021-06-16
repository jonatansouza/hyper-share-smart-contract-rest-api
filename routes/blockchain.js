const debug = require('debug')('hyper-share-smart-contract-rest-api:server');
const express = require('express');
const FabricNetworkProvider = require('../providers/fabric-network.provider');
const router = express.Router();

const getStatusAndMessage = (e) => {
  const status = (e && e.status) ? e.status : 500; 
  const message = (e && e.message) ? e.message : 'Unknown Error';
  return {
    status,
    message
  }
}

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({
    description: 'gateway to hyper share smart contract'
  });
});

router.get('/owners/:ownerId/shared-data/:id', async (req, res, next) => {
  const { id, ownerId } = req.params;
  try {
    const gateway = new FabricNetworkProvider();
    const result = await gateway.submitTransaction('readSharedData', [
      id,
      ownerId
    ])
    return res.status(200).json(result);
  } catch(e) {
    return res.status(400).json({error: JSON.stringify(e)});
  }
});

router.post('/owners/:ownerId/shared-data', async (req, res, next) => {
  const { ownerId } = req.params;
  const {sharedDataId, sharedDataDescription} = req.body;
  try {
    const gateway = new FabricNetworkProvider();
    const result = await gateway.submitTransaction('createSharedData', [
      sharedDataId,
      ownerId,
      sharedDataDescription,
      '' + new Date().getTime()
    ]);
    return res.status(201).json({result});
  } catch(e) {
    const {status, message} = getStatusAndMessage(e);
    return res.status(status).json({message});
  }
});

router.get('/owners/:id', async (req, res, next) => {
  const {id} = req.params;
  try {
    const gateway = new FabricNetworkProvider();
    const result = await gateway.submitTransaction('allSharedDataFromOwner', [
      id
    ]);
    return res.status(200).json({result});
  } catch(e) {
    const {status, message} = getStatusAndMessage(e);
    return res.status(status).json({message});
  }
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
