const express = require('express')
const router = express.Router()
const getVideoInfo = require('get-video-info')
const fs = require('fs')
const mmm = require('mmmagic')
const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE)

// @route   POST /codec
// @desc    Detect codec page
// @access  Public
router.post('/', async (req, res) => {
    if(!req.files.video) {
        return res.json({msg: 'file not found'})
    }

    const {tempFilePath} = req.files.video

    // проверяем тип файла чтобы сервер не упал из-за ошибки
    magic.detectFile(tempFilePath, (err, type) => {
        if (err) { 
            // удаляем временный файл
            fs.unlinkSync(tempFilePath)
            return res.json({msg: err})
        }

        if (type.indexOf('video/') === -1) {
            // удаляем временный файл
            fs.unlinkSync(tempFilePath)
            return res.json({msg: 'file in wrong format'})
        }

        getVideoInfo(tempFilePath).then( info => {
            // удаляем временный файл
            fs.unlinkSync(tempFilePath)
            // возвращаем информацию о кодеке видео
            const [video] = info.streams
            const {codec_name, codec_long_name, tags:{encoder}} = video
            res.json({
                codec_name,
                codec_long_name,
                encoder
            })
            
        })
    });
})

module.exports = router