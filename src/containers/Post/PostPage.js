import {
  bindActionCreators,
} from 'redux'
import {
  connect
} from 'react-redux'
import {
  Post
} from '../../components/Post';
import * as actionCreators from '../../actions'


function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch)
  return {
    fetchPostById: actions.fetchPostById
  }
}

export default connect(null, mapDispatch2Props)(Post)
