import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/admin/Users';
import Investors from './pages/investors/Investors';
import Founders from './pages/founders/Founders';
import Events from './pages/events/Events';
import ViewEvent from './pages/events/ViewEvent';
import NewEvent from './pages/events/NewEvent';
import AwaitingApproval from './pages/founders/AwaitingApproval';
import BlogAwaitingApproval from './pages/blog/AwaitingApproval';
import ViewAwatingFounder from './pages/founders/ViewAwatingFounder';
import NewUser from './pages/admin/NewUser';
import ChangePassword from './pages/admin/ChangePassword';
import NewBlog from './pages/blog/NewBlog';
import Blogs from './pages/blog/Blogs';
import Feedback from './pages/feedback/Feedback';
import Invite from './pages/Invite';
import ViewInvestor from './pages/investors/ViewInvestor';
import ViewFounders from './pages/founders/ViewFounders';
import ViewUser from './pages/admin/ViewUser';
import ViewBlog from './pages/blog/ViewBlog';
import ViewAwaitingBlog from './pages/blog/ViewAwaitingBlog';

const pageList = [
  {
    name: '',
    path: '/dashboard',
    component: Dashboard,
  },
  {
    name: '',
    path: '/investors/all',
    component: Investors,
    exact: true,
  },
  {
    name: '',
    path: '/investor/view/:id',
    component: ViewInvestor,
    exact: true,
  },
  {
    name: '',
    path: '/founders/all',
    component: Founders,
    exact: true,
  },
  {
    name: '',
    path: '/founder/view/:id',
    component: ViewFounders,
    exact: true,
  },
  {
    name: '',
    path: '/founders/awaiting-approval',
    component: AwaitingApproval,
    exact: true,
  },
  {
    name: '',
    path: '/founders/awaiting-approval/:id',
    component: ViewAwatingFounder,
    exact: true,
  },
  {
    name: '',
    path: '/events/all',
    component: Events,
    exact: true,
  },
  {
    name: '',
    path: '/event/view/:id',
    component: ViewEvent,
    exact: true,
  },
  {
    name: '',
    path: '/event/new',
    component: NewEvent,
    exact: true,
  },
  {
    name: '',
    path: '/blogs/all',
    component: Blogs,
    exact: true,
  },
  {
    name: '',
    path: '/blogs/awaiting-approval',
    component: BlogAwaitingApproval,
    exact: true,
  },
  {
    name: '',
    path: '/blog/view/:id',
    component: ViewBlog,
    exact: true,
  },
  {
    name: '',
    path: '/blog/unapproved/view/:id',
    component: ViewAwaitingBlog,
    exact: true,
  },
  {
    name: '',
    path: '/blog/new',
    component: NewBlog,
    exact: true,
  },
  {
    name: '',
    path: '/feedback/all',
    component: Feedback,
    exact: true,
  },
  {
    name: '',
    path: '/invite',
    component: Invite,
    exact: true,
  },
  // ADMIN ROUTES
  {
    name: '',
    path: '/admin/users/all',
    component: Users,
    exact: true,
  },
  {
    name: '',
    path: '/admin/users/view/:id',
    component: ViewUser,
    exact: true,
  },
  {
    name: '',
    path: '/admin/users/new',
    component: NewUser,
    exact: true,
  },
  {
    name: '',
    path: '/admin/users/change-password',
    component: ChangePassword,
    exact: true,
  },
];

export default pageList;
