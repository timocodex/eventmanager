const express = require('express')
const router = express.Router()
const Multer = require('multer');
const imgUpload = require('../helpers/imgUpload')
const response = require('../helpers/response')

const multer = Multer({
  storage: Multer.MemoryStorage
})

//router upload multiple image
router.post('/multi', multer.array('files',10), imgUpload.uploadMulti, (req, res, next) => {
  response.Ok(res, req.fileArr)
})

//router upload single image
router.post('/single',multer.single('file'), imgUpload.uploadSingle, (req, res, next) => {
  response.Ok(res, req.filePhoto)
})

module.exports = router;