import { Injectable } from '@angular/core';
import * as AWS from "aws-sdk";

import { S3 } from './../config/aws.config';


@Injectable({
    providedIn: 'root'
})
export class AwsService {

    public uploadFile(image: string, imageName: string) {
        return new Promise((resolve, reject) => {
            const body = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const ext = image.split(';')[0].split('/')[1] || 'jpg';
            let date = Date.now();
            const key = imageName + "-" + date + ".jpg";

            this.s3Putimage({ body, mime: `image/${ext}` }, key, 'base64').then((result) => { resolve(result); }).catch((err) => { reject(err); });
        });
    }

    private s3Putimage(file, key, encoding) {
        return new Promise((resolve, reject) => {
            AWS.config.accessKeyId = S3.accessKeyId;
            AWS.config.secretAccessKey = S3.secretAccessKey;
            AWS.config.region = S3.region;
            let s3 = new AWS.S3();

            const params = {
                Body: file.body,
                Bucket: S3.bucketName,
                Key: key,
                ContentType: "image/jpeg"
            };

            s3.putObject(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(key);
                }
            });
        });
    }
}