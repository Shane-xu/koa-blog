import * as apis from '../constants/APIs'
import types from '../constants/ActionTypes'

export function fetchPosts(params) {
  return {
    actionType: types.FETCH_POSTS,
    options: {
      url: apis.API_POSTS,
      params
    }
  }
}


/**
 * 获取最新n条文章
 */

export function fetchLastPosts(limit = 10) {
  return {
    actionType: types.FETCH_LAST_POSTS,
    options: {
      url: apis.API_LAST_POSTS,
      params: {
        limit
      }
    }
  }
}

export function fetchPostById(id) {
  return {
    actionType: types.FETCH_POST_BY_ID,
    options: {
      url: apis.API_POST_BY_ID,
      params: {
        id
      }
    }
  }
}

/**
 * 文章更新访问量
 */
export function addVisitCount(id) {
  return {
    actionType: types.ADD_POST_VISIT_COUNT,
    options: {
      url: apis.API_ADD_VISIT_COUNT,
      method: 'patch',
      params: {
        id
      }
    }
  }
}

export function fetchCategories(params) {
  return {
    actionType: types.FETCH_CATEGORIES,
    options: {
      url: apis.API_CATEGORIES,
      params
    }
  }
}

export function fetchTags(params) {
  return {
    actionType: types.FETCH_TAGS,
    options: {
      url: apis.API_TAGS,
      params
    }
  }
}

export function fetchAbout(params) {
  return {
    actionType: types.FETCH_ABOUT,
    options: {
      url: apis.API_ABOUT,
      params
    }
  }
}