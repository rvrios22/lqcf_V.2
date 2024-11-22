const fs = require('fs')
const path = require('path')
const multer = require('multer')

const baseFolder = path.join(__dirname, '..', 'public')

const dynamicFileFilter = (allowMimeTypes) => {
    return (req, file, cb) => {
        if (allowMimeTypes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
}

const dynamicStorageConfig = (baseFolder) => {
    let folder
    return multer.diskStorage({
        destination: (req, file, cb) => {
            switch (true) {
                case file.mimetype.startsWith('application/pdf'):
                    folder = path.join(baseFolder, 'pdfs')
                    break
                case file.mimetype.startsWith('image/'):
                    folder = path.join(baseFolder, 'thumbnails')
                    break
                case file.mimetype.startsWith('/video'):
                    folder = path.join(baseFolder, 'videos')
                    break
                default:
                    folder = path.join(baseFolder, 'others')
                    break
            }

            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, { recursive: true })
            }

            cb(null, folder)
        },
        filename: (req, file, cb) => {
            const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
            cb(null, `${uniquePrefix}-${file.originalname}`)
        }
    })
}

const pdfsUpload = multer({ storage: dynamicStorageConfig(baseFolder), fileFilter: dynamicFileFilter(['application/pdf']) })

exports.pdfsUpload = pdfsUpload