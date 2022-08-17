import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import EventBox from '../components/EventBox';
import Hero from '../components/Hero';
import "../css/App.css"
import { Link } from 'react-router-dom';
// import eventData from '../MockEventData.json'
import useContract from '../hooks/useContract';
import FactoryABI from '../FactoryABI.json';
import EventContractABI from '../EventContractABI.json';
import { eventFactoryAddress } from '../eventFactoryContractAddress';
import { ethers } from 'ethers';

export interface HomeEventProp {
    contractAddress: string;
    name: string;
    date: string;
    location: string;
    description?: string;
    price:string;
    ownerAddress:string;
    imageUrl: string;
  }


const Home = () => {
  const [eventData, setEventData] = useState<HomeEventProp[]|null>([{
    contractAddress: '',
    name: '',
    date: '',
    location: '',
    description: '',
    price:'',
    ownerAddress: '',
    imageUrl: '',
  }])

const factoryContract = useContract(eventFactoryAddress, FactoryABI.abi);
const allEvents = [];

async function getAllEventAddresses(){
    const numEvents = await factoryContract.getNumOfEvents();
    for (let i = 0; i < numEvents; i++) {
      var address = await factoryContract.eventAddresses(i);
      allEvents.push(address);
  }
}

async function getAllImages(listOfAddresses: Array<string>){
    for (let i = 0; i < listOfAddresses.length;i++){
        var address = listOfAddresses[i];
        
    }
}

  useEffect(() => {
    const fetchData = async () => {
        // iterate through eventAddresses contracts in Factory contract
        getAllEventAddresses();
        // get eventImageURL for each event contract

        // fetch each one
        // store locally

      const data = await fetch(`http://localhost:4000/events`, {
          method: "GET",
      })
      const json = await data.json();
      setEventData(json.events)
    }
    fetchData().catch(err => console.log(err));
  },[])

 

  return (
    <div>
      <header>
        <Header />
      </header>
      <div>
        <Hero />
      </div>
      <div className="mx-auto px-[5%] pt-8">
          <div>
            <h2 className="my-8 text-2xl xl:ml-8 font-bold">Check Out Popular Events</h2>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-5 mx-5 sm:mx-16">
            {
              eventData?.map(({contractAddress, name, date,  location, price, ownerAddress, imageUrl}) => <Link to={`/events/:${contractAddress}`} key={contractAddress}><EventBox key={contractAddress} eventName={name} eventDate={date} location={location} price={price} organiser={ownerAddress} contractAddress={contractAddress} file={imageUrl}/></Link>)
            }
          </div>
      </div>
    </div>  
  )
}

export default Home