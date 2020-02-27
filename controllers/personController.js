const PersonModel = require("../libs/db").PersonModel
const { printServerError } = require("../libs/log")
const log = require("../libs/log")(module)

exports.getAll = (req, res) => {
    // res.send("get all persons")

    return PersonModel.find((err, persons) => {
        if(!err) {
            return res.send(persons)
        } else {
            printServerError(res)
        }
    })
}

exports.getById = (req, res) => {
    // res.send(`get person by id ${req.params.id}`)

    return PersonModel.findById(req.params.id, (err, person) => {
        if(!person) {
            return res.send({ error: "Not found" })
        } else if(!err) {
            return res.send({ status: "OK", person: person})
        } else {
            printServerError(log, res, err)
        }
    })
}

exports.postPerson = (req, res) => {
    // res.send(`post person ${JSON.stringify(req.body)}`)
    
    const personToCreate = new PersonModel({
        name:           req.body.name,
        propertyType:   req.body.propertyType,
        address:        req.body.address,
        number:         req.body.number,
        contactPerson:  req.body.contactPerson,
    })

    personToCreate.save((err) => {
        if(!err) {
            log.info("person created")
            return res.send({ status: "OK", person: personToCreate})
        } else {
            printServerError(log, res, err)
        }
    }) 
}

exports.putPerson = (req, res) => {
    // res.send(`put person ${req.params.id}`)

    return PersonModel.findById(req.params.id, (err, person) => {
        if(!person) {
            return res.send({ error: "Not found" })
        } 
        
        person.name              = req.body.name            || person.name
        person.propertyType      = req.body.propertyType    || person.propertyType
        person.address           = req.body.address         || person.address
        person.number            = req.body.number          || person.number
        person.contactPerson     = req.body.contactPerson   || person.contactPerson
        return person.save((err) => {
            if(!err) {
                log.info("person updated")
                return res.send({ status: "OK", person: person})
            } else {
                printServerError(log, res, err)
            }
        })
    })
}

exports.deletePerson = (req, res) => {
    // res.send(`delete person ${req.params.id}`)
    return PersonModel.findById(req.params.id, (err, person) => {
        if(!person) {
            return res.send({ error: "Not found" })
        } 
        
        return person.remove((err) => {
            if(!err) {
                log.info(`person ${person._id} deleted`)
                return res.send({ status: "OK"})
            } else {
                printServerError(log, res, err)
            }
        })
    })
}