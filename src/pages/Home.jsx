import React from 'react'
import Hero from '../components/home/Hero'
import Pricing from '../components/home/Pricing'
import Statistics from '../components/home/Statistics'
import Team from '../components/home/Team'
import BackEnd from '../components/BackEnd'

export default function () {
  return (
    <div>
      <Hero/>
      <Pricing/>
      <Statistics/>
      <Team/>
      <BackEnd/>
    </div>
  )
}
