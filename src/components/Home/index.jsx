import React from 'react';
import { useState } from 'react';
import { JourneyPicker } from '../JourneyPicker';
import { JourneyDetail } from '../JourneyDetail';


export const Home = () => {
  const [journey, setJourney] = useState(null)
  const handleJourneyChange = (journey) => {
    setJourney(journey)
  }
  return(
  <main>
    <JourneyPicker onJourneyChange={handleJourneyChange}/>
    {journey===null ? null : <section>Nalezeno spojení s id {journey.journeyId} <JourneyDetail journey={journey}/> </section>}
  </main>
  )};
