import mongoose from 'mongoose';


const itemSchema = new mongoose.Schema({
  ItemsN: {
      type: String,
      required: true
  },
  price: {
      type: Number,
      required: true
  },
  quantity: {
      type: Number,
      required: true
  }
});


const CheckDSchema = new mongoose.Schema({
 
  
  CNumber: {
    type: String,
    required: true
},
Cdate: {
    type: String,
    required: true
},
Cvc: {
    type: String,
    required: true
},
PNumber: {
    type: Number,
    required: true
},
CurrentuserId: {
    type: String,
    required: true
},

items: [itemSchema], 
totalPrice: {
    type: Number,
    required: true
}

},{ timestamps: true } );




const CheckD = mongoose.model('ChackD', CheckDSchema);

export default CheckD;