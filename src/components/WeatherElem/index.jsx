import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class WeatherElem extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }

    clickHandler = () => {
        this.setState({
            open: !this.state.open,
        })
    }

    render() {

        let {dt, main: {temp, temp_max, temp_min, humidity, pressure}, weather} = this.props.time

        return (
            <div className="weather-elem" key={this.props.index} onClick={this.clickHandler}>
                <div>{new Date(dt * 1000).toLocaleTimeString().split(':')[0] + "h"}</div>
                <div>{temp + '°C'}</div>
                <div>{weather[0].description}</div>
                <div><img src={`http://openweathermap.org/img/w/${weather[0].icon}.png`} alt=""/></div>
                <div className={`weather-drop-down ${this.state.open ? 'open' : 'closed'}`}>
                    <div><FontAwesomeIcon icon="thermometer-empty" />&nbsp;{temp_min}°C</div>
                    <div><FontAwesomeIcon icon="thermometer-full" />&nbsp;{temp_max}°C</div>
                    <div><FontAwesomeIcon icon="tint" />&nbsp;{humidity}</div>
                    <div><FontAwesomeIcon icon="tachometer-alt" />&nbsp;{pressure}Pa</div>
                </div>
            </div>
        )
    }
}