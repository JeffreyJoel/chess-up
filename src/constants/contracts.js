import { ethers } from "ethers";
import Abi from "./Abi.json";


export const getChessUpContract = (providerOrSigner) =>
    new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        Abi,
        providerOrSigner
    );