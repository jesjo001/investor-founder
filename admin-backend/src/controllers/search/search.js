import Investors from '../../model/investors';
import Founders from '../../model/founders';
import Blogs from '../../model/blog';
import Events from '../../model/events';
import Users from '../../model/adminUsers';

const mapEntityToModel = (entity) => {
  switch (entity) {
    case 'investors':
      return Investors;
      break;
    case 'founders':
      return Founders;
      break;
    case 'blogs':
      return Blogs;
      break;
    case 'events':
      return Events;
      break;
    case 'users':
      return Users;
      break;
    case 'unapprovedFounders':
      return Founders;
      break;
    case 'unapprovedBlogs':
      return Blogs;
      break;

    default:
      break;
  }
};

export const search = async (req, res) => {
  try {
    if (!req.query.searchWord || !req.query.entity) {
      return res.status(400).json({
        message: 'Search word and entity is required',
      });
    }

    if (
      req.query.entity !== 'investors' &&
      req.query.entity !== 'founders' &&
      req.query.entity !== 'blogs' &&
      req.query.entity !== 'users' &&
      req.query.entity !== 'unapprovedFounders' &&
      req.query.entity !== 'unapprovedBlogs' &&
      req.query.entity !== 'events'
    ) {
      return res.status(400).json({
        message:
          'Entiy should be one of [investors, founders, blogs, events, users, unapprovedBlogs, unapprovedFounders]',
      });
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skipIndex = (page - 1) * limit;

    if (
      req.query.entity === 'unapprovedFounders' ||
      req.query.entity === 'unapprovedBlogs'
    ) {
      const data = await mapEntityToModel(
        req.query.entity
      ).searchPartialUnapproved(req.query.searchWord, limit, skipIndex);
      const count = await mapEntityToModel(
        req.query.entity
      ).searchPartialUnapprovedCount(req.query.searchWord);
      if (!data) return res.status(404).send('Entity not found');
      else
        return res
          .status(200)
          .json({ status: 200, data, count, message: 'Success' });
    } else {
      const data = await mapEntityToModel(req.query.entity).searchPartial(
        req.query.searchWord,
        limit,
        skipIndex
      );
      const count = await mapEntityToModel(req.query.entity).searchPartialCount(
        req.query.searchWord
      );
      if (!data) return res.status(404).send('Entity not found');
      else
        return res
          .status(200)
          .json({ status: 200, data, count, message: 'Success' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send('Something went wrong');
  }
};
