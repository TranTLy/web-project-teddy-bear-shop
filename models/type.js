var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var TypeSchema = new Schema(
  {
    _id: {
      type: SchemaTypes.ObjectId
    },
    name: {
      type: String,
      required: true
    }
  },
  { collection: "type" }
);

module.exports = mongoose.model("Type", TypeSchema);
