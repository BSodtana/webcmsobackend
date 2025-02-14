const allowedFileType = [
    'text/csv', //.csv

    'application/msword', //.doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', //.docx

    'application/vnd.ms-powerpoint', //.ppt
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', //.pptx

    'application/vnd.ms-excel', //.xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', //.xlsx

    'image/gif', //.gif
    'image/jpeg', //.jpeg, .jpg
    'image/png', //.png
    'image/svg+xml', //.svg
    'image/tiff', //.tif, .tiff
    'image/webp', //.webp

    'application/pdf', //.pdf
    'text/plain', //.txt

    'application/zip', //.zip
    'application/x-zip-compressed', //.xip

]

module.exports = allowedFileType