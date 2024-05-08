import  express  from "express";
import { Cartcrete, CheckOutcrete, Formm, Itcreate,  checkout, deleteItems, deleteItemss, deleteitems, getAllItems, getCartItem, getallOrder, getitems, updateitem } from "../controllers/items.controller.js";



const router = express.Router();

router.post('/Itcreate', Itcreate);
router.get('/getAllItems', getAllItems);
router.get('/getItem/:ItemsId', getitems);
router.post('/Cart',  Cartcrete);
router.get('/cartitem/:CurrentuserId', getCartItem)
router.post('/Checkout',  CheckOutcrete);
router.delete('/deleteitems/:itemsId',  deleteItems)
router.delete('/deletCurretId/:CurrentuserId',  deleteItemss)
router.get('/itemDetails/:CurrentuserId', checkout)
router.put('/updateitem/:itemId',  updateitem)
router.delete('/deleteitem/:itemsId',  deleteitems)
router.get('/getorder', getallOrder)
router.post('/createform', Formm)





export default router;