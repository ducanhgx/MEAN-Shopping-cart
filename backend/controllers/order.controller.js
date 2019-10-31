const Order = require('../models/order.model')

module.exports.orders = (req, res, next) => {
  Order.find({}, (err, doc) => {
    if (err) {
      res.status(404).json({ status: false, messger: err })
    }
    else {
      res.status(200).json({ status: true, result: doc })
    }
  })
}

module.exports.order = (req, res, next) => {
  const id = req.params.id
  Order.findById(id, (err, doc) => {
    if (err) {
      res.status(404).json({ status: false, messger: err })
    }
    else {
      res.status(200).json({ status: true, result: doc })
    }
  })
}

module.exports.postorder = (req, res, next) => {
  const newOrder = Order()
  newOrder.name = req.body.name
  newOrder.phone = req.body.phone
  newOrder.email = req.body.email
  newOrder.address = req.body.address
  newOrder.note = req.body.note
  newOrder.order = req.body.order
  newOrder.totalprice = req.body.totalprice
  newOrder.save((err, doc) => {
    if (err) {
      res.status(404).json({ status: false, messger: err })
    }
    else {
      res.status(200).json({ status: true })
    }
  })

}

module.exports.putstatusorder = (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body

  Order.findById(id, (err, doc) => {
    console.log(doc.status)
    doc.status = status;
    doc.save((err, doc) => {
      if (err) {
        res.status(404).json({ status: false, messger: err })
      }
      else {
        res.status(200).json({ status: true })
      }
    })
  })
}

// module.exports.putqtyProduct = (req, res, next) => {
//   console.log(req.params.id, req.body)
//   const { id } = req.params
//   const { status } = req.body
//   Order.findById(id, (err, doc) => {
//     if(status){
//       const order = doc.order
//       for(let i=0;i<order.length;i++){
//         console.log(order[i].item._id,order[i].qty)
//       }
//     }
//   })
//   res.status(200).json({ status: true })
// }

module.exports.deleteorder = (req, res, next) => {
  const id = req.params.id
  Order.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      res.status(404).json({ status: false, messger: err })
    }
    else {
      res.status(200).json({ status: true })
    }
  })
}