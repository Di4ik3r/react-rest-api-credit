const CreditTypeModel = require("../libs/db").CreditTypeModel
const { printServerError } = require("../libs/log")
const log = require("../libs/log")(module)

exports.getAll = (req, res) => {
    // res.send("get all creditTypes")

    return CreditTypeModel.find((err, creditTypes) => {
        if(!err) {
            return res.send(creditTypes)
        } else {
            printServerError(res)
        }
    })
}

exports.getById = (req, res) => {
    // res.send(`get creditType by id ${req.params.id}`)

    return CreditTypeModel.findById(req.params.id, (err, creditType) => {
        if(!creditType) {
            return res.send({ error: "Not found" })
        } else if(!err) {
            return res.send({ status: "OK", creditType: creditType})
        } else {
            printServerError(log, res, err)
        }
    })
}

exports.postCreditType = (req, res) => {
    // res.send(`post creditType ${JSON.stringify(req.body)}`)
    
    const creditTypeToCreate = new CreditTypeModel({
        name:           req.body.name,
        percentRange:   String(req.body.percentRange).split(","),
        termRange:      String(req.body.termRange).split(","),
    })

    creditTypeToCreate.save((err) => {
        if(!err) {
            log.info("creditType created")
            return res.send({ status: "OK", creditType: creditTypeToCreate})
        } else {
            printServerError(log, res, err)
        }
    }) 
}

exports.putCreditType = (req, res) => {
    // res.send(`put creditType ${req.params.id}`)

    return CreditTypeModel.findById(req.params.id, (err, creditType) => {
        if(!creditType) {
            return res.send({ error: "Not found" })
        } 
        
        creditType.name          = req.body.name                            || creditType.name
        creditType.percentRange  = String(req.body.percentRange).split(",") || creditType.percentRange
        creditType.termRange     = String(req.body.termRange).split(",")    || creditType.termRange
        return creditType.save((err) => {
            if(!err) {
                log.info("creditType updated")
                return res.send({ status: "OK", creditType: creditType})
            } else {
                printServerError(log, res, err)
            }
        })
    })
}

exports.deleteCreditType = (req, res) => {
    // res.send(`delete creditType ${req.params.id}`)
    return CreditTypeModel.findById(req.params.id, (err, creditType) => {
        if(!creditType) {
            return res.send({ error: "Not found" })
        } 
        
        return creditType.remove((err) => {
            if(!err) {
                log.info(`creditType ${creditType._id} deleted`)
                return res.send({ status: "OK"})
            } else {
                printServerError(log, res, err)
            }
        })
    })
}