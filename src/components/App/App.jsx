import React, { Component } from 'react'
import config from '../../config'
import SearchImage from '../SearchImage'
import WeatherList from '../WeatherList'
import './App.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class App extends Component {
    constructor() {
        super()

        this.cityNameRef = React.createRef()
        this.state = {
            cityName: '',
            countryName: '',
            timeList: [],
            lastRequestFailed: false
        }
    }

    get WeatherApiUri() {
        return `http://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
            this.cityNameRef.current.value
        )}&mode=json&APPID=${config.weather_api_key}&units=metric`
    }

    async loadWeather() {
        fetch(this.WeatherApiUri)
            .then(r => r.json())
            .then(data => {
                if (Number(data.cod) !== 200) {
                    return Promise.reject()
                }

                // deconstructing data
                let {
                    city: { 
                        name: cityName = '', 
                        country: countryName = '' 
                    },
                    list: timeList = []
                } = data

                this.setState({
                    cityName: cityName,
                    countryName: countryName,
                    timeList: timeList,
                    lastRequestFailed: false
                })
            })
            .catch(() => {
                this.setState({ lastRequestFailed: true })
            })
    }

    handleSubmit = async e => {
        e.preventDefault()
        this.loadWeather()
    }

    render() {
        const { timeList, lastRequestFailed, ...city } = this.state

        return (
            <main>
                <form onSubmit={this.handleSubmit} className="search">
                    <input
                        type="text"
                        placeholder="enter your city"
                        ref={this.cityNameRef}
                    />
                    <button type="submit">
                        <FontAwesomeIcon icon="search" />
                    </button>
                </form>
                {!lastRequestFailed ? (
                    <div>
                        <SearchImage search={city.cityName} />
                        <WeatherList
                            city={city}
                            timeList={timeList.slice(0, 20)}
                        />
                    </div>
                ) : (
                    <div>Cette ville n'a pas été trouvé</div>
                )}
            </main>
        )
    }
}
