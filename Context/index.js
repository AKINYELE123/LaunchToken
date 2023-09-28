import React, { useState, useEffect, useContext, createContext } from 'react'
import { ethers } from 'ethers'

import { CheckIfWalletConnected, connetWallet, connectingTOKENCONTRACT, getBalance } from "../Utils/index";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const TOKEN_ICO = "TOKEN SELL DAPP";


    // STATE VARIABLES

    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("");
    const [nativeToken, setNativeToken] = useState("");
    const [tokenHolders, setTokenHolders] = useState([]);
    const [tokenSale, setTokenSale] = useState("");
    const [currentHolder, setCurrentHolder] = useState("");


    // FETCH CONTRACT DATA

    const fetchInitailData = async () => {
        try{
            // GET USER ACCOUNT
            const account = await CheckIfWalletConnected();
            // GET USER BALANCE
            const balance = await getBalance();
            setBalance(ethers.utils.formatEther(balance.toString()));
            setAddress(account);

            // TOKEN CONTRACT
             const TOKEN_CONTRACT = await connectingTOKENCONTRACT();
             let tokenBalance;
             if(account) {
                tokenBalance = await TOKEN_CONTRACT.balanceOf(account);
             } else {
                tokenBalance = 0;
             }


            //  GET ALL TOKEN DATE 
            const  tokenName = await TOKEN_CONTRACT.name();
            const  tokenSymbol = await TOKEN_CONTRACT.symbol();
            const  tokenTotalSupply = await TOKEN_CONTRACT.totalSupply();
            const  tokenStandard = await TOKEN_CONTRACT.standard();
            const  tokenHolders = await TOKEN_CONTRACT._userId();
            const  tokenownerOfContract = await TOKEN_CONTRACT.ownerOfContract();
            const  tokenAddress = await TOKEN_CONTRACT.address;



            const nativeToken = {
                tokenAddress: tokenAddress,
                tokenName: tokenName,
                tokenSymbol: tokenSymbol,
                tokenownerOfContract: tokenownerOfContract,
                tokenStandard: tokenStandard,
                tokenTotalSupply: ethers.utils.formatEther(tokenTotalSupply.toString()),
                tokenBalance: ethers.utils.formatEther(tokenBalance.toString()),
                tokenHolders: tokenHolders.toNumber()
            };

            setNativeToken(nativeToken);

        } catch(error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchInitailData();
    }, [])



    return (
        <StateContext.Provider value={{ TOKEN_ICO }}>
            {children}
        </StateContext.Provider>
    )

}



export const useStateContext = () => useContext(StateContext)