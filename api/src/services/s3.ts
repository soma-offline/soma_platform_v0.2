import { ExpressRequest, ExpressResponse } from "../types/ExpressTypes";
import * as AWS from 'aws-sdk';

// eslint-disable-next-line @typescript-eslint/no-var-requires
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

export function uploadImgToS3 (request: ExpressRequest, response: ExpressResponse): void {
    const { file, fileName } = request.body;
    const fileExt = fileName.substring(fileName.lastIndexOf(".") + 1);
    const fileNameWithoutExt = fileName.replace(`.${fileExt}`, "");
    const newFileName = (`${fileNameWithoutExt}_${new Date().getTime()}.${fileExt}`).toLowerCase();
    const params = {
        Bucket: process.env.AWS_IMAGE_BUCKET,
        Key: newFileName,
        Body: Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""),'base64'),
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
    };

    s3.upload(params, (err, data) => {
        if(err) throw err;
        response.status(201).send(data.Location);
    });
};