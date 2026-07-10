const {
  createEquipment,
  getEquipmentByUser,
  getEquipmentById,
  updateEquipment,
  deleteEquipment
} = require("../models/equipmentModel");



// =======================
// ADD EQUIPMENT
// =======================

const addEquipment = async (req,res)=>{

try{


const equipment = await createEquipment({

user_id:req.user.id,

...req.body

});



res.status(201).json({

success:true,

message:"Equipment added successfully",

data:equipment

});


}
catch(error){


console.error("Add Equipment Error:",error);


res.status(500).json({

success:false,

message:"Failed to add equipment"

});


}

};




// =======================
// GET ALL EQUIPMENT
// =======================


const getEquipment = async(req,res)=>{


try{


const equipment = await getEquipmentByUser(

req.user.id

);



res.json({

success:true,

data:equipment

});


}
catch(error){


console.error("Get Equipment Error:",error);


res.status(500).json({

success:false,

message:"Failed to fetch equipment"

});


}


};




// =======================
// GET SINGLE EQUIPMENT
// =======================


const getSingleEquipment = async(req,res)=>{


try{


const equipment = await getEquipmentById(

req.params.id,

req.user.id

);



if(!equipment){

return res.status(404).json({

success:false,

message:"Equipment not found"

});

}



res.json({

success:true,

data:equipment

});


}
catch(error){


console.error("Get Equipment Error:",error);


res.status(500).json({

success:false,

message:"Failed to fetch equipment"

});


}


};




// =======================
// UPDATE EQUIPMENT
// =======================


const editEquipment = async(req,res)=>{


try{


const equipment = await updateEquipment(

req.params.id,

req.user.id,

req.body

);



if(!equipment){

return res.status(404).json({

success:false,

message:"Equipment not found"

});

}



res.json({

success:true,

message:"Equipment updated successfully",

data:equipment

});


}
catch(error){


console.error("Update Equipment Error:",error);


res.status(500).json({

success:false,

message:"Failed to update equipment"

});


}


};




// =======================
// DELETE EQUIPMENT
// =======================


const removeEquipment = async(req,res)=>{


try{


const equipment = await deleteEquipment(

req.params.id,

req.user.id

);



if(!equipment){

return res.status(404).json({

success:false,

message:"Equipment not found"

});

}



res.json({

success:true,

message:"Equipment deleted successfully"

});


}
catch(error){


console.error("Delete Equipment Error:",error);


res.status(500).json({

success:false,

message:"Failed to delete equipment"

});


}


};



module.exports={

addEquipment,

getEquipment,

getSingleEquipment,

editEquipment,

removeEquipment

};