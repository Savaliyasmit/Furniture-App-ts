import  express  from "express";
const ProductRoutes = express.Router()
import { addProduct,getAllProduct,getSpacificProduct,updateProduct,deleteProduct} from "../../controller/admin/product.controller";
import upload from '../../helpers/imageUplode';
import verifytoken from '../../helpers/verifyToken';

ProductRoutes.post('/add-product',verifytoken,upload.single('productImage'),addProduct);
ProductRoutes.get('/products',verifytoken,getAllProduct);
ProductRoutes.get('/get-product/:id',verifytoken,getSpacificProduct);
ProductRoutes.put('/update-product/:id',verifytoken,updateProduct);
ProductRoutes.delete('/remove-product/:id',verifytoken,deleteProduct)

export default ProductRoutes