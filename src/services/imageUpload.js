/**
 * Handles file upload and fetching through the lcoudinaru API.
 *
 * @author Daria <lo.pennequin@gmail.com>
 */

'use strict';

const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUND_NAME,
    api_key: process.env.CLOUND_API_KEY,
    api_secret: process.Env.CLOUD_SECRET
});


module.exports.upload = file => {
    cloudinary.uploader.upload(
        file,
        result => result,
        {
            format: 'png',
            width: 300,
            height: 300,
            crop: 'limit',
            gravity: 'face'
        }
    );
};
