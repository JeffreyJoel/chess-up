import { NFTStorage, File } from "nft.storage";

// The 'mime' npm package helps us set the correct file type on our File objects
import mime from "mime";

// The 'fs' builtin module on Node.js provides access to the file system
import fs from "fs";

// The 'path' module provides helpers for manipulating filesystem paths
import path from "path";

// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY = `${process.env.NEXT_PUBLIC_NFT_STORAGE}`;

/**
 * Reads an image file from `imagePath` and stores an NFT with the given name and description.
 * @param {string} imagePath the path to an image file
 * @param {string} name a name for the NFT
 * @param {string} description a text description for the NFT
 */
async function storeNFT(image: any, name: string, description: string) {
  // // load the file from disk
  // const image = await fileFromPath(imagePath)

  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  // call client.store, passing in the image & metadata
  const metadata = await nftstorage.store({
    image,
    name,
    description,
  });
  return metadata;
}

/**
 * A helper to read a file from a location on disk and return a File object.
 * Note that this reads the entire file into memory and should not be used for
 * very large files.
 * @param {string} filePath the path to a file to store
 * @returns {File} a File object containing the file content
 */
async function fileFromPath(filePath: any) {
  const content = await fs.promises.readFile(filePath);
  const type: any = mime.getType(filePath);
  return new File([content], path.basename(filePath), { type });
}

export { fileFromPath, storeNFT };
