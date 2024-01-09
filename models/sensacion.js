var mongoose = require("mongoose");
var sensacionSchema = new mongoose.Schema(
    {
        descripcion: String,
        idusuario: String,
        created: { type: Date, default: Date.now }
    }
);
module.exports = mongoose.model("sensacion", sensacionSchema);
