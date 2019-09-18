import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'Joi';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;

const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      ctx.status = 404;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
  return next();
};

export const checkOwnPost = async (ctx, next) => {
  const { user, post } = ctx.state;
  if (user._id !== post.user._id.toString()) {
    ctx.status = 403;
    return;
  }
  return next();
};

/* Write Post
POST /api/posts
{
  title: 'title',
  body: 'content',
  tags: ['tag1', 'tag2']
}
*/
export const write = async ctx => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required(),
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  console.log(ctx.state.user);
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body: sanitizeHtml(body, sanitizeOption),
    tags,
    user: ctx.state.user,
  });

  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

const removeHtmlAndShorten = body => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });

  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

/* Lookup Post List
GET /api/posts?username=&tag=&page=
*/
export const list = async ctx => {
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  const { tag, username } = ctx.query;
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    ctx.body = posts
      .map(post => post.toJSON())
      .map(post => ({
        ...post,
        body: removeHtmlAndShorten(post.body),
      }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* Search a post
GET /api/posts/:id
*/
export const read = async ctx => {
  ctx.body = ctx.state.post;
};

/* Delete a post
DELETE /api/posts/:id
*/
export const remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndDelete(id).exec();
    ctx.status = 204; // No Content
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* Modify Post (Specific Field)
PATCH /api/posts/:id
{title, body}
*/
export const update = async ctx => {
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const nextData = { ...ctx.request.body };
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body);
  }

  const { id } = ctx.params;

  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
      new: true, // When it not set, return old data. When it set, return new data
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
