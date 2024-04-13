const path = require("path");
const fs = require("fs");
const solc = require("solc");

const ticker = "CHH";

const contractPath = path.resolve(__dirname, "../contracts", `${ticker}.sol`);
const contractCode = fs.readFileSync(contractPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    [contractPath]: {
      content: contractCode,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));

const contractName = `I${ticker}`;

const bytecode =
  compiledContract.contracts[contractPath][contractName].evm.bytecode.object;

const abi = compiledContract.contracts[contractPath][contractName].abi;

console.log("Bytecode:", bytecode);
console.log("ABI:", JSON.stringify(abi, null, 2));

fs.writeFileSync(`${ticker}_ABI.json`, JSON.stringify(abi, null, 4));
fs.writeFileSync(`${ticker}_Bytecode.txt`, bytecode);
