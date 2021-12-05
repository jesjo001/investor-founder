import * as FontAwesome from '@fortawesome/free-solid-svg-icons';

const _nav = {
  top: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: FontAwesome.faTachometerAlt,
    },
    {
      name: 'Investors',
      icon: FontAwesome.faBuilding,
      superAdmin: false,
      children: [
        {
          name: 'View Investors',
          url: '/investors/all',
        },
      ],
    },
    {
      name: 'Founders',
      icon: FontAwesome.faUser,
      superAdmin: false,
      children: [
        {
          name: 'View Founders',
          url: '/founders/all',
        },
        {
          name: 'Awaiting Approval',
          url: '/founders/awaiting-approval',
        },
      ],
    },
    {
      name: 'Events',
      icon: FontAwesome.faCalendarPlus,
      superAdmin: false,
      children: [
        {
          name: 'View Events',
          url: '/events/all',
        },
      ],
    },
    {
      name: 'Blogs',
      icon: FontAwesome.faEdit,
      superAdmin: false,
      children: [
        {
          name: 'View Blogs',
          url: '/blogs/all',
        },
        {
          name: 'Awaiting Approval',
          url: '/blogs/awaiting-approval',
        },
      ],
    },
    {
      name: 'Feedback',
      icon: FontAwesome.faComments,
      superAdmin: false,
      url: '/feedback/all',
    },
    {
      name: 'Invite',
      icon: FontAwesome.faEnvelopeOpenText,
      superAdmin: false,
      url: '/invite',
    },
  ],
  bottom: [
    {
      name: 'Admin',
      icon: FontAwesome.faLock,
      superAdmin: true,
      children: [
        {
          name: 'User Management',
          url: '/admin/users/all',
        },
      ],
    },
  ],
};

export default _nav;
