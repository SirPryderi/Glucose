/**
 * Created by Vittorio on 09/12/2016.
 */
import React from 'react';
import LinearProgress from "material-ui/LinearProgress"

const InsulinBar = () => (
    <div style={{textAlign: "center"}}>
        <span>Active Insulin</span>
        <LinearProgress mode="determinate" value={90} style={{height: 30}} label="ciao"/>
    </div>
);

export default InsulinBar;

