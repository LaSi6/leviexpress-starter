import React, { useEffect, useState } from 'react';
import mapImage from './img/map.svg';
import './style.css';

const CityOptions = ({ cities }) => {
return(
    <>
    <option value="">Vyberte</option>
    {cities.map((city) => (
    <option key={city.code} value={city.name}>{city.name}</option>))}
    </>
    )}

const DatesOptions = ({ dates }) => {
  return(
      <>
      <option value="">Vyberte</option>
      {dates.map((date) => (
      <option key={date.dateCs} value={date.dateBasic}>{date.dateBasic}</option>))}
      </>
      )}

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  /*const [cities, setCities] = useState ([{ name: 'Praha', code: 'CZ-PRG'},
  {name: 'Brno', code: 'CZ-BRQ'}])*/
  const [cities, setCities] = useState ([])
  const [dates, setDates] = useState ([])

useEffect(() => {
  fetch('https://apps.kodim.cz/daweb/leviexpress/api/cities')
  .then((response) => response.json())
  .then((data) => setCities(data.results))
}, [])

useEffect(() => {
  fetch('https://apps.kodim.cz/daweb/leviexpress/api/dates')
  .then((response) => response.json())
  .then((data) => setDates(data.results))
}, [])

  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log(`Odesílám formulář s cestou ${fromCity} ${toCity} ${date}`)
  };
  
  return(
  <div className="journey-picker container">
    <h2 className="journey-picker__head">Kam chcete jet?</h2>
    <div className="journey-picker__body">
      <form className="journey-picker__form"
      onSubmit={handleSubmit}>
        <label>
          <div className="journey-picker__label">Odkud:</div>
          <select
            value={fromCity}
            onChange={(event) => {
              setFromCity(event.target.value)
            }}>
            <CityOptions cities={cities}/>
          </select>
        </label>
        <label>
          <div className="journey-picker__label">Kam:</div>
          <select
            value={toCity}
            onChange={(event) => {
              setToCity(event.target.value)
            }}>
            <CityOptions cities={cities}/>
          </select>
        </label>
        <label>
          <div className="journey-picker__label">Datum:</div>
          <select
            value={date}
            onChange={(event) => {
              setDate(event.target.value)
            }}>
            <DatesOptions dates={dates}/>
          </select>
        </label>
        <div className="journey-picker__controls">
          <button 
            className="btn" 
            type="submit"
          
          > 
            Vyhledat spoj
          </button>
        </div>
      </form>
      <img className="journey-picker__map" src={mapImage} />
    </div>
  </div>
  )};

