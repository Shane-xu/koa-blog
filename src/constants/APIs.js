export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://api.xxxx.com:3200/api'   // 生产环境的api地址
    : 'http://localhost:3200/api'

export const API_CATEGORIES = '/categories'
export const API_TAGS = '/tags'
export const API_ADD_COMMENT = '/comments'
export const API_GET_COMMENTS_POST_ID = '/comments/post/:id'
export const API_POSTS = '/posts'
export const API_LAST_POSTS = '/posts/list/last'
export const API_POST_BY_ID = '/posts/:id'
export const API_ADD_VISIT_COUNT = '/posts/:id'
export const API_ABOUT = '/about'
