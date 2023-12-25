// pages/api/api2.js

export default async function handler(req, res) {
    // Assuming 'a' is a query parameter, you can access it using req.query
    const a = req.query.a;
  
    // Process 'a' as needed, and maybe transform or use it
    const result = `Processed ${a} in api2`;
  
    // Send the processed result as the response
    res.status(200).send(result);
  }
  