import React, { Component } from 'react'
import config from '../../config'
import './SearchImage.css'


export default class SearchImage extends Component {
    constructor(props) {
        super(props)

        this.defaultPhotoUrl = 'http://paperlief.com/images/sky-wallpaper-4.jpg'
        this.state = {
            imageLink: this.defaultPhotoUrl,
        }
    }

    getGoogleApiUri(toSearch) {
        return `https://www.googleapis.com/customsearch/v1?key=${
            config.google_api_key
        }&cx=${config.google_seach_engine_ID}&q=${encodeURIComponent(
            toSearch
        )}&num=1&searchType=image`
    }

    async fetchImage(toSearch) {
        let uri = this.getGoogleApiUri(toSearch)
        
        let {
            items: [
                {
                    link: imageLink = this.defaultPhotoUrl,
                }
            ] = [{link: this.defaultPhotoUrl}]
        } = await fetch(uri).then(r => r.json())

        this.setState({
            imageLink: imageLink
        })
    }

    componentWillReceiveProps(nextProps) {
        this.fetchImage(nextProps.search)
    }

    render() {
        const style = {
            backgroundImage: `url(${this.state.imageLink})`
        }

        return (
            <div className="banner" style={style}>
                <h1>
                    {this.props.search}
                </h1>
            </div>
        )
    }
}