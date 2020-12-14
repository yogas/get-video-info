const getVideoInfo = require('get-video-info')

getVideoInfo('./assets/android_open_vpn.mp4').then(info => {
    console.log('video codec:', info.streams[0].codec_name)
})