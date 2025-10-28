'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true)

  const pricingPlans = [
    {
      name: 'Starter',
      description: 'Perfect for small hotels getting started',
      monthlyPrice: 99,
      annualPrice: 990, // 17% discount
      priceDescription: 'per month',
      features: [
        'Up to 25 rooms',
        'Basic request management',
        'Room status tracking',
        'Email support',
        'Mobile app access',
        'Basic reporting'
      ],
      cta: 'Get Started',
      popular: false,
      color: 'from-slate-500 to-slate-600'
    },
    {
      name: 'Professional',
      description: 'Ideal for growing hotels with multiple departments',
      monthlyPrice: 249,
      annualPrice: 2490, // 17% discount
      priceDescription: 'per month',
      features: [
        'Up to 100 rooms',
        'Advanced request management',
        'Department coordination',
        'Staff performance tracking',
        'Mobile app access',
        'Advanced analytics',
        'Priority support',
        'Custom integrations (1)',
        'Scheduled reports'
      ],
      cta: 'Try Free for 14 Days',
      popular: true,
      color: 'from-teal-500 to-teal-600'
    },
    {
      name: 'Enterprise',
      description: 'Complete solution for large hotel chains',
      monthlyPrice: 'Custom',
      annualPrice: 'Custom',
      priceDescription: '',
      features: [
        'Unlimited rooms',
        'Full request management suite',
        'Multi-property management',
        'Advanced staff analytics',
        'Mobile app access',
        'Executive dashboards',
        '24/7 dedicated support',
        'Unlimited custom integrations',
        'White-label options',
        'Personal onboarding',
        'Dedicated account manager'
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'from-emerald-500 to-emerald-600'
    }
  ]

  const getPrice = (plan: any) => {
    if (plan.name === 'Enterprise') {
      return 'Custom'
    }
    return `₹${plan.price}/${plan.period}`
  }

  const getSavings = (plan: any) => {
    if (plan.name === 'Enterprise') {
      return ''
    }
    return `Save ${plan.savings}%`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-slate-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            HotelOps
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-slate-600 hover:text-teal-600 font-medium">
              Login
            </Link>
            <Link 
              href="/signup" 
              className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="py-20 bg-gradient-to-r from-teal-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-teal-100">
            Choose the perfect plan for your hotel. All plans include a 14-day free trial.
          </p>
          
          {/* Billing Cycle Toggle */}
          <div className="mt-10 flex justify-center">
            <div className="inline-flex rounded-lg border border-teal-300 p-1 bg-teal-500 bg-opacity-20">
              <button
                className={`px-6 py-2 rounded-md text-sm font-medium ${
                  !isAnnual 
                    ? 'bg-white text-teal-600 shadow' 
                    : 'text-teal-100 hover:text-white'
                }`}
                onClick={() => setIsAnnual(false)}
              >
                Monthly Billing
              </button>
              <button
                className={`px-6 py-2 rounded-md text-sm font-medium ${
                  isAnnual 
                    ? 'bg-white text-teal-600 shadow' 
                    : 'text-teal-100 hover:text-white'
                }`}
                onClick={() => setIsAnnual(true)}
              >
                Annual Billing <span className="text-amber-300">(Save up to 17%)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="py-20 -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-2xl shadow-xl overflow-hidden ${
                  plan.popular 
                    ? 'ring-4 ring-teal-500 ring-opacity-50 transform scale-105 z-10' 
                    : 'bg-white'
                }`}
              >
                {plan.popular && (
                  <div className={`bg-gradient-to-r ${plan.color} py-2 text-center`}>
                    <span className="text-sm font-bold text-white">MOST POPULAR</span>
                  </div>
                )}
                <div className="p-8">
                  <h3 className={`text-2xl font-bold ${
                    plan.popular ? 'text-teal-600' : 'text-slate-800'
                  }`}>
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-slate-600">{plan.description}</p>
                  
                  <div className="mt-6">
                    <span className="text-4xl font-extrabold text-slate-900">
                      {getPrice(plan) === 'Custom' ? 'Custom' : `₹${getPrice(plan)}`}
                    </span>
                    <span className="text-lg font-medium text-slate-600">
                      {plan.priceDescription} {getPrice(plan) !== 'Custom' && '/user'}
                    </span>
                    {getSavings(plan) && (
                      <span className="ml-2 text-sm font-medium text-emerald-600">
                        {getSavings(plan)}
                      </span>
                    )}
                  </div>
                  
                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg className="h-5 w-5 text-emerald-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-3 text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                    className={`mt-10 w-full py-3 px-6 rounded-lg font-bold text-white shadow-md transition duration-300 flex items-center justify-center ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.color} hover:from-teal-600 hover:to-teal-700`
                        : 'bg-slate-800 hover:bg-slate-900'
                    }`}
                  >
                    {plan.cta}
                    {plan.name !== 'Enterprise' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Detailed Feature Comparison
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
              Everything you need to know about each plan
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-slate-100 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-6 py-3 bg-slate-100 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Starter
                  </th>
                  <th className="px-6 py-3 bg-slate-100 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Professional
                  </th>
                  <th className="px-6 py-3 bg-slate-100 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {[
                  'Number of Rooms',
                  'Basic Request Management',
                  'Room Status Tracking',
                  'Mobile App Access',
                  'Email Support',
                  'Advanced Request Management',
                  'Department Coordination',
                  'Staff Performance Tracking',
                  'Advanced Analytics',
                  'Priority Support',
                  'Custom Integrations',
                  'Scheduled Reports',
                  'Multi-Property Management',
                  'Executive Dashboards',
                  '24/7 Dedicated Support',
                  'White-label Options',
                  'Personal Onboarding',
                  'Dedicated Account Manager'
                ].map((feature, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {feature}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {index < 5 ? (
                        <svg className="h-5 w-5 text-emerald-500 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {index < 10 ? (
                        <svg className="h-5 w-5 text-emerald-500 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="h-5 w-5 text-emerald-500 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
              Everything you need to know about our pricing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'Can I change plans later?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you\'ll only pay the difference for the remainder of your billing cycle.'
              },
              {
                question: 'Is there a setup fee?',
                answer: 'No, there are no setup fees. All plans include free onboarding and setup assistance.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, bank transfers, and PayPal. Enterprise customers can also pay via invoice.'
              },
              {
                question: 'Can I cancel anytime?',
                answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your current billing period.'
              },
              {
                question: 'Do you offer discounts for non-profits?',
                answer: 'Yes, we offer special pricing for non-profit organizations. Please contact our sales team for more information.'
              },
              {
                question: 'What happens after my free trial?',
                answer: 'After your 14-day free trial, you\'ll be automatically enrolled in the plan you chose. You can cancel anytime before the trial ends to avoid charges.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-teal-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Transform Your Hotel Operations?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-teal-100">
            Join thousands of hotels worldwide using HotelOps to deliver exceptional guest experiences.
          </p>
          
          <div className="mt-10 max-w-md mx-auto">
            <form className="sm:flex">
              <div className="min-w-0 flex-1">
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="block w-full px-5 py-3 text-base text-slate-900 placeholder-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  className="block w-full px-5 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300"
                >
                  Get Started
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-teal-100">
              Start your free 14-day trial. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}