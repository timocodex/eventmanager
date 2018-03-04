'use strict'
const storage = require('@google-cloud/storage')
const fs = require('fs')
import gen from './idGenerator'
const gcs = storage({
  projectId: 'batam-news',
  keyFilename: "./batam-news-e8493r89e512.json"
});

const bucketName = 'batamnewsimage'
const bucket = gcs.bucket(bucketName)

function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename
}

let ImgUpload = {};

ImgUpload.uploadMulti = (req, res, next) => {
  console.log('dsni');
  if(!req.files || !req.files[0]){
    console.log('dsni2');
    res.status(500).json({
      status: false,
      message: 'An error has occured, please try again.',
      result: []
    })
  }
  else{
    const arrFile = []
    // Can optionally add a path to the gcsname below by concatenating it before the filename
    req.files.map(data => {
        const gcsname = gen()
        const file = bucket.file(gcsname)
        const stream = file.createWriteStream({
          metadata: {
            contentType: data.mimetype
          }
        })

        stream.on('error', (err) => {
          req.file.cloudStorageError = err;
          res.status(500).json({
            status: false,
            message: 'An error has occured, please try again.',
            result: []
          })
        })

        stream.on('finish', () => {
          data.cloudStorageObject = gcsname
          data.cloudStoragePublicUrl = getPublicUrl(gcsname)
        })
        arrFile.push(getPublicUrl(gcsname))
        stream.end(data.buffer)
      }
    )
      req.fileArr = arrFile
      next()
  }
}

ImgUpload.uploadSingle = (req, res, next) => {
  if(!req.file){
    res.status(500).json({
      status: false,
      message: 'An error has occured, please try again.',
      result: ""
    })
  }else{
    const gcsname = gen()
    req.filePhoto = getPublicUrl(gcsname)
    const file = bucket.file(gcsname)
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    })

    stream.on('error', (err) => {
      req.file.cloudStorageError = err;
      res.status(500).json({
        status: false,
        message: 'An error has occured, please try again.',
        result: ""
      })
    })

    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsname;
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    })
   stream.end(req.file.buffer);
    next();
  }
}

module.exports = ImgUpload;
