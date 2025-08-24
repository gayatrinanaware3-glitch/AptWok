import { Aptos, AptosConfig, Network, Ed25519PrivateKey } from '@aptos-labs/ts-sdk';

const NODE_URL = process.env.APTOS_NODE_URL;
const MODULE_ADDRESS = process.env.MODULE_ADDRESS;
const PRIVATE_KEY = process.env.APTOS_PRIVATE_KEY;

if (!NODE_URL) throw new Error('APTOS_NODE_URL not set in .env');
if (!MODULE_ADDRESS) console.warn('MODULE_ADDRESS not set in .env');
if (!PRIVATE_KEY) console.warn('APTOS_PRIVATE_KEY not set in .env');

const config = new AptosConfig({
  network: Network.CUSTOM,
  fullnode: NODE_URL
});
const aptos = new Aptos(config);

let adminAccount = null;
if (PRIVATE_KEY) {
  const hex = PRIVATE_KEY.startsWith('0x') ? PRIVATE_KEY : ('0x' + PRIVATE_KEY);
  const pk = new Ed25519PrivateKey(hex);
  adminAccount = aptos.deriveAccountFromPrivateKey({ privateKey: pk });
}

export function moduleAddress() { return MODULE_ADDRESS; }
export function ensureAccount() { if (!adminAccount) throw new Error('Admin account not configured'); return adminAccount; }

export async function viewEscrow({ id }) {
  const result = await aptos.view({
    payload: {
      function: `${MODULE_ADDRESS}::escrow::get_escrow_info`,
      functionArguments: [MODULE_ADDRESS, BigInt(id)],
      typeArguments: []
    }
  });
  const [client, freelancer, amount, funded, released, has_meta] = result;
  return { client, freelancer, amount: Number(amount), funded, released, has_meta };
}

export async function createEscrow({ client, freelancer, amount }) {
  const acct = ensureAccount();
  const tx = await aptos.transaction.build.simple({
    sender: acct.accountAddress,
    data: {
      function: `${MODULE_ADDRESS}::escrow::create_escrow`,
      functionArguments: [client, freelancer, BigInt(amount)],
      typeArguments: []
    }
  });
  const committed = await aptos.signAndSubmitTransaction({ signer: acct, transaction: tx });
  await aptos.waitForTransaction({ transactionHash: committed.hash });
  return committed.hash;
}

export async function fundEscrow({ id, amount }) {
  const acct = ensureAccount();
  const tx = await aptos.transaction.build.simple({
    sender: acct.accountAddress,
    data: {
      function: `${MODULE_ADDRESS}::escrow::fund_escrow`,
      functionArguments: [BigInt(id), BigInt(amount)],
      typeArguments: []
    }
  });
  const committed = await aptos.signAndSubmitTransaction({ signer: acct, transaction: tx });
  await aptos.waitForTransaction({ transactionHash: committed.hash });
  return committed.hash;
}

export async function submitMeta({ id, github_link, file_hash }) {
  const acct = ensureAccount();
  const enc = new TextEncoder();
  const linkBytes = enc.encode(github_link || '');
  const fileHashBytes = enc.encode(file_hash || '');
  const tx = await aptos.transaction.build.simple({
    sender: acct.accountAddress,
    data: {
      function: `${MODULE_ADDRESS}::escrow::submit_meta`,
      functionArguments: [BigInt(id), Array.from(linkBytes), Array.from(fileHashBytes)],
      typeArguments: []
    }
  });
  const committed = await aptos.signAndSubmitTransaction({ signer: acct, transaction: tx });
  await aptos.waitForTransaction({ transactionHash: committed.hash });
  return committed.hash;
}

export async function releaseEscrow({ id }) {
  const acct = ensureAccount();
  const tx = await aptos.transaction.build.simple({
    sender: acct.accountAddress,
    data: {
      function: `${MODULE_ADDRESS}::escrow::release_payment`,
      functionArguments: [BigInt(id)],
      typeArguments: []
    }
  });
  const committed = await aptos.signAndSubmitTransaction({ signer: acct, transaction: tx });
  await aptos.waitForTransaction({ transactionHash: committed.hash });
  return committed.hash;
}

export async function refundEscrow({ id }) {
  const acct = ensureAccount();
  const tx = await aptos.transaction.build.simple({
    sender: acct.accountAddress,
    data: {
      function: `${MODULE_ADDRESS}::escrow::refund`,
      functionArguments: [BigInt(id)],
      typeArguments: []
    }
  });
  const committed = await aptos.signAndSubmitTransaction({ signer: acct, transaction: tx });
  await aptos.waitForTransaction({ transactionHash: committed.hash });
  return committed.hash;
}