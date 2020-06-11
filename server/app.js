const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Schema = mongoose.Schema;

let Suggestion = null;
let Signature = null;
let User = null;

app.use(cors());
app.use( bodyParser.json() );
app.use(express.static('../client/build'));

// SUGGESTIONS
app.get('/api/suggestion', async (req, res) => {
    const all = await Suggestion.find({}).populate({ path: "signatures", options: { sort: { 'date': -1 } } });
    res.json(all);
});

app.post('/api/suggestion', async (req, res) => {

    let suggestion = new Suggestion({ name: req.body.name, creatorFullName: req.body.creatorFullName });

    // Save the suggestion
    try {
        let savedSuggestion = await suggestion.save();
        res.json(savedSuggestion);
    } catch(error) {
        res.send(400);
    }
});

// SIGNATURES
app.get('/api/signature', async (req, res) => {
    const all = await Signature.find({});
    res.json(all);
});

app.post('/api/signature', async (req, res) => {

    let signature = new Signature({ name: req.body.name, date: new Date() });

    Suggestion.findById(req.body.suggestionID).populate("signatures").exec(async function(err, suggestion) {

        /* If the user has already signed the suggestion, throw an error.
        Only one signature per user is allowed per suggestion */
        const hasSigned = suggestion.signatures.find(x => x.name === signature.name);
        if(hasSigned) {
            res.send(400, { error: `${signature.name} has already signed` })
            return;
        }

       suggestion.signatures.push(signature);

           try {
           await signature.save(); // Save the signature
           let savedSuggestion = await suggestion.save();
           res.json(savedSuggestion);
       } catch(error) {
           res.send(400);
       }
    });
});

// USERS
app.post('/api/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username, password: req.body.password });
    res.json(user);
});

app.post('/api/register', async (req, res) => {

    let users = new User({ username: req.body.username, fullName: req.body.fullName, password: req.body.password });

    // Save the user
    try {
        let savedUsers = await users.save();
        res.json(savedUsers);
    } catch(error) {
        res.send(400);
    }
});

/* "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html)
to be handled by Reach router */
app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'public', 'index.html'))
);

const port = process.env.PORT || 8080;
const url = process.env.MONGO_URL || 'mongodb://localhost/awp_exam_suggestion_box_test';

app.listen(port, async () => {

    // Connection to local database
    try {
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    } catch (e) {
        console.error(e)
    }

    // Schema for MainPage
    const suggestionSchema = new mongoose.Schema({
        name: String,
        creatorFullName: String,
        signatures: [{
            type: Schema.Types.ObjectId,
            ref: "Signature"
        }]
    });

    // Schema for Signatures
    const signatureSchema = new mongoose.Schema({
        name: String,
        date: Date
    });

    // Schema for Users
    const userSchema = new mongoose.Schema({
        username: String,
        fullName: String,
        password: String
    });

    Suggestion = mongoose.model('Suggestion', suggestionSchema);
    Signature = mongoose.model('Signature', signatureSchema);
    User = mongoose.model('User', userSchema);

    // Test data
    const allUsers = await User.find({});

    if(allUsers.length === 0){
        new User({ username: "nirvana", fullName: "Nirvana Ribic", password: "nirvana123" }).save();
        new User({ username: "luka", fullName: "Luka Kumic", password: "luka123" }).save();

        let suggestion1 = await new Suggestion({ name: "Do the cold showers every day.", creatorFullName: "Nirvana Ribic" });
        let suggestion2 = await new Suggestion({ name: "Run around Brabrand lake.", creatorFullName: "Luka Kumic" });

        let signature1 = await new Signature({ name: "Nirvana Ribic", date: new Date( Date.now() - 1000 * 60 ) });
        let signature2 = await new Signature({ name: "Luka Kumic", date: new Date( Date.now() - 500 * 60 ) });

        await signature1.save();
        await signature2.save();

        suggestion1.signatures.push(signature1);
        suggestion2.signatures.push(signature2);

        await suggestion1.save();
        await suggestion2.save();
    }

    console.log("Database connected:", mongoose.connection.name);

});
