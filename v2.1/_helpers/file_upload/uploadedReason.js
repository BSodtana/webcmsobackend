const fileRelatedTypeType = ['USER', 'PROJECT', 'ORG', 'PUBLIC']
const filePublicityType = ['PUBLIC', 'PRIVATE', 'LOGIN_ONLY']


const uploadedReasonList = {
    // project
    "project-image-profile": {
        defaultFileRelatedType: "PROJECT",
        defaultFileRelatedTypeID: null,
        defaultFilePublicity: "PUBLIC",
        defaultCheckFunction: null,
        allowedFileType: [
            'image/gif', //.gif
            'image/jpeg', //.jpeg, .jpg
            'image/png', //.png
            'image/svg+xml', //.svg
            'image/tiff', //.tif, .tiff
            'image/webp', //.webp
        ],
    },
    "project-image-cover": {
        defaultFileRelatedType: "PROJECT",
        defaultFileRelatedTypeID: null,
        defaultFilePublicity: "PUBLIC",
        defaultCheckFunction: null,
        allowedFileType: [
            'image/gif', //.gif
            'image/jpeg', //.jpeg, .jpg
            'image/png', //.png
            'image/svg+xml', //.svg
            'image/tiff', //.tif, .tiff
            'image/webp', //.webp
        ],
    },
    "project-image-content": {
        defaultFileRelatedType: "PROJECT",
        defaultFileRelatedTypeID: null,
        defaultFilePublicity: "PUBLIC",
        defaultCheckFunction: null,
        allowedFileType: [
            'image/gif', //.gif
            'image/jpeg', //.jpeg, .jpg
            'image/png', //.png
            'image/svg+xml', //.svg
            'image/tiff', //.tif, .tiff
            'image/webp', //.webp
        ],
    },
    "project-file-content": {
        defaultFileRelatedType: "PROJECT",
        defaultFileRelatedTypeID: null,
        defaultFilePublicity: "LOGIN_ONLY",
        defaultCheckFunction: null,
        allowedFileType: [
            '*'
        ],
    },

    // organization
    "organization-image-profile": {
        defaultFileRelatedType: "ORG",
        defaultFileRelatedTypeID: null,
        defaultFilePublicity: "PUBLIC",
        defaultCheckFunction: null,
        allowedFileType: [
            'image/gif', //.gif
            'image/jpeg', //.jpeg, .jpg
            'image/png', //.png
            'image/svg+xml', //.svg
            'image/tiff', //.tif, .tiff
            'image/webp', //.webp
        ],
    },
    "organization-image-cover": {
        defaultFileRelatedType: "ORG",
        defaultFileRelatedTypeID: null,
        defaultFilePublicity: "PUBLIC",
        defaultCheckFunction: null,
        allowedFileType: [
            'image/gif', //.gif
            'image/jpeg', //.jpeg, .jpg
            'image/png', //.png
            'image/svg+xml', //.svg
            'image/tiff', //.tif, .tiff
            'image/webp', //.webp
        ],
    },
    "organization-image-content": {
        defaultFileRelatedType: "ORG",
        defaultFileRelatedTypeID: null,
        defaultFilePublicity: "PUBLIC",
        defaultCheckFunction: null,
        allowedFileType: [
            'image/gif', //.gif
            'image/jpeg', //.jpeg, .jpg
            'image/png', //.png
            'image/svg+xml', //.svg
            'image/tiff', //.tif, .tiff
            'image/webp', //.webp
        ],
    },
    "organization-file-content": {
        defaultFileRelatedType: "ORG",
        defaultFileRelatedTypeID: null,
        defaultFilePublicity: "LOGIN_ONLY",
        defaultCheckFunction: null,
        allowedFileType: [
            '*'
        ],
    },

    // user profile
    "user-image-profile": {
        defaultFileRelatedType: "USER",
        defaultFileRelatedTypeID: null,
        defaultFilePublicity: "PUBLIC",
        defaultCheckFunction: null,
        allowedFileType: [
            'image/gif', //.gif
            'image/jpeg', //.jpeg, .jpg
            'image/png', //.png
            'image/svg+xml', //.svg
            'image/tiff', //.tif, .tiff
            'image/webp', //.webp
        ],
    },
    "user-image-signature": {
        defaultFileRelatedType: "USER",
        defaultFileRelatedTypeID: null,
        defaultFilePublicity: "PRIVATE",
        defaultCheckFunction: null,
        allowedFileType: [
            'image/gif', //.gif
            'image/jpeg', //.jpeg, .jpg
            'image/png', //.png
            'image/svg+xml', //.svg
            'image/tiff', //.tif, .tiff
            'image/webp', //.webp
        ],
    },
    "teacher-image-signature": {
        defaultFileRelatedType: "PUBLIC",
        defaultFileRelatedTypeID: null,
        defaultFilePublicity: "PRIVATE",
        defaultCheckFunction: null,
        allowedFileType: [
            'image/gif', //.gif
            'image/jpeg', //.jpeg, .jpg
            'image/png', //.png
            'image/svg+xml', //.svg
            'image/tiff', //.tif, .tiff
            'image/webp', //.webp
        ],
    },

    // public - homepage
    "web-image-cover": {
        defaultFileRelatedType: "PUBLIC",
        defaultFileRelatedTypeID: null,
        defaultFilePublicity: "PUBLIC",
        defaultCheckFunction: null,
        allowedFileType: [
            'image/gif', //.gif
            'image/jpeg', //.jpeg, .jpg
            'image/png', //.png
            'image/svg+xml', //.svg
            'image/tiff', //.tif, .tiff
            'image/webp', //.webp
        ],
    },


}

module.exports = {
    fileRelatedTypeType,
    filePublicityType,

    uploadedReasonList
}