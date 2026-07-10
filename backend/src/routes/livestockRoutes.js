const express = require("express");

const router = express.Router();


const {
    createLivestock,
    getLivestock,
    getSingleLivestock,
    editLivestock,
    removeLivestock
} = require("../controllers/livestockController");


const authMiddleware=require("../middleware/authMiddleware");



router.use(authMiddleware);


router.post("/", createLivestock);

router.get("/", getLivestock);

router.get("/:id", getSingleLivestock);

router.put("/:id", editLivestock);

router.delete("/:id", removeLivestock);



module.exports=router;