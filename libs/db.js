const mongoose    = require('mongoose');
const log         = require('./log')(module);
const config      = require('./config');

mongoose.connect(config.get('mongoose:uri'));

const db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

const Schema = mongoose.Schema;

const Person = new Schema({
    name:           { type: String, required: true },
    // propertyType:   { type: String, required: true },
    address:        { type: String, required: true },
    number:         { type: String, required: true },
    // contactPerson:  { type: String, required: true },
})

const Credit = new Schema({
    sum:            { type: Number, required: true },
    repaymentSum:   { type: Number },
    percent:        { type: Number, required: true },
    date:           { type: Date, required: true },
    term:           { type: Number, required: true },
    // paymentDate: (self) => { 
    //     return new Date(self.date.getTime() + (self.term * 1000 * 86400)) 
    // },
    repaymentDate:  { type: Date },
    person:         { type: mongoose.ObjectId, required: true },
    creditType:     { type: mongoose.ObjectId, required: true},
})
Credit.virtual("paymentDate").get(function() { 
    return new Date(this.date.getTime() + (this.term * 1000 * 86400))
})

const CreditType = new Schema({
    name:           { type: String, required: true},
    percentRange:   { type: [Number], required: true },
    termRange:      { type: [Number], required: true },
})

const Penalty = new Schema({
    person: { type: mongoose.ObjectId, required: true },
    sum:    { type: Number, required: true},
})

// validation
// Person.path('name').validate(function (v) {
//     return v.length > 5 && v.length < 70;
// });

const PersonModel = mongoose.model('Person', Person);
const CreditModel = mongoose.model('Credit', Credit);
const CreditTypeModel = mongoose.model('CreditTypes', CreditType);
const PenaltyModel = mongoose.model('Penalty', Penalty);

module.exports.PersonModel = PersonModel;
module.exports.CreditModel = CreditModel;
module.exports.CreditTypeModel = CreditTypeModel;
module.exports.PenaltyModel = PenaltyModel;