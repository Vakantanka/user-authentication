const Content = require("../model/Content");

const getContentByEndpoint = async (endpoint) => {
  try {
    const content = await Content.findOne(endpoint);
    return content;
  } catch (error) {
    console.log(`Could not fetch contents ${error}`)
  }
}

module.exports = { getContentByEndpoint }