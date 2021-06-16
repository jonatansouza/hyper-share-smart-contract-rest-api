'use strict'

const {Wallets, Gateway} = require('fabric-network');
const fs = require('fs');
const debug = require('debug')('hyper-share-smart-contract-rest-api:server');

class FabricNetworkProvider {
    async submitTransaction(contractName, args = []) {
        return new Promise(async (resolve, reject) => {
            const gateway = new Gateway();
            try {
                const connectionProfile = fs.readFileSync('wallet/connection-profile.json').toString();
                const connProfile = JSON.parse(connectionProfile)
                const wallet = await Wallets.newFileSystemWallet('wallet/Org1')
                const gatewayOptions = {
                    identity: 'api-user',
                    wallet
                }
                await gateway.connect(connProfile, gatewayOptions);
                const network = await gateway.getNetwork('mychannel');
                const contractCollection = network.getContract('hyper-share-smart-contract');
                const buffer = await contractCollection.submitTransaction(contractName, ...args)
                debug(buffer);
                const strResult = buffer.toString();
                debug(strResult);
                const result = JSON.parse(strResult);
                resolve(result);       
            } catch(e) {
                reject(e);
            } finally {
                gateway.disconnect();
            }   
        })
    }
}
module.exports = FabricNetworkProvider;