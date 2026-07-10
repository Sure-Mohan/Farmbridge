const express = require("express");

const router = express.Router();


const {

addEquipment,
getEquipment,
getSingleEquipment,
editEquipment,
removeEquipment

}=require("../controllers/equipmentController");


const authMiddleware=require("../middleware/authMiddleware");



router.use(authMiddleware);



router.post("/",addEquipment);


router.get("/",getEquipment);


router.get("/:id",getSingleEquipment);


router.put("/:id",editEquipment);


router.delete("/:id",removeEquipment);



module.exports=router;