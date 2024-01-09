var mongoose = require("mongoose");
var configuracionSchema = new mongoose.Schema(
    {
        nombretienda: String,
        email: String,
        emailpwd: String,
        rut: String,
        nombredeposito: String,
        banco: String,
        tipocuenta: String,
        cuenta: String,
        created: { type: Date, default: Date.now }
    }
);
module.exports = mongoose.model("configuracion", configuracionSchema);
