
export async function uploadPicture(_image: File) {
    const { NFTStorage, File } = require('nft.storage');
    //const endpoint = 'https://api.nft.storage';
    var metadataURL = "";

    try {
        const client = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_TOKEN });
        console.log(process.env.REACT_APP_NFT_STORAGE_TOKEN)
        const imageFile = new File([ _image ], 'eventImage.jpg', { type: 'image/jpg' })
        const metadata = await client.store({
            name: "event image",
            description: "This is the event image location on IPFS",
            image: imageFile,
        })

        console.log('Metadata URL:', metadata.url);
        metadataURL = metadata.url;
        return metadataURL;
    }
    catch (err) {
        console.log(err)
    };
}

export default uploadPicture;
