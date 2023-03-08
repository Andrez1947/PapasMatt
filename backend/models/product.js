//To add this shema in database
const mongoose = require('mongoose');

//product schema (structure)
const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Por favor registra el nombre del producto."],
        trim: true,
        maxLength: [
          120,
          "El nombre del producto no debe exceder los 120 caracteres.",
        ],
      },
      precio: {
        type: Number,
        required: [true, "Por favor registra el nombre del producto."],
        maxLength: [
          7,
          "El precio del producto no puede estar por encima de 99,999.999.",
        ],
        default: 0.0,
      },
      descripcion: {
        type: String,
        required: [true, "Por favor registra una descripción para el producto."],
      },      
      imagen: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            require: true,
          },
        },
      ],
      categoria: {
        required: true,
        type: String,
        require: [true, "Por favor seleccione una de las categorias"],
        enum: {
          values: ["Papas a la Francesa", "Papas Criollas", "Otras Delicias", "Bebidas", "Adiciones"],
        },
      },
      fechaCreacion:{
        type:Date,
        default:Date.now
      }
});

module.exports = mongoose.model('Product', productSchema);