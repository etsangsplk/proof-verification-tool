// @flow
/* eslint-disable no-console */

import {getProofType, verifyProof} from './index.js';
import {readFileAsync, readDirAsync} from './helpers.js';

const testGetProofType = () => {
  const proofType_TLSNotary = getProofType('tlsnotary notarization file\n  /X]H_<Õ¥ïê');
  const proofType_Android = getProofType('AP¿lHTTPResponseY"{"error":[],"result":{');
  // $FlowFixMe
  console.log(`index.js/getProofType:  ${proofType_TLSNotary === 'proofType_TLSNotary' && proofType_Android === 'proofType_Android'}`); // eslint-disable-line no-console 
};

const autoVerify = async () => {
  const proofs = await readDirAsync('./proof/');
  for (var h = 0; h < proofs.length; h++) {
    var path = './proof/' + proofs[h];
    const parsedProof = new Uint8Array(await readFileAsync(path));
    console.log('\x1b[32m', 'Proof file: ', path, '\x1b[37m');
    try {
      const verifiedProof = await verifyProof(parsedProof);
      console.log('\x1b[33m', 'Main proof: ', '\x1b[37m', '\n ', verifiedProof.mainProof);
      console.log('\x1b[33m', 'Extension proof: ','\x1b[37m', '\n ', verifiedProof.extensionProof);
    } catch(e) {
      console.log('Error: ', e);
    }
  }
};

export const runTest = () => {
  testGetProofType();
  // eslint-disable-next-line no-console
  autoVerify().then(() => console.log('finish')).catch(e => console.log(e));
};

global.testAll = runTest;
