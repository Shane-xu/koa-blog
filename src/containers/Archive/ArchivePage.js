import {
  bindActionCreators,
} from 'redux'
import {
  connect
} from 'react-redux'
import Archive from '../../components/Archive';


function mapState2Props() {
  return {};
}

function mapDispatch2Props(dispatch) {
  // const actions = bindActionCreators(actionCreators, dispatch)
  return {}
}

export default connect(mapState2Props, mapDispatch2Props)(Archive)
