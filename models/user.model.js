const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    SteamID: {
        type: String,
        required: true,
        unique: true,
    },
    Username: {
        type: String,
        required: true
    },
    ProfilePictureURL: String,
    TradeURL: String,
    DateJoined: {
        type: Date,
        required: true
    },
    Trades: Array,
    Profit: Number,
    BetAmount: Number,
    GamesPlayed: {
        type: Schema.Types.Mixed
    }
}, {
    timestamps: true
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;