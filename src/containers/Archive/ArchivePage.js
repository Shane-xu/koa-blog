import {
  bindActionCreators,
} from 'redux'
import {
  connect
} from 'react-redux'
import Archive from '../../components/Archive';
import * as actionCreators from '../../actions'


function mapState2Props() {
  return {};
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch)
  return {
    fetchPosts: actions.fetchPosts
  }
}

export default connect(mapState2Props, mapDispatch2Props)(Archive)
