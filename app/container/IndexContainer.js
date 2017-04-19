/**
 * Created by Yi Ding on 2017/3/28.
 */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Index from '../page/Index'
import * as IndexActions from '../redux/actions/Index'

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(IndexActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)