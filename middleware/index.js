var express        = require("express");
var usuariosAPI    = require("../models/usuariosAPI");

var middlewareOject={};


middlewareOject.isLoggedIn=function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("success","Conéctese por favor");
    res.redirect("/login");
}

middlewareOject.isLoggedInAPI=function(req, res, next){
    usuariosAPI.find({usuario: req.params.usuario}).exec(function (err, data) {
        if (err) {
            res.json({error: err});
        } else {
            if (data.length==0) {
                res.json({error: "usuario inválido"});
            } else {
                if (Date.now() > data[0].expiracion) {
                    res.json({error: "usuario expirado"});
                }   
                else {
                    return next();
                }             
            }
        }
    });    
}

//Valida Emocion edit
middlewareOject.isValidConfiguracionEdit = function (req, res, next) {
    DataConfiguracion(req);
    var errors = req.validationErrors();
    if (errors) {
        var data = { 
            nombretienda: req.body.data.nombretienda,
            email: req.body.data.email,
            emailpwd: req.body.data.emailpwd,
            rut: req.body.data.rut,
            nombredeposito: req.body.data.nombredeposito,
            banco: req.body.data.banco,
            tipocuenta: req.body.data.tipocuenta,
            cuenta: req.body.data.cuenta,
            _id: req.params.id };
        res.render("configuracion/edit", { data: data, errorList: errors });
    } else {
        return next();
    }
}
//Valida Emocion
function DataConfiguracion(req) {
    req.check('data.nombretienda', 'Nombre de Tienda es obligatorio').isLength({ min: 1 });
    req.check('data.email', 'EMail es obligatorio').isLength({ min: 1 });
    req.check('data.emailpwd', 'Password es obligatorio').isLength({ min: 1 });
    req.check('data.rut', 'RUT es obligatorio').isLength({ min: 1 });
    req.check('data.nombredeposito', 'Nombre depósito es obligatorio').isLength({ min: 1 });
    req.check('data.banco', 'Banco es obligatorio').isLength({ min: 1 });
    req.check('data.tipocuenta', 'Tipo Cuenta es obligatorio').isLength({ min: 1 });
    req.check('data.cuenta', 'Cuenta es obligatorio').isLength({ min: 1 });
}
//------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------
//Valida Creencia new
middlewareOject.isValidProductoNew = function (req, res, next) {
    DataProducto(req);
    var errors = req.validationErrors();
    if (errors) {
        var data = {codigo: req.body.data.codigo, descripcion: req.body.data.descripcion,
                    especificacion: req.body.data.especificacion, imagen: req.body.data.imagen,
                    precioCompra: req.body.data.precioCompra, precioVenta: req.body.data.precioVenta } ;
        res.render("producto/new", { data: data, errorList: errors });
    } else {
        return next();
    }
}
//Valida Creencia edit
middlewareOject.isValidProductoEdit = function (req, res, next) {
    DataProducto(req);
    var errors = req.validationErrors();
    if (errors) {
        var data = {codigo: req.body.data.codigo, descripcion: req.body.data.descripcion,
                    especificacion: req.body.data.especificacion, imagen: req.body.data.imagen,
                    precioCompra: req.body.data.precioCompra, precioVenta: req.body.data.precioVenta, 
                    _id: req.params.id };
        res.render("producto/edit", { data: data, errorList: errors });
    } else {
        return next();
    }
}
//Valida Emocion
function DataProducto(req) {
    req.check('data.codigo', 'Código es obligatorio').isLength({ min: 1 });
    req.check('data.descripcion', 'Descripción es obligatorio').isLength({ min: 1 });
    req.check('data.especificacion', 'Especificación es obligatorio').isLength({ min: 1 });
    req.check('data.imagen', 'Imágen es obligatorio').isLength({ min: 1 });
    req.check('data.precioCompra', 'Precio Compra es obligatorio').isLength({ min: 1 });
    req.check('data.precioCompra', 'Precio Venta es obligatorio').isLength({ min: 1 });
}
//------------------------------------------------------------------------------------



function valRut(rut) {
    var rutc = String(rut);
    rutc = rutc.substring(0, 10);
    while (rutc.length < 10) {
        rutc = "0" + rutc;
    }
    var f = 2;
    var acum = 0;
    var i = 9;
    for (i = 9; i >= 0; i--) {
        var m = f * parseInt(rutc.charAt(i));
        acum += m;
        f++;
        if (f > 7) {
            f = 2;
        }
    }
    var resto = acum % 11;
    var dn = 11 - resto;
    var digito = "";
    if (dn == 10) {
        digito = "K";
    } else {
        if (dn == 11) {
            digito = "0";
        } else {
            digito = String(dn);
        }
    }
    return digito;
}
//------------------------------------------------------------------------------------





module.exports = middlewareOject;