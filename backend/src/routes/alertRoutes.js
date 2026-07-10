const express=require("express");

const router=express.Router();

const authMiddleware=require("../middleware/authMiddleware");

const {

getAlerts,

addAlert,

readAlert

}=require("../controllers/alertController");


router.get(

"/",

authMiddleware,

getAlerts

);

router.post(

"/",

authMiddleware,

addAlert

);

router.put(

"/:id",

authMiddleware,

readAlert

);

module.exports=router;