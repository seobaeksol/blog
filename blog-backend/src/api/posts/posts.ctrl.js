let postId = 1;

const posts = [
  {
    id: 1,
    title: 'Title',
    body: 'content',
  },
];

/* Write Post
POST /api/posts
{ title, body }
*/
export const write = ctx => {
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
};

/* Lookup Post List
GET /api/posts
*/
export const list = ctx => {
  ctx.body = posts;
};

/* Search a post
GET /api/posts/:id
*/
export const read = ctx => {
  const { id } = ctx.params;
  const post = posts.find(p => p.id.toString() === id);

  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: 'There is no such a post',
    };
    return;
  }
  ctx.body = post;
};

/* Delete a post
DELETE /api/posts/:id
*/
export const remove = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'There is no such a post',
    };
  }

  posts.splice(index, 1);
  ctx.status = 204; // No Content
};

/* Modify posts(replace)
PUT /api/posts/:id
{ title, body }
*/
export const replace = ctx => {
  // PUT Method is used to replace entire data
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'There is no such a post',
    };
    return;
  }
  posts[index] = {
    id,
    ...ctx.request.body,
  };
};

/* Modify Post (Specific Field)
PATCH /api/posts/:id
{title, body}
*/
export const update = ctx => {
  // PATCH Method replace only given fields
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'There is no such a post',
    };
    return;
  }

  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};
