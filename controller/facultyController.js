let fs = require("fs");
let path = require("path");
//this is for rendering index page
let indexHandler = async (req, res) => {
  res.render("pages/index");
};
//this is for admin page
let adminHandler = async (req, res) => {
  try {
    res.render("pages/Admin");
  } catch (err) {
    throw new Error(err.message);
  }
};
//this is for admin data handling
let adminDataHandler = async (req, res) => {
  try {
    let { name, qul, phone, course, id } = req.body;
    if (!name || !qul || !phone || !course || !id) {
      return res
        .status(500)
        .send({ message: "All field is required*", success: false });
    } else {
      fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
        if (err) {
          throw new Error(err.message);
        } else {
          let orginalData = JSON.parse(data);
          orginalData.push({ ...req.body });
          fs.writeFile(
            path.join(__dirname, "../db/db.json"),
            JSON.stringify(orginalData),
            (err) => {
              if (err) {
                throw new Error(err.message);
              } else {
                res.send(orginalData);
              }
            }
          );
        }
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
let adminDataEditHandler=async (req,res)=>{
    let {id:dataid}=req.params;
    try {
        let { name, qul, phone, course, id } = req.body;
        if (!name || !qul || !phone || !course || !id) {
          return res
            .status(500)
            .send({ message: "All field is required*", success: false });
        } else {
          fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
            if (err) {
              throw new Error(err.message);
            } else {
              let orginalData = JSON.parse(data);
              orginalData=orginalData.map((item)=>{
                if(item.id==dataid)
                {
                    return {...item,...req.body}
                }
                else{
                    return item
                }
              })
              fs.writeFile(
                path.join(__dirname, "../db/db.json"),
                JSON.stringify(orginalData),
                (err) => {
                  if (err) {
                    throw new Error(err.message);
                  } else {
                    res.send(orginalData);
                  }
                }
              );
            }
          });
        }
      } catch (err) {
        throw new Error(err.message);
      }  

}
//this is faculty handler page
let facultyHandler=async(req,res)=>{ 
    try{
        fs.readFile(path.join(__dirname,'../db/db.json'),'utf-8',(err,data)=>{
            if(err)
            {
                throw new Error(err.message)
            }
            else{
                let orginalData =JSON.parse(data)
                res.render('pages/Faculty',{title:"All Faculty Details",data:orginalData,total:orginalData.length})
            }
        })
       
       
    }
    catch(err)
    {
        throw new Error(err.message)
    }
}
let facultyDeleteHandler=async(req,res)=>
{
    let {id}=req.params
    try{
          fs.readFile(path.join(__dirname,'../db/db.json'),'utf-8',(err,data)=>{
            if(err)
            {
                throw new Error(err.message)
            }
            else{
                let orginalData=JSON.parse(data)
                orginalData=orginalData.filter((item)=>{
                    return item.id !=id
                })
                fs.writeFile(path.join(__dirname,'../db/db.json'),JSON.stringify(orginalData),(err)=>{
                    if(err)
                    {
                        throw new Error (err.message)
                    }
                    else{
                        res.status(200).send({ok:true})
                    }
                })
            }
          })
    }
    catch(err)
    {
        throw new Error(err.message)
    }
}
let editFacultyHandlerData=async(req,res)=>{
    let {id}=req.params
     try{
        fs.readFile(path.join(__dirname,'../db/db.json'),"utf-8",(err,data)=>{
            if(err)
            {
            throw new Error(err.message)
                  
            }
            else{
                let orginalData=JSON.parse(data)
                let findData=orginalData.find((item)=>{
                    return item.id==id
                })
                res.send(findData)
            }
        })
     }
     catch(err)
     {
        throw new Error(err.message)
     }
}
//this is for search template
  let searchHandler=async(req,res)=>{
  try{
     res.render('pages/Search')
  }
  catch(err)
  {
    throw new Error(err.message)
  }
}
let serchResultHandler=async(req,res)=>{
     try{
      let {search}=req.body
      fs.readFile(path.join(__dirname,'../db/db.json'),'utf-8',(err,data)=>{
        if(err)
        {
          throw new Error(err.message)
        }
        else{
          let orginalData=JSON.parse(data)
          orginalData=orginalData.filter((item)=>{
            return item.name.toLowerCase().trim().includes(search.trim().toLowerCase())
          })
          res.status(200).send({total:orginalData.length,result:orginalData})
        }
      })
     }
     catch(err)
     {
      console.log(err)
      throw new Error(err.message)
     }
}
module.exports = { indexHandler, adminHandler, adminDataHandler,facultyHandler,facultyDeleteHandler,editFacultyHandlerData , adminDataEditHandler,searchHandler,serchResultHandler};
