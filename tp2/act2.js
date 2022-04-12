//Requirements
var express = require('express')
var logger = require("morgan");
const bodyParser = require('body-parser');
const patient = require('./db.json')

var app = express()
app.use(logger('dev'));
app.use(express.json())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { body, validationResult } = require('express-validator');

///GET ROUTE
app.get('/patient', (req,res) => {
    res.status(200).json(patient)
})
/// WITH ID
app.get('/patient/:id', (req,res) => {
    const id = req.params.id
    const patient = patient.find(patient => patient.id === id)
    if(!patient) return response.status(404).send("patient not found"),
    res.status(200).json(patient)
})

///POST ROUTE 
///express-validator
//middlwares
app.post('/patient', 
///Sanitization

body('id').not().isEmpty().trim().escape(),
body('sex').not().isEmpty().trim().escape(),
body('age').not().isEmpty().trim().escape(),
body('evidence').not().isEmpty().trim().escape(),
(req, res, next)=>  {
    let content = req.body;
    const errors = validationResult(req);
	
// id and sex should not be EMPTY
    if (!content.id && !content.sex) { 
        return res.status(400).json('"patient not added"');
    }

// verification if the patient is successesfuly ADDED
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    } 
    res.status(200).json({
        success: true,
        message: 'patient succsesfully added',
        
    })
    
});

///PUT ROUTE
app.put('/patient/:id',
	body('sex').not().isEmpty().trim().escape(),
	body('age').not().isEmpty().trim().escape(),
	body('evidence').not().isEmpty().trim().escape(),
	(req,res) => {
    	const id = req.params.id
    	let patient = patient.find(patient => patient.id === id)
    	patient.sex =req.body.sex,
      patient.age=req.body.age,
    	patient.evidence =req.body.evidence,
    	res.status(200).json(patient)
})
    
///DELETE ROUTE
app.delete('/patient/:id', (req,res) => {
    const id = req.params.id
    let patient = patient.find(patient => patient.id === id)
    if(!patient) return response.status(404).send("patient not found");
    patient.splice(patient.indexOf(patient),1)
    res.status(200).json(patient)
})

// catching the 404 error msg and pushing it to error handler using next ()

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

// error handler

app.use((error, req, res, next) => {
      // render the error page

    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})

module.exports = app;