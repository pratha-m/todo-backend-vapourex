const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
      const token = req.cookies['access-token']

      try{
            const verify = jwt.verify(token, 'jwt_secret_key');

            // console.log(verify)
            if(verify){
                  next();
            }
            else{
                  return res.send({
                        success: false,
                        message: 'Try Login / SignUp'
                  })
            }
      }
      catch(e){
            return res.send({
                  success: false,
                  message: 'Try Login / SignUp'
            })
      }
}

module.exports = {
      authUser
}