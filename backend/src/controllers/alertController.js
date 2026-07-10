const {

getAlertsByUser,

createAlert,

markAsRead

}=require("../models/alertModel");


// =====================
// GET ALERTS
// =====================

const getAlerts=async(req,res)=>{

try{

const alerts=await getAlertsByUser(req.user.id);

res.json({

success:true,

data:alerts

});

}

catch(error){

console.error(error);

res.status(500).json({

success:false,

message:error.message

});

}

};


// =====================
// CREATE ALERT
// =====================

const addAlert=async(req,res)=>{

try{

const alert=await createAlert({

user_id:req.user.id,

title:req.body.title,

message:req.body.message,

type:req.body.type

});

res.status(201).json({

success:true,

data:alert

});

}

catch(error){

console.error(error);

res.status(500).json({

success:false,

message:error.message

});

}

};


// =====================
// READ ALERT
// =====================

const readAlert=async(req,res)=>{

try{

const alert=await markAsRead(

req.params.id

);

res.json({

success:true,

data:alert

});

}

catch(error){

console.error(error);

res.status(500).json({

success:false,

message:error.message

});

}

};

module.exports={

getAlerts,

addAlert,

readAlert

};