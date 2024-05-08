import Cart from "../models/Cart.model.js";
import Items from "../models/Items.model.js";
import CheckD from "../models/Checkout.model.js";
import Form from "../models/Form.model.js";
import { errorHandle } from "../Middleware/error.js";

//add new items 
export const Itcreate = async (req, res, next) => {
    
  
    const { ItemsN, price, quantity, image,  Description,  } = req.body;
  
    const newItems = new Items({
      ItemsN,
      price,
      quantity,
      image,
      Description,
      
    });
    try {
      const savedItems = await newItems.save();
      res.status(201).json(savedItems);
    } catch (error) {
      next(error);
      console.log(error);
    }
  };

  //get all items 
  export const getAllItems = async (req, res, next) => {
    try {
      const items = await Items.find();
  
      if (items.length > 0) {
        res.json({ message: "Items details retrieved successfully", items });
      } else {
        return next(errorHandle(404, " student not fonud "));
      }
    } catch (error) {
      console.log(error.message);
  
      next(error);
    }
  };

 //after click one items display
  export const getitems = async (req, res, next) => {
    try {
      const itemsId = req.params.ItemsId; 
      
      
      const items = await Items.find({ _id: itemsId });
  
      if (items.length > 0) {
        res.json({ message: "Item details retrieved successfully", items });
      } else {
        return next(errorHandle(404, "Item not found"));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };

//add cart
  export const Cartcrete = async (req, res, next) => {
    
  
    const { ItemId,CurrentuserId,ItemsN, price, quantity, image,  Description,  } = req.body;
  
    const newItems = new Cart({
      ItemId,
      CurrentuserId,
      ItemsN,
      price,
      quantity,
      image,
      Description,
      
    });
    try {
      const savedItems = await newItems.save();
      res.status(201).json(savedItems);
    } catch (error) {
      next(error);
      console.log(error);
    }
  };

  // display in the cart
  export const getCartItem = async (req, res, next) => {
    
    try {
      const { CurrentuserId } = req.params;
      console.log(CurrentuserId)
  
      // Query the database for documents matching CurrentuserId
      const items = await Cart.find({ CurrentuserId });
      console.log(items)
  
      
  
      // Send extracted data as response
      res.json(items);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
};


//after click the check out those data save the chekd database
export const CheckOutcrete = async (req, res, next) => {
    
  
  const {  price, length,totalPrice,CNumber,Cdate,Cvc,PNumber,CurrentuserId,items  } = req.body;

  if (!/^\d{10}$/.test(PNumber)) {
    return res.status(400).json({ message: 'Phone number must be 10 digits long.' });
}


  const newItems = new CheckD({
  
   
        price,
        length,
        totalPrice,
        CNumber,
        Cdate,
        Cvc,
        PNumber,
        CurrentuserId,
        items

    
  });
  try {

    const savedItems = await newItems.save();
    res.status(201).json(savedItems);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

//romove 1 items in the cart 
export const deleteItems = async (req, res, next) => {
  
  try {
    
    await Cart.findByIdAndDelete(req.params.itemsId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    next(error);
  }
};

// clear the cart 
export const deleteItemss = async (req, res, next) => {
  try {
    const { CurrentuserId } = req.params;
    
    // Delete items associated with the specified CurrentUserId
    await Cart.deleteMany({ CurrentuserId });

    res.status(200).json({ message: "Items have been deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//get checkout details and fetch the Payment page
export const  checkout = async (req, res, next) => {
  try {
    const { CurrentuserId } = req.params;
    console.log(CurrentuserId)

    // Query the database for documents matching CurrentuserId
    const items = await CheckD.find({ CurrentuserId });
    console.log(items)

    

    // Send extracted data as response
    res.json(items);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


//get all order
export const getallOrder = async (req, res, next) => {
  try {
    

      const order = await CheckD.find();

      if (order.length > 0) {
        res.json({
          message: "Employee details retrieved successfully",
          order,
        });
      } else {
        return next(error(404, " Employee not fonud "));
      }
   
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};

//get items 
export const updateitem = async (req, res, next) => {
  
  try {
    const updateitem = await Items.findByIdAndUpdate(
      req.params.itemId,
      {
        $set: {
          ItemsN: req.body.ItemsN,
          price: req.body.price,
          quantity: req.body.quantity,
          image: req.body.image,
          Description: req.body.Description,
        },
      },
      { new: true }
    );
    res.status(200).json(updateitem);
  } catch (error) {
    next(error);
  }
};

//delete items 
export const deleteitems = async (req, res, next) => {
 
  try {
    await Items.findByIdAndDelete(req.params.itemsId);
    res.status(200).json("The item has been deleted");
  } catch (error) {
    next(error);
  }
};


//Request item 
export const Formm = async (req, res, next) => {
    
  
  const { ItemsN, price, quantity,  } = req.body;

  const newItems = new Form({
    ItemsN,
    price,
    quantity,
    
    
  });
  try {
    const savedItems = await newItems.save();
    res.status(201).json(savedItems);
  } catch (error) {
    next(error);
    console.log(error);
  }
};






  



  
  
  