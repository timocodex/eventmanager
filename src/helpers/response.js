
module.exports = {
    Ok: (res,result) =>{
      res.status(200).json({
        status:true,
        message:'OK',
        result:result
      })
    },
    Unauthorized: (res,message)=>{
      res.status(401).json({
        status:false,
        message:'Unauthorized',
        result:message
      })
    },
    NotFound: (res)=>{
      res.status(404).json({
        status:false,
        message:'Not Found',
        result:[]
      })
    },
    Forbidden: (res,err)=>{
      res.status(403).json({
        status:false,
        message:'Forbidden',
        result:err
      })
    },
    Error: (res,err)=>{
      res.status(500).json({
        status:false,
        message:'Internal Server Error',
        result:err
      })
    },
    BadRequest:(res,err)=>{
      res.status(400).json({
        status:false,
        message:'Bad Request',
        result:err
      })
    },
    Created: (res,result) =>{
      res.status(201).json({
        status:true,
        message:'Created',
        result:result
      })
    },
    Conflict: res => {
      res.status(409).json({
        status:false,
        message:'Conflict',
        result:[]
      })
    }
  }
  