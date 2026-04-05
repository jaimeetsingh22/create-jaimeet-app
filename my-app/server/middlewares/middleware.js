// create your middleware functions in the middlewares directory and don't forget to call the next() function to pass control to the next middleware or route handler and export the middleware function
          

export function Middleware(req, res, next) {   
  console.log("Middleware executed");   
  // You can add more logic here if needed   
  next(); // Call next() to pass control to the next middleware or route handler  
}