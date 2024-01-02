import React from 'react'
import pricingicon from './Images/pricingicon.png'
import pricingicon1 from './Images/pricingicon1.png'
import pricingicon2 from './Images/pricingicon2.png'
import { Link } from 'react-router-dom'

const Pricing = () => {
  return (
    <div>
      <div class="bg-[#F9FAFB]  sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl sm:text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Unlock all the details that you need!</h2>
      <p class="mt-6 text-lg leading-8 text-gray-600">Simple, transparent pricing that grows with you. Try any plan free for 30 days.</p>
    </div>
    <div class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 bg-[#F9FAFB] ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
      <div class="p-8 sm:p-10 lg:flex-auto">
      
        <div class="mt-10 flex items-center gap-x-4">

          <div class="h-px flex-auto bg-gray-100"></div>
        </div>
        <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-center text-sm leading-6 text-gray-600 sm:grid-cols-1 sm:gap-6">
                <li className="flex gap-x-3">
                  <img src={pricingicon} alt="Pay just once" className="h-12 w-12 flex-none text-black" />
                  Pay just once and access all information near you!
                </li>
                <li className="flex gap-x-3">
                  <img src={pricingicon1} alt="Grow your business" className="h-12 w-12 flex-none text-black" />
                  Grow your business on the go
                </li>
                <li className="flex gap-x-3">
                  <img src={pricingicon2} alt="Know more about your target market" className="h-12 w-12 flex-none text-black" />
                  Know more about your target market
                </li>
              </ul>
      </div>
      <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
        <div class="rounded-2xl bg-gray-50  text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div class="mx-auto max-w-xs px-8">
            <p class="text-base font-semibold text-gray-600">Basic Plan</p>
            <p class="mt-6 flex items-baseline justify-center gap-x-2">
              <span class="text-5xl font-bold tracking-tight text-gray-900">$10/Month</span>
              <span class="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
            </p>
            <ul role="list" class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
          <li class="flex gap-x-3">
            <svg class="h-6 w-5  text-black " viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            View all Endorsements
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5  text-black " viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            View Policy Information 
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5  text-black " viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Access Market Information
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5  text-black " viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Business Directory
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5  text-black " viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Upcoming Events
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5  text-black " viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            B2B Specials
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5  text-black " viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Policy Voting
          </li>
          </ul>
            <Link to="./membership">
            <a href="#" class="mt-10 block w-full rounded-md bg-[#0E214B] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get access</a>
            </Link>
            <p class="mt-6 text-xs leading-5 text-gray-600">Invoices and receipts available for easy company reimbursement</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className=" min-h-[124px] py-6 md:py-10 items-center ">
            <div className=" min-h-[124px] gap-5 flex flex-col items-center md:py-6 bg-[#ffffff]">
              <h2 className="text-3xl font-semibold">Start your free trial</h2>
              <p className="text-xl min-h-0 font-normal text-center">
              Join the community and stay informed about your neighbourhood.
              </p>
              <div className='flex gap-4 bg-[#F9FAFB]'>
              <button className='p-2 min-w-83 h-10 border border-[#0E214B] bg-white font-semibold rounded-md'>Learn More</button>
             <button className='p-2 min-w-101 h-10 border border-[#0E214B] bg-[#0E214B] text-white font-semibold rounded-md'>Get Started</button>
             </div>
            </div>
          </div>
    </div>
  )
}

export default Pricing
