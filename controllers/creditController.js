const CreditModel = require("../libs/db").CreditModel
const CreditTypeModel = require("../libs/db").CreditTypeModel
const { printServerError } = require("../libs/log")
const log = require("../libs/log")(module)

exports.getAll = (req, res) => {
    // res.send("get all credits")

    return CreditModel.find((err, credits) => {
        if(!err) {
            return res.send(credits)
        } else {
            printServerError(res)
        }
    })
}

exports.getById = (req, res) => {
    // res.send(`get credit by id ${req.params.id}`)

    return CreditModel.findById(req.params.id, (err, credit) => {
        if(!credit) {
            return res.send({ error: "Not found" })
        } else if(!err) {
            console.log(credit.paymentDate)
            return res.send({ status: "OK", credit: credit})
        } else {
            printServerError(log, res, err)
        }
    })
}

exports.postCredit = async(req, res) => {
    // res.send(`post credit ${JSON.stringify(req.body)}`)
    const percent = req.body.percent
    const term = req.body.term

    let creditType
    await CreditTypeModel.find((err, creditTypes) => {
        let searchedCreditType;
        creditTypes.forEach(item => {
            if(item.percentRange[0] <= percent && percent <= item.percentRange[1])
                if(item.termRange[0] <= term && term <= item.termRange[1])
                    searchedCreditType = item
        })


        creditType = searchedCreditType
    })

    const date = req.body.date ? new Date(req.body.date) : new Date()
    const creditToCreate = new CreditModel({
        sum: req.body.sum,
        percent: percent,
        date: date,
        term: term,
        person: req.body.person,
        creditType: creditType._id
    })

    creditToCreate.save((err) => {
        if(!err) {
            log.info("credit created")
            return res.send({ status: "OK", credit: creditToCreate})
        } else {
            printServerError(log, res, err)
        }
    }) 
}

exports.putCredit = async(req, res) => {
    // res.send(`put credit ${req.params.id}`)

    return await CreditModel.findById(req.params.id, async(err, credit) => {
        if(!credit) {
            return res.send({ error: "Not found" })
        }

        const percent = req.body.percent
        const term = req.body.term

        let creditType
        await CreditTypeModel.find((err, creditTypes) => {
            let searchedCreditType;
            creditTypes.forEach(item => {
                if(item.percentRange[0] <= percent && percent <= item.percentRange[1])
                    if(item.termRange[0] <= term && term <= item.termRange[1])
                        searchedCreditType = item
            })


            creditType = searchedCreditType
        })

        const date = req.body.date ? new Date(req.body.date) : new Date()
        credit.sum = req.body.sum || credit.sum,
        credit.percent = percent || credit.percent,
        credit.date = date || credit.date,
        credit.term = term || credit.term,
        credit.person = req.body.person || credit.person,
        credit.creditType = creditType ? creditType._id : credit.creditType
        
        return credit.save((err) => {
            if(!err) {
                log.info("credit updated")
                return res.send({ status: "OK", credit: credit})
            } else {
                printServerError(log, res, err)
            }
        })
    })
}

exports.deleteCredit = (req, res) => {
    // res.send(`delete credit ${req.params.id}`)
    return CreditModel.findById(req.params.id, (err, credit) => {
        if(!credit) {
            return res.send({ error: "Not found" })
        } 
        
        return credit.remove((err) => {
            if(!err) {
                log.info(`credit ${credit._id} deleted`)
                return res.send({ status: "OK"})
            } else {
                printServerError(log, res, err)
            }
        })
    })
}