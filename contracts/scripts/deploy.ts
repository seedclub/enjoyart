// import { ethers } from 'hardhat';

// async function main() {
//   // const TOKEN_NEXT_MINTING_DATE = Math.round(
//   //   new Date('2025-02-24').getTime() / 1000
//   // );

//   // const ownerAddress = '0x1D266998DA65E25DE8e1770d48e0E55DDEE39D24';

//   // console.log('ownerAddress', ownerAddress);

//   // const enjoy = await ethers.deployContract('EnjoyToken', [
//   //   TOKEN_NEXT_MINTING_DATE,
//   //   ownerAddress,
//   // ]);

//   // console.log(`enjoy deployed to ${enjoy.target}`);

//   const enjoyFrame = await ethers.deployContract('Enjoy1155', [
//     '0x1D266998DA65E25DE8e1770d48e0E55DDEE39D24',
//   ]);

//   console.log(`enjoy deployed to ${enjoyFrame.target}`);
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
