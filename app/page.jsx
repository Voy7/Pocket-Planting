'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()

  const [loc, setLoc] = useState(true)

  async function enterLocation(event) {
    event.preventDefault()
    const res = await fetch('/api/getLocation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loc: event.target[0].value })
    })
    const data = await res.json()
    setLoc(data)

    if (data) {
      const welcome = document.querySelector('#welcome')
      welcome.classList.add('welcome-fade-out')
      const wrapper = document.querySelector('#wrapper')
      wrapper.classList.add('welcome-slide')

      // maybe add delay
      router.push(`/map?lat=${data.lat}&lng=${data.lng}`)
    }
  }

  return (
    <>
      <div id="welcome" className="welcome">
        <div id="wrapper" className="welcome-wrapper">
          <h1>Welcome to HuskieHack</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates dolorem modi voluptatum recusandae architecto quod, sunt fugiat magnam est sapiente!</p>
          <form onSubmit={enterLocation}>
            <input type="text" placeholder="Enter Your Zip or Address" />
            <button type="submit">Go</button>
          </form>
        </div>
      </div>
      { !loc &&
        // error msg here
        console.log(loc)
      }
    </>
  )
}
