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

router.head('/owners/:ownerId/shared-data/:id', async (req, res) => {
  const { id, ownerId } = req.params;
  try {
    const gateway = new FabricNetworkProvider();
    const result = await gateway.submitTransaction('sharedDataExists', [
      id
    ])
    if(result) {
      return res.status(204).json({});
    }
    return res.status(404).json({});
  } catch(e) {
    return res.status(404).json({});
  }

})

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
    const {status, message} = getStatusAndMessage(e);
    return res.status(status).json({message});
  }
});

router.post('/owners/:ownerId/shared-data', async (req, res, next) => {
  const { ownerId } = req.params;
  const {sharedDataId, sharedDataDescription, bucket, resourceLocation} = req.body;
  try {
    const gateway = new FabricNetworkProvider();
    const result = await gateway.submitTransaction('createSharedData', [
      sharedDataId,
      ownerId,
      sharedDataDescription,
      bucket,
      resourceLocation,
      '' + new Date().getTime()
    ]);
    return res.status(201).json(result);
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
    return res.status(200).json(result);
  } catch(e) {
    const {status, message} = getStatusAndMessage(e);
    return res.status(status).json({message});
  }
});

router.patch('/owners/:ownerId/shared-data/:id', async (req, res, next) => {
  const { ownerId, id } = req.params;
  const { sharedDataDescription, bucket, resourceLocation } = req.body;
  try {
    const gateway = new FabricNetworkProvider();
    const result = await gateway.submitTransaction('updateSharedData', [
      id,
      ownerId,
      sharedDataDescription,
      bucket,
      resourceLocation,
      '' + new Date().getTime()
    ]);
    return res.status(200).json(result);
  } catch(e) {
    const {status, message} = getStatusAndMessage(e);
    return res.status(status).json({message});
  }
});


router.delete('/owners/:ownerId/shared-data/:id', async (req, res, next) => {
  const { ownerId, id } = req.params;
  try {
    const gateway = new FabricNetworkProvider();
    const result = await gateway.submitTransaction('deleteSharedData', [
      id,
      ownerId
    ]);
    return res.status(202).json(result);
  } catch(e) {
    const {status, message} = getStatusAndMessage(e);
    return res.status(status).json({message});
  }
});

router.post('/owners/:ownerId/shared-data/:id/grant-access', async (req, res, next) => {
  const { ownerId, id } = req.params;
  const { thirdUser } = req.body;
  try {
    const gateway = new FabricNetworkProvider();
    const result = await gateway.submitTransaction('grantAccess', [
      id,
      ownerId,
      thirdUser,
      '' + new Date().getTime()
    ]);
    return res.status(200).json(result);
  } catch(e) {
    const {status, message} = getStatusAndMessage(e);
    return res.status(status).json({message});
  }
});

router.post('/owners/:ownerId/shared-data/:id/revoke-access', async (req, res, next) => {
  const { ownerId, id } = req.params;
  const { thirdUser } = req.body;
  try {
    const gateway = new FabricNetworkProvider();
    const result = await gateway.submitTransaction('revokeAccess', [
      id,
      ownerId,
      thirdUser,
      '' + new Date().getTime()
    ]);
    return res.status(200).json(result);
  } catch(e) {
    const {status, message} = getStatusAndMessage(e);
    return res.status(status).json({message});
  }
});


router.post('/owners/:ownerId/shared-data/:id/request-permission', async (req, res, next) => {
  const { ownerId, id } = req.params;
  try {
    const gateway = new FabricNetworkProvider();
    const result = await gateway.submitTransaction('requestPermission', [
      id,
      ownerId,
      '' + new Date().getTime()
    ]);
    if(result) {
      return res.status(200).json(result);
    }
    return res.status(401).json(result);
  } catch(e) {
    const {status, message} = getStatusAndMessage(e);
    return res.status(status).json({message});
  }
});

router.get('/owners/:ownerId/shared-data/:id/history', async (req, res, next) => {
  const { id } = req.params;
  try {
    const gateway = new FabricNetworkProvider();
    const result = await gateway.submitTransaction('historySharedData', [
      id
    ]);
    if(result) {
      return res.status(200).json(result);
    }
    return res.status(401).json(result);
  } catch(e) {
    const {status, message} = getStatusAndMessage(e);
    return res.status(status).json({message});
  }
});

router.get('/owners/:id/shared-with-me', async (req, res, next) => {
  const {id} = req.params;
  try {
    const gateway = new FabricNetworkProvider();
    const result = await gateway.submitTransaction('AllSharedWithThird', [
      id
    ]);
    return res.status(200).json(result);
  } catch(e) {
    const {status, message} = getStatusAndMessage(e);
    return res.status(status).json({message});
  }
});

module.exports = router;
