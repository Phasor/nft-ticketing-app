
export async function uploadMetaData(_image: File) {
    const { NFTStorage, File, Blob } = require('nft.storage');
    const endpoint = 'https://api.nft.storage';
    const token = process.env.REACT_APP_NFT_STORAGE_TOKEN;
    var metadataURL = "";
    //const EXTERNAL_URL = "https://www.mywebsite.com";

    try {
        const storage = new NFTStorage({ endpoint, token });

        const metadata = await storage.store({
            image: new File([_image], 'eventImage.jpg', { type: 'image/jpg' }),
        })

        console.log('Metadata URL:', metadata.url);
        metadataURL = metadata.url;
        return metadataURL;
    }
    catch (err) {
        console.log(err)
    };
}

export default uploadMetaData;
