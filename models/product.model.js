const MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
const uri =
  "mongodb+srv://admin:admin123@cluster0-yxmrz.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

const DATABASE = "ToyShopDB";
const COLLECTION_PRODUCTS = "products";
const COLLECTION_DISCOUNT = "discount";
const COLLECTION_TYPE = "type";
const BEAR_TYPE = 1;
const BARBIE_TYPE = 2;
const CAR_TYPE = 3;
const OTHER_TYPE = 4;

const getProducts = async function() {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);
  // connect.close();
  return await collection.find({}).toArray();
};

const getTypes = async function(){
  const connect = await client.connect()
  const collection = client.db(DATABASE).collection(COLLECTION_TYPE);
  // connect.close();
  return await collection.find({}).toArray();
}

const insertProduct = async function(insetProduct) {
  console.log("InsertProduct!");
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);
  collection.insertOne(insetProduct,function(err,res) {
    console.log("Theem that bai!",err);
    if(err) throw err;
    console.log("Theem thanh cong!");
  })
}
const updateProduct = async function(product){
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);
  collection.updateOne(product,function(err,res){
    if(err) throw err;
    console.log("Update successfully");
  })
}
exports.getProducts = getProducts;
exports.getTypes = getTypes;
exports.insertProduct = insertProduct;
exports.updateProduct = updateProduct;