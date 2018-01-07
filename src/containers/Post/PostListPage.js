import {
  bindActionCreators,
} from 'redux'
import {
  connect
} from 'react-redux'
import {
  PostList
} from '../../components/Post';
import * as actionCreators from '../../actions/index'


function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch)
  return {
    fetchPosts: actions.fetchPosts
  }
}

export default connect(null, mapDispatch2Props)(PostList)
