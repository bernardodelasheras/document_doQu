var mongoose   = require("mongoose");
var imagenSchema = new mongoose.Schema(
        {
            url: String,
            descripcion: String,
            idusuario: String,
            created: {type: Date, default: Date.now}
        }
);
module.exports = mongoose.model("imagen",imagenSchema);
