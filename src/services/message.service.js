const Message = require("../models/message.model");

const creatMessage = (newMessage) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { senderId, reciveId, text, images } = newMessage;
      const createMessage = await Message.create({
        senderId,
        reciveId,
        text,
        images,
      });

      if (createMessage) {
        resolve({
          status: "OK",
          message: "success",
          data: createMessage,
        });
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

const getMessage = (senderId, reciveId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const message = await Message.find({
        senderId: senderId,
        reciveId: reciveId,
      });

      resolve({
        status: "OK",
        message: "success",
        data: message,
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

const deleteMessage = (messageId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const messageDelete = await Message.findOne({ _id: messageId });

      for (let image of messageDelete.images) {
        const result = await cloudinary.uploader.destroy(image.publicId);
      }
      const message = await Message.findOneAndDelete({ _id: messageId });

      resolve({
        status: "OK",
        message: "success",
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

const updateMessage = (messageId, obj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updateMessage = await Message.findOneAndUpdate(
        { _id: messageId },
        obj,
        { new: true }
      );

      resolve({
        status: "OK",
        message: "success",
        data: updateMessage,
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};
module.exports = {
  creatMessage,
  getMessage,
  deleteMessage,
  updateMessage,
};
