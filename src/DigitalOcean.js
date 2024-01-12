import AWS from 'aws-sdk';
const S3 = require("aws-sdk/clients/s3");

/**
 * Digital Ocean Spaces Connection
 */

const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new AWS.S3({
    endpoint: "nyc3.digitaloceanspaces.com",
    credentials: {
      accessKeyId: "EJNBKSVUPKT3B4PFMFL6",// Access key pair. You can create access key pairs using the control panel or API.
      secretAccessKey: "73XMP57w2KCAY3FOV5qRAy7BNiHDwQIumYuilSWoHL4" // Secret access key defined through an environment variable.
    
    }

    });
export default s3;