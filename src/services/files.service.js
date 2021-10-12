class UserService {
    getPostMediaData(mediaData) {
        const {
            originalname,
            encoding,
            mimetype,
            filename,
            path,
            extension = UserService.prototype.getFileExtension(mediaData.originalname)
        } = mediaData
        return { originalname, encoding, mimetype, filename, path, extension }
    }

    getFileExtension(data) {
        const indexExt = data.lastIndexOf('.')
        return indexExt >= 0 ? data.substring(indexExt + 1, data.length) : null;
    }
}

module.exports = new UserService()