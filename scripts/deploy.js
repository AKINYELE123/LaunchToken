// const hre = require("hardhat");

// const tokens = (nToken) => {
//     return hre.ethers.utils.parseUnits(nToken.toString(), "ether");
// };


// async function main() {
//     // Deploy

//     const _initialSupply = tokens(50000000);

//     const ThaOracle = await hre.ethers.getContractFactory("ThaOracle");


//     const theOracle = await ThaOracle.deploy(_initialSupply);

//     await theOracle.deployed();
//     console.log(`ThaOracle: ${theOracle.address}`);



//     // Token Sale

//     const _tokenPrice = tokens(1);

//     const TokenSale = await hre.ethers.getContractFactory("TokenSale");

//     const tokenSale = await TokenSale.deploy(theOracle.address, _tokenPrice);

//     await tokenSale.deployed();

//     console.log(`TokenSale: ${tokenSale.address}`);


//     main().catch((error) => {
//         console.error(error);
//         process.exitCode = 1;
//     })
// }






const hre = require("hardhat");

const tokens = (nToken) => {
    return hre.ethers.utils.parseUnits(nToken.toString(), "ether");
};

async function main() {
    try {
        // Deploy
        const _initialSupply = tokens(50000000);
        const ThaOracle = await hre.ethers.getContractFactory("ThaOracle");
        const theOracle = await ThaOracle.deploy(_initialSupply);
        await theOracle.deployed();
        console.log(`ThaOracle: ${theOracle.address}`);

        // Token Sale
        const _tokenPrice = tokens(1);
        const TokenSale = await hre.ethers.getContractFactory("TokenSale");
        const tokenSale = await TokenSale.deploy(theOracle.address, _tokenPrice);
        await tokenSale.deployed();
        console.log(`TokenSale: ${tokenSale.address}`);
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    }
}

main();
