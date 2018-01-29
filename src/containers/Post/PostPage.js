import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Post } from '../../components/Post'
import * as actionCreators from '../../actions'

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch)
  return {
    onFetchPostById: actions.fetchPostById,
    onFetchCommentsByPostId: actions.fetchCommentsByPostId,
    onAddVisitCount: actions.addVisitCount,
    onAddComment: actions.addComment,
  }
}

export default connect(null, mapDispatch2Props)(Post)
