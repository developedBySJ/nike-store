import * as cloudinary from 'cloudinary'
import {FileUpload} from 'graphql-upload'

import {CLOUDINARY_API} from 'src/config'

cloudinary.v2.config(CLOUDINARY_API.config)

export const Cloudinary = {
  upload: async (req: FileUpload, folder: string = '/') => {
    const fileName = req.filename.replace(/\..+$/, '')

    return new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: `${folder}`,
          public_id: fileName,
        },
        (err, img) => {
          if (img) {
            resolve(img)
          } else {
            reject(err)
          }
        },
      )

      req.createReadStream().pipe(uploadStream)
    })
  },
}
