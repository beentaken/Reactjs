import React, { Component } from 'react';
import { AnotherComponent } from '../ui/AnotherComponent';
import { DeleteOutline, Check, History, ExpandMore, TagFaces, Visibility, Fingerprint } from "@mui/icons-material";
/*import { CheckboxesGroup } from "./checkbox/D2";*/

export default class Api extends Component {
    static displayName = Api.name;

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

    static renderDataTable(forecasts, local) {
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
        const biooption = [
            {
                name: "Face",
                id: "0",
                bool: false,
                icon: TagFaces,
            },
            {
                name: "Iris",
                id: "1",
                bool: false,
                icon: Visibility,
            },
            {
                name: "Finger",
                id: "2",
                bool: true,
                icon: Fingerprint,
            },
        ];

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
                    {/*<CheckboxesGroup biooptions={biooption} />*/}
                    {Api.renderForecastsTable(this.state.forecasts)}
                    {Api.renderLocationTable(this.state.local)}
                    {Api.renderDataTable(this.state.forecasts, this.state.local)}
            </>
        );

        const readFile = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const binaryData = reader.result;
                    const fileType = file.type;
                    resolve({ binaryData, fileType });
                };
                reader.onerror = (error) => {
                    reject(error);
                };
                reader.readAsBinaryString(file);
            });
        };

        const handleFileInput = async (event) => {
            const { binaryData, fileType } = await readFile(event.target.files[0]);
            const data = btoa(binaryData);

            const byteCharacters = atob(data);
            const byteArray = new Uint8Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteArray[i] = byteCharacters.charCodeAt(i);
            }
            const blob = new Blob([byteArray], { type: fileType });

        }

        return (
            <div>
                <h1 id="tabelLabel">Weather forecast Location</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
                <input
                    accept="image/*"
                    id="input-file"
                    onChange={handleFileInput}
                    type="file"
                />
                <input
                    accept="video/*"
                    id="input-file"
                    onChange={handleFileInput}
                    type="file"
                />
                <input
                    accept="audio/*"
                    id="input-file"
                    onChange={handleFileInput}
                    type="file"
                />
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
