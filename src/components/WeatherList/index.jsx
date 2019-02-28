import React, { Component } from 'react'
import WeatherElem from '../WeatherElem'
import './WeatherList.css'

export default class WeatherList extends Component {
    render() {

        let {timeList} = this.props

        return (
            <div className="weather-data">
                {timeList.map((time, index) => <WeatherElem time={time} index={index}/> )}
            </div>
        )
    }
}