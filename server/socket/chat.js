const error = require("../controllers/error");
const pool = require("../db");

exports.getAllMessages = (userUuid, guestUuid) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        if (connection) connection.release();
        reject(err);
      } else {
        connection.query(
          "SELECT USER.UserId FROM USER WHERE USER.Uuid = ?; SELECT USER.UserId FROM USER WHERE USER.Uuid = ?",
          [[userUuid], [guestUuid]],
          (err, result) => {
            if (err || result[0].length === 0 || result[1].length === 0) {
              connection.release();
              reject(err);
            } else {
              let ids = [
                { userId: result[0][0].UserId, userUuid },
                { userId: result[1][0].UserId, userUuid: guestUuid },
              ];
              connection.query(
                "SELECT MessageSender AS `from`, MessageReceiver AS `to`, MessageContent AS msg, MessageDate AS date FROM message WHERE MessageSender = (SELECT USER.UserId FROM USER WHERE USER.Uuid = ?) AND MessageReceiver = (SELECT USER.UserId FROM USER WHERE USER.Uuid = ?) OR MessageSender = (SELECT USER.UserId FROM USER WHERE USER.Uuid = ?) AND MessageReceiver = (SELECT USER.UserId FROM USER WHERE USER.Uuid = ?) ORDER BY MessageDate",
                [userUuid, guestUuid, guestUuid, userUuid],
                (err, result) => {
                  connection.release();
                  if (err) {
                    reject(err);
                  } else {
                    const messages = result.map((r) => {
                      if (r.from === ids[0].userId) {
                        return {
                          ...r,
                          from: ids[0].userUuid,
                          to: ids[1].userUuid,
                        };
                      } else
                        return {
                          ...r,
                          from: ids[1].userUuid,
                          to: ids[0].userUuid,
                        };
                    });
                    resolve(messages);
                  }
                }
              );
            }
          }
        );
      }
    });
  });
};

exports.saveMessage = (userUuid, guestUuid, message) => {
  return new Promise((resolve, reject) => {
    if (message.length >= 1000) reject("Message length eq or gth 1000");
    pool.getConnection((err, connection) => {
      if (err) {
        if (connection) connection.release();
        reject(err);
      } else {
        connection.query(
          "SELECT USER.UserId FROM USER WHERE USER.Uuid = ?; SELECT USER.UserId FROM USER WHERE USER.Uuid = ?",
          [[userUuid], [guestUuid]],
          (err, result) => {
            if (err || result[0].length === 0 || result[1].length === 0) {
              connection.release();
              reject(err);
            } else {
              let ids = {
                from: result[0][0].UserId,
                to: result[1][0].UserId,
              };
              connection.query(
                "INSERT INTO message (MessageSender, MessageReceiver, MessageContent) VALUES (?, ?, ?); SELECT * FROM last_message WHERE (LastMessageFrom = ? AND LastMessageTo = ?) OR (LastMessageFrom = ? AND LastMessageTo = ?)",
                [ids.from, ids.to, message, ids.from, ids.to, ids.to, ids.from],
                (err, result) => {
                  if (err) {
                    connection.release();
                    reject(err);
                  } else {
                    let query =
                      "UPDATE last_message SET lastMessageFrom = ?, LastMessageTo = ?, LastMessageContent = ? WHERE (LastMessageFrom = ? AND LastMessageTo = ?) OR (LastMessageFrom = ? AND LastMessageTo = ?)";
                    let queryParams = [
                      ids.from,
                      ids.to,
                      message,
                      ids.from,
                      ids.to,
                      ids.to,
                      ids.from,
                    ];
                    if (result[1].length === 0) {
                      query =
                        "INSERT INTO last_message (LastMessageFrom, LastMessageTo, LastMessageContent) VALUES (?, ?, ?)";
                      queryParams = [ids.from, ids.to, message];
                    }
                    connection.query(query, queryParams, (err, result) => {
                      connection.release();
                      if (err) reject(err);
                      else resolve();
                    });
                  }
                }
              );
            }
          }
        );
      }
    });
  });
};
