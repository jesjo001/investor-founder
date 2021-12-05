import express from 'express';
import userRoute from './user.route';
import searchRoute from './search.route';
import avatarRoute from './avatar.route';
import eventRoute from './events.route';
import roleRoute from './role.route';
import BlogRouter from './blogRoute/index'
import FounderRouter from './founders/index';
import AuthRouter from './auth.route';
import InvestorRouter from './investors/index'
import DashboardRouter from './dashboard/index'
import ExportsRouter from './exports/index'

const Router = express.Router();
Router.use('/auth', AuthRouter);
Router.use('/users', userRoute);
Router.use('/', eventRoute);
Router.use('/', roleRoute);
Router.use('/', searchRoute);
Router.use('/avatar', avatarRoute);
Router.use('/blog', BlogRouter)
Router.use('/founders', FounderRouter)
Router.use('/investors', InvestorRouter)
Router.use('/dashboard', DashboardRouter)
Router.use('/exports', ExportsRouter)
export default Router;
