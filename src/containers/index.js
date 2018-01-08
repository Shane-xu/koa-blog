import {
  bindActionCreators,
} from 'redux'
import {
  connect
} from 'react-redux'
import App from '../components/App';
import * as actionCreators from '../actions'


function mapState2Props(state) {
  const commonSt = state.store.common
  return {
    tags: commonSt.tags,
    categories: commonSt.categories,
  };
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch)
  return {
    fetchTags: actions.fetchTags,
    fetchCategories: actions.fetchCategories
  }
}

export default connect(mapState2Props, mapDispatch2Props)(App)
