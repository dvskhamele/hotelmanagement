'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const userRole = typeof window !== 'undefined' ? 
    JSON.parse(localStorage.getItem('currentUser') || '{}').role : 
    null

  // Define navigation based on user role
  let navigation = []
  
  switch(userRole) {
    case 'ONBOARDING_AGENT':
      navigation = [
        { name: 'Telecaller Dashboard', href: '/telecaller-dashboard' },
        { name: 'My Prospects', href: '/prospects' },
        { name: 'Client Search', href: '/clients' },
      ]
      break
    case 'RESEARCH_ANALYST':
      navigation = [
        { name: 'Advisory Delivery', href: '/advisory-delivery' },
        { name: 'My Clients', href: '/clients' },
        { name: 'Market Research', href: '/research' },
      ]
      break
    case 'COMPLIANCE_OFFICER':
      navigation = [
        { name: 'Compliance Dashboard', href: '/dashboard' },
        { name: 'Audit Logs', href: '/compliance-reports' },
        { name: 'Client Records', href: '/clients' },
      ]
      break
    case 'ADMIN':
      navigation = [
        { name: 'Admin Dashboard', href: '/dashboard' },
        { name: 'User Management', href: '/admin/users' },
        { name: 'Compliance Reports', href: '/compliance-reports' },
        { name: 'Templates', href: '/admin/templates' },
      ]
      break
    default:
      navigation = [
        { name: 'AdvisorX Dashboard', href: '/dashboard' },
        { name: 'Clients', href: '/clients' },
        { name: 'KYC Requests', href: '/requests' },
      ]
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-blue-600">AdvisorX</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${pathname === item.href
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}