import Auth from "../../models/user";
import TempFounder from "../../models/pendingFounder";


export default {
  async emailExist(email, res) {
    try {
      const condition = {
        email,
      };    
      const user = await Auth.findOne(condition);  
      if(user) return user 
      return false      
    } catch (err) {
      return res.status(500).json({
        status: "500 Internal server error",
        error: "Error checking for email",
      });
    }
  }, 
  async founderEmailCheck(email, res) {
    try {
      const condition = {
        email,
      };    
      const user = await TempFounder.findOne(condition);  
      if(user) return user 
      return false      
    } catch (err) {
      return res.status(500).json({
        status: "500 Internal server error",
        error: "Error checking for email",
      });
    }
  } 
};

