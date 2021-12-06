var admin = require("firebase-admin");

var serviceAccount = require("../fcm-app-5d920-firebase-adminsdk-qouiq-86532d8c1f.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.URL
});

var registrationTokens = process.env.TOKEN

console.log('admin is here')

module.exports = {
    /**
   * 註冊token
   * @param {string} userToken
   */
  registration: (userToken) => {
    if (!registrationTokens.includes(userToken))
      registrationTokens.push(userToken)
  },
  /**
   * 註銷token
   * @param {string} userToken
   */
  logout: (userToken) => {
    if (registrationTokens.includes(userToken))
      registrationTokens.splice(registrationTokens.findIndex(token => token == userToken), 1)
  },
  /**
   * 寄送推波訊息
   * @param {string[]} receiveUser
   * @param {object} notification
   * @param {string} notification.title
   * @param {string} notification.body
   * @returns {object} json
   */
  sendMessage: (receiveUser) => {
    return new Promise(async (resolve, reject) => {
      // if (!Array.isArray(receiveUser)) {
      //   receiveUser = [receiveUser]
      // }
      // receiveUser = receiveUser.filter(token => registrationTokens.includes(token))


      let message = {
        notification: {
        title: "This is a Notification",
        body: "This is the body of the notification message."
      },
        token: receiveUser,
      }

      try {
        //1個裝置
        admin.messaging().send(message)
          .then((response) => {
            resolve({
              state: 'success',
              data: { response }
            })
			      console.log('Successfully sent message:', response);
          })
          .catch((error) => {
			      console.log('Error sending message:', error);
            return reject({
              state: 'error',
              message: 'send message fail',
              error
            })
		})
      }
      catch (error) {
        return reject({
          state: 'error',
          message: 'send message error',
          error
        })
      }
    })
  }
}
