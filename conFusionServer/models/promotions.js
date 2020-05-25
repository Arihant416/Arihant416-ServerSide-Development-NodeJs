const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var promoSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            default: '',
        },
        price: {
            type: Currency,
            required: true,
            min: 0,
        },
        featured: {
            type: Boolean,
            default: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

var Promos = mongoose.model('Promo', promoSchema);

module.exports = Promos;
