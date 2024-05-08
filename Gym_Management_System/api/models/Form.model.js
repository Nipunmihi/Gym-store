import mongoose from 'mongoose';


const FormSchema = new mongoose.Schema({
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






const Form = mongoose.model('Form', FormSchema);

export default Form;