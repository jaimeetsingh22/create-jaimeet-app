import {Router} from "express"  

const route = Router();  

// Define your routes here  
route.get('/test', (req, res) => {  
  res.json({message:'Welcome to the Home Page'});  
});  

export default route;  
