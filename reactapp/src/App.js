import React, { Component } from 'react';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], local: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
        this.populateLocationData();
      //  this.populateData();
        
    }

    static renderLocationTable(local) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Country</th>
                        <th>Continent</th>
                        <th>Population</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {local.map(local =>
                        <tr key={local.data}>
                            <td>{local.date}</td>
                            <td>{local.country}</td>
                            <td>{local.continent}</td>
                            <td>{local.population}</td>
                            <td>{local.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    static renderForecastsTable(forecasts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

//    static renderDataTable({ forecast, local }) {
//    return (
//        <table className='table table-striped' aria-labelledby="tabelLabel">
//            <thead>
//                <tr>
//                    <th>Date</th>
//                    <th>Country</th>
//                    <th>Continent</th>
//                    <th>Population</th>
//                    <th>Summary</th>
//                    <th>Date</th>
//                    <th>Temp. (C)</th>
//                    <th>Temp. (F)</th>
//                    <th>Summary</th> 
//                </tr>
//            </thead>
//            <tbody>
//                {data.map(item => (
//                    <tr key={item.date}>
//                        {isLocation ? (
//                            <>
//                                <td>{item.date}</td>
//                                <td>{item.country}</td>
//                                <td>{item.continent}</td>
//                                <td>{item.population}</td>
//                                <td>{item.summary}</td>
//                            </>
//                        ) : (
//                            <>
//                                <td>{item.date}</td>
//                                <td>{item.temperatureC}</td>
//                                <td>{item.temperatureF}</td>
//                                <td>{item.summary}</td>
//                            </>
//                        )}
//                    </tr>
//                ))}
//            </tbody>
//        </table>
//    );
//}

    render() {
        let contents = this.state.loading ? (
            <p>
                <em>
                    Loading... Please refresh once the ASP.NET backend has started. See{' '}
                    <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a>{' '}
                    for more details.
                </em>
            </p>
        ) : (
            <>
                {App.renderForecastsTable(this.state.forecasts)}
                {App.renderLocationTable(this.state.local)}
               
            </>
        );
       /* { App.renderDataTable(this.state.forecasts, this.state.local) }*/
        return (
            <div>
                <h1 id="tabelLabel">Weather forecast Location</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
    //async populateData() {
    //    const responseweather = await fetch('weatherforecast');
    //    const dataweather = await responseweather.json();
    //    this.setState({ forecasts: dataweather, loading: false });

    //    const responselocal = await fetch('location');
    //    const datalocal = await responselocal.json();
    //    this.setState({ local: datalocal, loading: false });
    //}
    async populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }

    async populateLocationData() {
        const response = await fetch('location');
        const data = await response.json();
        this.setState({ local: data, loading: false });
    }
}
