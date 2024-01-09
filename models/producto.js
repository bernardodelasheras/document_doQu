var mongoose = require("mongoose");
var productoSchema = new mongoose.Schema(
    {
        codigo: String,
        descripcion: String,
        especificacion: String,
        imagen: String,
        precioCompra: Number,
        precioVenta: Number,
        created: { type: Date, default: Date.now }
    }
);
// productoSchema.index({ codigo:1 }, { unique: true });
module.exports = mongoose.model("producto", productoSchema);
