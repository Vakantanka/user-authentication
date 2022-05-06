const ContentService = require("../service/content");
const authJwt = require('../middleware/authJwt');

const apiGetContent = async (req, res, next) => {
   try {
      const content = await ContentService.getContentByEndpoint({endpoint: req.url})
      if(!content){
         res.sendStatus(404)
      }
      if (content.grant !== "public" && authJwt.verifyToken) {
         res.json(content)
      } else {
         res.sendStatus(403)   
      }
   } catch (error) {
      res.status(500).json({error: error})
   }
}

module.exports = { apiGetContent }