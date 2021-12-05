import express from 'express';
const commonRouter = express.Router();
import {
  getUsers,
  getUserDetails,
} from '../../controllers/v1/common/getUser.js';
import { info } from '../../controllers/v1/common/info.js';
import { signin } from '../../controllers/v1/common/signIn.js';
import { protect } from '../../middlewares/authentication/auth.js';
import { changePassword } from '../../controllers/v1/common/change-password';
import { getFounder } from '../../controllers/v1/founder/getFounder.js';
import { getInvestor } from '../../controllers/v1/investor/getInvestor.js';
import { Foundersignup } from '../../controllers/v1/founder/founder.signup.js';
import {InvestorSignUp} from '../../controllers/v1/investor/investor.signup'
import {getConnections, getConnectionsSender} from '../../controllers/v1/common/getConnections'
import forgotPassword from '../../controllers/v1/common/forgotPassword.js';
import { resetPassword } from '../../controllers/v1/common/resetPassword.js';
import { deleteUser } from '../../controllers/v1/common/user.js';
import foundersUpload from '../../controllers/v1/common/avatarUpload';
import investorsUpload from '../../controllers/v1/common/avatarUploadInvestors';
import upload from '../../middlewares/fileUpload/upload';
import { getBlogs } from '../../controllers/v1/blog/getBlogs'
import uploadBlogPhoto  from '../../controllers/v1/blog/avatarUpload'
import { getBlogById } from '../../controllers/v1/blog/getBlogById'
import { getComments } from '../../controllers/v1/comment/getComment';
import {authenticate} from '../../controllers/v1/common/authenticate.js';


commonRouter.post('/signin', signin);
commonRouter.get('/confirm-login',protect, authenticate);



commonRouter.get('/info', protect, info);
commonRouter.delete('/delete/:id', protect, deleteUser);
commonRouter.get('/getUsers', getUsers);
commonRouter.post('/forgot-password', forgotPassword);
commonRouter.get('/getUser/:id', protect, getUserDetails);
commonRouter.get('/Founders', getFounder);
commonRouter.get('/Investors', getInvestor);
commonRouter.post('/change-password', protect, changePassword);
commonRouter.post('/reset-password', resetPassword);

//Sign up for founders and Investors
commonRouter.post('/signup', Foundersignup);
commonRouter.post('/investor/signup', upload.single('avatar'), InvestorSignUp);



//End signup

//Blog routes
commonRouter.get('/getblogs',getBlogs)
// commonRouter.get('/blog/:id', getBlogById)
// commonRouter.get('/blog/:id', getBlogById)
commonRouter.post('/blog/upload', upload.single('avatar'), uploadBlogPhoto.uploadAvatar);

//Blog Comment Route
commonRouter.get('/comment/:id', getComments)

commonRouter.use(protect);
commonRouter.get('/info', info);
commonRouter.get('/myConnections',getConnections)
commonRouter.get('/myConnectionSender',getConnectionsSender)
// reset password


//Update Profile Image for investors and founders
commonRouter.post('/upload/founders', upload.single('avatar'), foundersUpload.foundersAvatar);
commonRouter.post('/upload/investors', upload.single('avatar'), investorsUpload.investorsAvatar);



export default commonRouter;
