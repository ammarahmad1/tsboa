import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const BuyMembership = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

    const faqsData = [
        {
          question: 'Is there a free trial available?',
          answer: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
        },
        // Add more FAQ items as needed
        {
          question: 'How do I cancel my subscription?',
          answer: 'You can cancel your subscription at any time by logging into your account and navigating to the subscription settings. Follow the prompts to cancel your subscription.',
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept major credit cards, including Visa, MasterCard, and American Express. Additionally, we support payments through PayPal.',
        },
        {
          question: 'Can I upgrade or downgrade my plan?',
          answer: 'Yes, you can upgrade or downgrade your plan at any time. Simply go to your account settings and choose the plan that best suits your needs.',
        },
        // Add more FAQ items as needed
      ];
    
      const [openIndex, setOpenIndex] = useState(null);
    
      const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
      };
  return (
    <div className='py-8'>
      <div className='max-w-[1512px] min-h-[306px] bg-[#F2F4F7] flex items-center justify-center px-0 gap-12'>
        <h1 className='text-4xl font-semibold font-inter text-center leading-10 tracking-tighter'>Plans that fit your scale </h1>
      </div>
      <div className="bg-white  ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 justify-center lg:flex lg:max-w-none">
            {/* Event Card 1 */}
            <div className="-mt-2 p-2 lg:mt-0 lg:w-1/2 lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">Pay once, own it forever</p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">$10</span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                  </p>
                  {/* List Items */}
                  <div className="flex justify-center mt-6">
                    <ul className="flex gap-x-6 text-[#475467]">
                      <li className="flex gap-x-3 items-center">
                        <svg className="h-6 w-5 flex-none text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        View all Endorsements
                      </li>
                      <li className="flex gap-x-3 items-center">
                        <svg className="h-6 w-5 flex-none text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        Member resources
                      </li>
                    </ul>
                  </div>
                  <a href="#" className="mt-6 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get access</a>
                  <p className="mt-6 text-xs leading-5 text-gray-600">Invoices and receipts available for easy company reimbursement</p>
                </div>
              </div>
            </div>
            {/* Event Card 2 */}
            <div className="-mt-2 p-2 lg:mt-0 lg:w-1/2 lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">Billed annually</p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">$20</span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                  </p>
                  {/* List Items */}
                  <div className="flex justify-center mt-6 ">
                    <ul className="flex gap-x-6 text-[#475467]">
                      <li className="flex gap-x-3 items-center">
                        <svg className="h-6 w-5 flex-none text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        Member resources
                      </li>
                      <li className="flex gap-x-3 items-center">
                        <svg className="h-6 w-5 flex-none text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        Member resources
                      </li>
                    </ul>
                  </div>
                  <a href="#" className="mt-6 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get access</a>
                  <p className="mt-6 text-xs leading-5 text-gray-600">Invoices and receipts available for easy company reimbursement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-20'>
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <div>
        {faqsData.map((faq, index) => (
          <div key={index} className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <button onClick={() => toggleAnswer(index)} className="focus:outline-none">
                {openIndex === index ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </button>
            </div>
            {openIndex === index && <p className="text-gray-700 mt-2">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default BuyMembership;
