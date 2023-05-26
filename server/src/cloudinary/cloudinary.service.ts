import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  getSignature() {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
      },
      `${process.env.CLOUDINARY_SECRET}`,
    );
    console.log(process.env.CLOUDINARY_SECRET);

    return { signature, timestamp };
  }
}
