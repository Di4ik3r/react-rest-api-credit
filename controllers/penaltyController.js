const PenaltyModel = require("../libs/db").PenaltyModel
const PersonModel = require("../libs/db").PersonModel
const { printServerError } = require("../libs/log")
const log = require("../libs/log")(module)

exports.getAll = (req, res) => {
    // res.send("get all persons")

    return PenaltyModel.find((err, persons) => {
        if(!err) {
            return res.send(persons)
        } else {
            printServerError(res)
        }
    })
}

exports.getById = (req, res) => {
    // res.send(`get penalty by id ${req.params.id}`)

    return PenaltyModel.findById(req.params.id, (err, penalty) => {
        if(!penalty) {
            return res.send({ error: "Not found" })
        } else if(!err) {
            return res.send({ status: "OK", penalty: penalty})
        } else {
            printServerError(log, res, err)
        }
    })
}

exports.postPenalty = async(req, res) => {
    // res.send(`post penalty ${JSON.stringify(req.body)}`)
    
    console.log(`post penalty ${JSON.stringify(req.body)}`)
    
    let personIsPresent = await PersonModel.findById(req.body.person, (err, person) => {
        if(!person) {
            return true
        } else if(!err) {
            return true
        } else {
            printServerError(log, res, err)
        }
    })

    if(!personIsPresent) {
        return res.send({ satus: "ERROR", message: "There is no such user" })
    }

    const personToCreate = new PenaltyModel({
        person: req.body.person,
        sum:    req.body.sum,
    })

    personToCreate.save((err) => {
        if(!err) {
            log.info("penalty created")
            return res.send({ status: "OK", penalty: personToCreate})
        } else {
            printServerError(log, res, err)
        }
    }) 
}

exports.putPenalty = (req, res) => {
    // res.send(`put penalty ${req.params.id}`)

    return PenaltyModel.findById(req.params.id, (err, penalty) => {
        if(!penalty) {
            return res.send({ error: "Not found" })
        } 
        
        penalty.person  = req.body.person   || penalty.person
        penalty.sum     = req.body.sum      || penalty.sum
        return penalty.save((err) => {
            if(!err) {
                log.info("penalty updated")
                return res.send({ status: "OK", penalty: penalty})
            } else {
                printServerError(log, res, err)
            }
        })
    })
}

exports.deletePenalty = (req, res) => {
    // res.send(`delete penalty ${req.params.id}`)
    return PenaltyModel.findById(req.params.id, (err, penalty) => {
        if(!penalty) {
            return res.send({ error: "Not found" })
        } 
        
        return penalty.remove((err) => {
            if(!err) {
                log.info(`penalty ${penalty._id} deleted`)
                return res.send({ status: "OK"})
            } else {
                printServerError(log, res, err)
            }
        })
    })
}