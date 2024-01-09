var mongoose   = require("mongoose");
var usuariosAPISchema = new mongoose.Schema(
        {
            usuario: String,
            expiracion: Date,
            created: {type: Date, default: Date.now}
        }
);
//usuariosAPISchema.index({ usuario: 1},{ unique: true });
module.exports = mongoose.model("usuariosAPI",usuariosAPISchema);
