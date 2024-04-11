let express=require('express')
let dotenv=require('dotenv')
const  route  = require('./Router/route')
let app=express()
//middlware for env
dotenv.config()
//middlware for reqbody
app.use(express.json())
//setting engine
app.set('view engine','ejs')
//static serve
app.use(express.static('views'))
let port=process.env.PORT || 8000
//Error middlware
app.use((err,req,res,next)=>{
    if(err)
    {
        res.status(500).send({message:"Somthing wrong !",success:false})
    }
    else{
        next()
    }
})

//basic route
app.use(route)
//server listing
app.listen(port,()=>{
    console.log(`server is up at http://localhost:${port}`)
})





//.....................................without fetch.................
// let str=''
// req.on('data',(chunk)=>{
//        str+=chunk
// })
// req.on('end',()=>{
//     console.log(str)
//    let formData=  new URLSearchParams(str)  //its convert string into formData
//   //input: //uname=dfkjdkj&qul=fkjdkjf&phone=dfjdsj&dep=mern
//  //output: { 'uname' => 'dfkjdkj', 'qul' => 'fkjdkjf', 'phone' => 'dfjdsj', 'dep' =>
//   //'mern' }
//    console.log(formData)
//    console.log(formData.get('uname'))
//     res.send('done')
// })