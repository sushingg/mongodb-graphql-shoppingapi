const Product = require("../models/Product");
async function createImage(filename, id) {
  console.log(id);
  console.log(filename);
  try {
    console.log('before save');
    let product = await Product.findByIdAndUpdate(
        id,
        {$push: {"image": {altText: "", name: filename}}},
        {safe: true, upsert: true}
        ).exec()
    
    console.log('after ')
    console.log(product); //when success it print.
    
  } catch (err) {
    console.log('err' + err);
    //res.status(500).send(err);
  }
}

module.exports = createImage;
