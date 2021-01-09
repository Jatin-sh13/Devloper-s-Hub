import React from 'react'
import { connect } from 'react-redux'
import '../App.css'
const Alert = ({ Alerts }) =>
    Alerts.map((Alert) => (
        <div class="AlertContainer" key={Alert.id}>
            <p class="Alert-para">{Alert.msg}</p>
        </div>
    ));
const mapstate = state => ({
    Alerts: state.Alert
})

export default connect(mapstate)(Alert)
