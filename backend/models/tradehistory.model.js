const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tradeHistorySchema = Schema({
    TradeID: {
        type: String,
        required: true
    },
    SteamID: {
        type: String,
        required: true
    },
    BotID: {
        type: String,
        required: true
    },
    Items: Array,
    ItemNames: Array,
    TransactionType: String,
    State: String,
    GameMode: String,
    GameID: String,
    DateCreated: Date
},
{timestamps: true});

const TradeHistory = mongoose.model('TradeHistory', tradeHistorySchema);

module.exports = TradeHistory;