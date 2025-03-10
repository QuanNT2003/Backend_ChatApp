const MessageServices = require("../services/message.service");

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const respone = await MessageServices.deleteMessage(id);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      messge: e,
    });
  }
};

const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const respone = await MessageServices.updateMessage(id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      messge: e,
    });
  }
};

const getMessage = async (req, res) => {
  try {
    const { senderId, reciveId } = req.body;
    if (!senderId || !reciveId) {
      return res.status(200).json({
        status: "ERR",
        massage: "The input is required",
      });
    }
    const respone = await MessageServices.getMessage(senderId, reciveId);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      messge: e,
    });
  }
};

const createMessage = async (req, res) => {
  try {
    const { senderId, reciveId, text, images } = req.body;
    if (!senderId || !reciveId) {
      return res.status(200).json({
        status: "ERR",
        massage: "The input is required",
      });
    }

    if (!text && !images) {
      return res.status(200).json({
        status: "ERR",
        massage: "Missing message content",
      });
    }
    const respone = await MessageServices.creatMessage(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      messge: e,
    });
  }
};
module.exports = {
  getMessage,
  createMessage,
  deleteMessage,
  updateMessage,
};
