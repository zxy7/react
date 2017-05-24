/**
 * Created by Yi Ding on 2017/3/28.
 */
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import DairyInf from '../page/DairyInf'
// import * as DairyInfActions from '../redux/actions/DairyInf'

function mapStateToProps(state) {
    return state;
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(DairyInfCActions, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(DairyInf)
export default connect(mapStateToProps)(DairyInf)
