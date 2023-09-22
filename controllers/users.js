const { validationResult } = require('express-validator')
const regModel = require('../models/auth')
const payment = require('../models/success')

exports.bank = (req, res) => {
    let inErr = req.flash('error')
    res.render('users/bank-info', { title: "Bank-info", InErr: inErr })
}
exports.postBank = (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.flash('error', errors.array())
        req.session.save(() => {
            res.redirect('/information')
        })
    }
    else{
        const { bank, acct,bvn,dob,educate,add,phon1,Image,rela1,gender } = req.body
        const userId = req.session.userData.id  
        let imagePath = '/images/'+req.file.filename  
     regModel.findOne({
        where: {
            id: userId
        }
    }).then(users => {
        users.acct = acct,
            users.bank = bank,
            users.bvn = bvn,
            users.dob = dob,
            users.gender = gender,
            users.educate = educate,
            users.address = add,
            users.fiemerNumber = phon1,
            users.relationship = rela1,
            users.image=imagePath
            return users.save()
    }).then(result => {
         req.session.userData = result
        return req.session.save(() => {
            res.redirect('/dashboard')
        })
    }).catch(err=>{
        console.log(err)
    })
}
}
exports.getPay = (req,res)=>{
     let userEmail = req.session.userData.email
  payment.findAll({
    where:{
    ema:userEmail
    }
  }).then(result=>{
    res.render('payment',{title:"Payment",pay:result})
  }) 
}

exports.postPay = (req,res)=>{
    const https = require('https')
        const{email,amount}= req.body
        const params = JSON.stringify({
          "email": email,
          "amount":amount*100,
           "callback_url": "localhost:3001/payment"
        })
        
        const options = {
          hostname: 'api.paystack.co',
          port: 443,
          path: '/transaction/initialize',
          method: 'POST',
          headers: {
            Authorization: 'Bearer sk_test_1d5d4f21b4fac002e2247769bf4bb8f2ff91e4e2',
            'Content-Type': 'application/json'
          }
        }
        
        req = https.request(options, response => {
          let data = ''
        
          response.on('data', (chunk) => {
            data += chunk
          });
        
          response.on('end', () => {
            const payData = JSON.parse(data)
            const Authorization = payData.data.authorization_url
            console.log(Authorization)
            res.redirect(Authorization)
          })
        })
        req.on('error', error => {
          console.error(error)
        })
        
        req.write(params)
        req.end()
     
}
// verification api using get request
//const https = require('https')

// const params = JSON.stringify({
//   "bank_code": "632005",
//   "country_code": "ZA",
//   "account_number": "0123456789",
//   "account_name": "Ann Bron",
//   "account_type": "personal",
//   "document_type": "identityNumber",
//   "document_number": "1234567890123"
// })

// const options = {
//   hostname: 'api.paystack.co',
//   port: 443,
//   path: '/bank/validate',
//   method: 'POST',
//   headers: {
//     Authorization: 'Bearer SECRET_KEY',
//     'Content-Type': 'application/json'
//   }
// }

// const req = https.request(options, res => {
//   let data = ''

//   res.on('data', (chunk) => {
//     data += chunk
//   });

//   res.on('end', () => {
//     console.log(JSON.parse(data))
//   })
// }).on('error', error => {
//   console.error(error)
// })

// req.write(params)
// req.end()


// creating transfer recipents details using post request
// const https = require('https')

// const params = JSON.stringify({
//   "batch": [
//   {
//     "type":"nuban",
//     "name" : "Habenero Mundane",
//     "account_number": "0123456789",
//     "bank_code": "033",
//     "currency": "NGN"
//   },
//   {
//     "type":"nuban",
//     "name" : "Soft Merry",
//     "account_number": "98765432310",
//     "bank_code": "50211",
//     "currency": "NGN"
//   }
// ]
// })

// const options = {
//   hostname: 'api.paystack.co',
//   port: 443,
//   path: '/transferrecipient/bulk',
//   method: 'POST',
//   headers: {
//     Authorization: 'Bearer SECRET_KEY',
//     'Content-Type': 'application/json'
//   }
// }

// const req = https.request(options, res => {
//   let data = ''

//   res.on('data', (chunk) => {
//     data += chunk
//   });

//   res.on('end', () => {
//     console.log(JSON.parse(data))
//   })
// }).on('error', error => {
//   console.error(error)
// })

// req.write(params)
// req.end()

//initiating transfer using post request
// const https = require('https')

// const params = JSON.stringify({
//   "source": "balance",
//   "amount": 37800,
//   "reference": "your-unique-reference",
//   "recipient": "RCP_t0ya41mp35flk40",
//   "reason": "Holiday Flexing"
// })

// const options = {
//   hostname: 'api.paystack.co',
//   port: 443,
//   path: '/transfer',
//   method: 'POST',
//   headers: {
//     Authorization: 'Bearer SECRET_KEY',
//     'Content-Type': 'application/json'
//   }
// }

// const req = https.request(options, res => {
//   let data = ''

//   res.on('data', (chunk) => {
//     data += chunk
//   });

//   res.on('end', () => {
//     console.log(JSON.parse(data))
//   })
// }).on('error', error => {
//   console.error(error)
// })

// req.write(params)
// req.end()
