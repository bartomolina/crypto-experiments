import { ethers, artifacts } from "hardhat";
const fs = require("fs");

async function main() {
  const TestContract = await ethers.getContractFactory("TestContract");
  const testContract = await TestContract.deploy();

  await escrowFactory.deployed();

  console.log(`TestContract deployed to ${testContract.address}`);

  const data = {
    address: testContract.address,
    abi: testContract.interface.format("json"),
  };

  fs.writeFileSync("./app/lib/contract.json", JSON.stringify(data));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
