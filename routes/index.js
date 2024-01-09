var express    = require("express");
var router     = express.Router({mergeParams: true});

// Auth Routes
router.get("/", function(req, res){
    res.render("inicial");
});


router.get("*", function(req, res){
   res.send("<h1>Página no encontrada</h1>"); 
});

module.exports = router;
