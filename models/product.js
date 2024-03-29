var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var ProductSchema = new Schema(
	{
		type: {
			type: SchemaTypes.ObjectId
		},
		discount: {
			type: Number,
			required: false,
			default: 0
		},
		isStandOut: {
			type: Boolean
		},
		isDeleted: {
			type: Boolean
		},
		isNewProduct: {
			type: Boolean
		},
		name: {
			type: String
		},
		price: {
			type: SchemaTypes.Number
		},
		size: {
			type: String
		},
		rating: {
			type: SchemaTypes.Number
		},
		numberValidProduct: {
			type: SchemaTypes.Number
		},
		color: {
			type: String
		},
		imgs: {
			type: String
		},
		decription: {
			type: String
		},
		producer: {
			type: SchemaTypes.ObjectId
		},
		origin: {
			type: SchemaTypes.ObjectId
		},
		dateImport: {
			type: Date,
			default: Date.now
		}
	},
	{ collection: 'products' }
);

module.exports = mongoose.model('Product', ProductSchema);
