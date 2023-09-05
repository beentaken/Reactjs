import React, { Component } from 'react';
import { AnotherComponent } from './ui/AnotherComponent';
export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], local: [], menu: [], loading: true };
    }

    componentDidMount() {
        this.populateData();   
    }

    static renderLocationTable(local) {

        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        {Object.keys(local[0]).map(key => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {local.map(local =>
                        <tr key={local.date}>
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

    static renderDataTable( forecasts, local ) {
        return (
            <><table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        {Object.keys(local[0]).map(key => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {local.map(local => <tr key={local.date}>
                        <td>{local.date}</td>
                        <td>{local.country}</td>
                        <td>{local.continent}</td>
                        <td>{local.population}</td>
                        <td>{local.summary}</td>
                    </tr>
                    )}
                </tbody>
            </table><table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Temp. (C)</th>
                            <th>Temp. (F)</th>
                            <th>Summary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecasts.map(forecast => <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                        )}
                    </tbody>
                </table></>
        );
    }

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
                    <AnotherComponent data={this.state.menu} />
                
                {App.renderForecastsTable(this.state.forecasts)}
                {App.renderLocationTable(this.state.local)}
                {App.renderDataTable(this.state.forecasts, this.state.local)}
            </>
        );     
        return (
            <div>
                <h1 id="tabelLabel">Weather forecast Location</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
    async populateData() {
        const responseweather = await fetch('weatherforecast');
        const dataweather = await responseweather.json();

        const responselocal = await fetch('location');
        const datalocal = await responselocal.json();

        const responsemenu = await fetch('menu');
        const datamenu = await responsemenu.json();

        this.setState({ forecasts: dataweather, local: datalocal, menu: datamenu, loading: false });
    }
}
