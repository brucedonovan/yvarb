/** Execute transactions to set the correct configuration for the StEth YieldLever contract. */
import { ethers, Contract, utils } from "ethers";
import { abi as fyTokenAbi } from "../../out/FYToken.sol/FYToken.json";
import { abi as flashJoinAbi } from "../../out/FlashJoin.sol/FlashJoin.json";
import { abi as accessControlAbi } from "../../out/AccessControl.sol/AccessControl.json";

const giverAddress: string = process.argv[2];
if (!giverAddress) {
  console.log("Please supply the Giver address");
  process.exit();
}
const leverAddress: string = process.argv[3];
if (!leverAddress) {
  console.log("Please supply the Lever address");
  process.exit();
}

const rpcUrl: string = process.argv[4];
if (!rpcUrl) {
  console.log("Please supply the RPC url");
  process.exit();
}

const gasPrice = "1000000000000";

(async () => {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const timeLock = "0x3b870db67a45611CF4723d44487EAF398fAc51E3";
  const signer = provider.getSigner(timeLock);

  await provider.send('evm_setAccountBalance', [timeLock, utils.parseUnits('1000', 'ether').toHexString()]);

  const fyToken = new Contract(
    "0x53358d088d835399F1E97D2a01d79fC925c7D999",
    fyTokenAbi,
    signer
  );
  const flashJoin = new Contract(
    "0x3bDb887Dc46ec0E964Df89fFE2980db0121f0fD0",
    flashJoinAbi,
    signer
  );
  const cauldronAccessControl = new Contract(
    "0xc88191F8cb8e6D4a668B047c1C8503432c3Ca867",
    accessControlAbi,
    signer
  );

  const allowFlashLoans = async () => {
    const tx1 = await fyToken.setFlashFeeFactor(1, {
      gasPrice,
    });
    await tx1;
    const tx2 = await flashJoin.setFlashFeeFactor(1, {
      gasPrice,
    });
    await tx2;
    console.log("- configured flash loans");
  };

  const grantGiverRole = async () => {
    const tx = await cauldronAccessControl.grantRole("0x798a828b", giverAddress, { gasPrice });
    await tx;

    const deployer = provider.getSigner('0x70997970C51812dc3A010C7d01b50e0d17dc79C8');
    const giverAccessControl = new Contract(
      giverAddress,
      accessControlAbi,
      deployer
    );
    const tx1 = await giverAccessControl.grantRole("0xe4fd9dc5", timeLock, { gasPrice });
    await tx1;
    const tx2 = await giverAccessControl.grantRole("0x35775afb", leverAddress, { gasPrice });
    await tx2;

    console.log('- granted giver-related roles');
  };

  await allowFlashLoans();
  await grantGiverRole();
})();