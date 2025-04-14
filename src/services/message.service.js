const { default: mongoose } = require("mongoose");
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
        $or: [
          { senderId, senderId, reciveId: reciveId },
          { senderId: reciveId, reciveId: senderId },
        ],
      })
        .populate("senderId")
        .populate("reciveId");

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

const getMessageRoom = async (userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const messages = await Message.aggregate([
        {
          $match: {
            $or: [
              { senderId: new mongoose.Types.ObjectId(userid) },
              { reciveId: new mongoose.Types.ObjectId(userid) },
            ],
          },
        },
        {
          $sort: { createdAt: -1 }, // Sắp xếp tin nhắn mới nhất lên đầu
        },
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ["$senderId", new mongoose.Types.ObjectId(userid)] },
                "$reciveId",
                "$senderId",
              ],
            },
            lastMessage: { $first: "$$ROOT" }, // Lấy tin nhắn mới nhất trong nhóm
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        {
          $unwind: "$userInfo",
        },
        {
          $project: {
            _id: 0,
            userId: "$_id",
            userName: "$userInfo.name",
            avatar: "$userInfo.avatar",
            lastMessage: "$lastMessage", // Trả về toàn bộ thông tin tin nhắn
          },
        },
        {
          $sort: { "lastMessage.createdAt": -1 }, // Sắp xếp danh sách theo tin nhắn gần nhất
        },
      ]);

      resolve({
        status: "OK",
        message: "success",
        data: messages,
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
  getMessageRoom,
};
