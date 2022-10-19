const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const uploadPdfFile = async (req, res, next) => {
  const { mimetype, filename } = req?.file;

  if (!mimetype || !filename) {
    return res.status(403).send({
      success: false,
      message: "Something went wrong.",
    });
  }

  const getUploadedResume = path.resolve("uploads") + "/" + filename;

  const media = {
    mimeType: mimetype,
    body: fs.createReadStream(getUploadedResume),
  };

  try {
    const response = await drive.files.create({
      requestBody: {
        name: filename,
        mimeType: mimetype,
      },
      media: media,
    });

    fs.unlinkSync(getUploadedResume);

    const fileId = response?.data.id;
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const getPublicUrl = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });

    const { webViewLink } = getPublicUrl.data;
    req.resumeLink = webViewLink;
    req.fileId = fileId;
    next();
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error." + error,
    });
  }
};

/* Delete Resume */
const deleteResume = async (id) => {
  try {
    await drive.files.delete({
      fileId: id,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { uploadPdfFile, deleteResume };
