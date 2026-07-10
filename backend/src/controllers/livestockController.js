const {
    addLivestock,
    getLivestockByUser,
    getLivestockById,
    updateLivestock,
    deleteLivestock
} = require("../models/livestockModel");


// =======================
// ADD LIVESTOCK
// =======================

const createLivestock = async (req, res) => {

  try {

    const livestock = await addLivestock({

      user_id: req.user.id,

      ...req.body

    });


    res.status(201).json({

      success: true,

      message: "Livestock added successfully",

      data: livestock

    });


  } catch (error) {

    console.error("Create Livestock Error:", error);


    res.status(500).json({

      success:false,

      message:"Failed to add livestock"

    });

  }

};



// =======================
// GET ALL LIVESTOCK
// =======================

const getLivestock = async(req,res)=>{


try{


const livestock = await getLivestockByUser(
  req.user.id
);



res.json({

success:true,

data:livestock

});


}
catch(error){


console.error("Get Livestock Error:",error);


res.status(500).json({

success:false,

message:"Failed to fetch livestock"

});


}


};




// =======================
// GET SINGLE LIVESTOCK
// =======================


const getSingleLivestock = async(req,res)=>{


try{


const livestock = await getLivestockById(

req.params.id,

req.user.id

);



if(!livestock){

return res.status(404).json({

success:false,

message:"Livestock not found"

});

}



res.json({

success:true,

data:livestock

});


}
catch(error){


console.error(error);


res.status(500).json({

success:false,

message:"Failed to fetch livestock"

});


}


};

// UPDATE LIVESTOCK

const editLivestock = async (req, res) => {

    try {

        const livestock = await updateLivestock(
            req.params.id,
            req.user.id,
            req.body
        );

        if (!livestock) {
            return res.status(404).json({
                success: false,
                message: "Livestock not found"
            });
        }

        res.json({
            success: true,
            message: "Livestock updated successfully",
            data: livestock
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update livestock"
        });

    }

};


// =======================
// DELETE LIVESTOCK
// =======================


const removeLivestock = async(req,res)=>{


try{


const livestock = await deleteLivestock(

req.params.id,

req.user.id

);



if(!livestock){

return res.status(404).json({

success:false,

message:"Livestock not found"

});

}



res.json({

success:true,

message:"Livestock deleted successfully"

});


}
catch(error){


console.error(error);


res.status(500).json({

success:false,

message:"Failed to delete livestock"

});


}


};



module.exports = {
    createLivestock,
    getLivestock,
    getSingleLivestock,
    editLivestock,
    removeLivestock
};