import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Test", function () {
  async function deployTestFixture() {
    const Test = await ethers.getContractFactory("Test");
    const test = await Test.deploy();
    return { test };
  }
});
