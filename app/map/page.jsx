'use client'

import Script from 'next/script'
import { useState, useEffect } from 'react'

const items = [
  { type: "Item 1", info: "More info..." },
  { type: "Item 2", info: "More info..." },
  { type: "Item 3", info: "More info..." },
  { type: "Item 4", info: "More info..." }
]


export default function Map() {
  const [details, setDetails] = useState(null)
  const [location, setLocation] = useState({ lat: 44, lng: -88 })
  
  useEffect(() => {
    const urlParams = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    })
    getDetails({
      lat: parseInt(urlParams.lat),
      lng: parseInt(urlParams.lng)
    })
  }, [])

  async function getDetails(loc) {
    setLocation(loc)
    
    const res = await fetch('/api/getDetails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loc })
    })
    const data = await res.json()
    setDetails(data)
  }

  return (
    <div id="map">
      { details && location &&
        <>
          <div id="left">
            <div id="g-map"></div>
            <div id="chat">
              <div id="convo">
                <p>Hi there, I can answer any questions you have!</p>
              </div>
              <form>
                <input type="text" placeholder="Your Question" />
                <button type="submit">Ask</button>
              </form>
            </div>
          </div>
          <div id="search-loc">
            <form>
              <input type="text" placeholder="Search Different Location" />
              <button type="submit">Go</button>
            </form>
          </div>
          <div id="sidebar">
            <h2>What to Grow</h2>
            <div id="items">
              { items.map(item => {
                return (
                  <div className="item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M321.89 171.42C233 114 141 155.22 56 65.22c-19.8-21-8.3 235.5 98.1 332.7 77.79 71 197.9 63.08 238.4-5.92s18.28-163.17-70.61-220.58zM173 253c86 81 175 129 292 147" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
                    <div className="right">
                      <h3>{item.type}</h3>
                      <p>{item.info}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <Script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbJoQnM07KZu2NiFwba16dy_3SfR1hFa8&libraries=geometry"
            onReady={() => {
              const map = new google.maps.Map(document.querySelector("#g-map"), {
                zoom: 14,
                // maxZoom: 16,
                // minZoom: 6,
                center: location,
                disableDefaultUI: true,
                scrollwheel: true,
                gestureHandling: "greedy",
                zoomControl: false,
                clickableIcons: false,
                mapTypeId: "terrain",
                styles: [
                  { elementType: "geometry", stylers: [{ color: "#092b00" }] },
                  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                  {
                    featureType: "administrative.locality",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                  },
                  {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                  },
                  {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [{ color: "#263c3f" }],
                  },
                  {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#6b9a76" }],
                  },
                  {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{ color: "#38414e" }],
                  },
                  {
                    featureType: "road",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#212a37" }],
                  },
                  {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#9ca5b3" }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [{ color: "#746855" }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#1f2835" }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#f3d19c" }],
                  },
                  {
                    featureType: "transit",
                    elementType: "geometry",
                    stylers: [{ color: "#2f3948" }],
                  },
                  {
                    featureType: "transit.station",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                  },
                  {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#17263c" }],
                  },
                  {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#515c6d" }],
                  },
                  {
                    featureType: "water",
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#17263c" }],
                  },
                ],
              })

              const marker = new google.maps.Marker({ map, position: location })

              setTimeout(() => {
                // map.panTo(loc)
              }, 500) // Just for effect.
            }}
            />
        </>
      }
    </div>
  )
}