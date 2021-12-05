import mongoose from 'mongoose'

const userData = {
    userid:{type:String,require:true},
    userip:{type:String,require:true},


}
const Login = new mongoose.Schema({
    user:userData
},
{
    timestamps: true,
  }
)
const newLogin = mongoose.model('Login',Login)
export default newLogin