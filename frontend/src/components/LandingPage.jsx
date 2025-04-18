import { useState } from 'react';
import { 
  ArrowRight, 
  CreditCard, 
  Shield, 
  Clock, 
  BarChart3, 
  Menu, 
  X,
  Check,
  DollarSign,
  Users,
  Globe,
  Zap
} from 'lucide-react';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-blue-600 text-2xl font-bold tracking-tight">Arigo<span className="text-blue-800">Pay</span></span>
              </div>
              <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                <a
                  href="#home"
                  className="text-blue-600 border-blue-600 border-b-2 px-1 pt-1 text-sm font-medium"
                >
                  Home
                </a>
                <a
                  href="#features"
                  className="text-gray-500 hover:text-blue-600 px-1 pt-1 text-sm font-medium transition-colors duration-200"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-gray-500 hover:text-blue-600 px-1 pt-1 text-sm font-medium transition-colors duration-200"
                >
                  Pricing
                </a>
                <a
                  href="#about"
                  className="text-gray-500 hover:text-blue-600 px-1 pt-1 text-sm font-medium transition-colors duration-200"
                >
                  About
                </a>
              </div>
            </div>
            <div className="hidden sm:flex sm:items-center sm:space-x-6">
              <a href="/login" className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors duration-200">
                Log in
              </a>
              <a
                href="/signup"
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-md"
              >
                Sign up
              </a>
            </div>
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-500 hover:text-blue-600 focus:outline-none transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-white shadow-lg transition-all duration-300">
            <div className="pt-2 pb-3 space-y-1">
              <a
                href="#home"
                className="bg-blue-50 text-blue-600 block pl-3 pr-4 py-3 text-base font-medium"
              >
                Home
              </a>
              <a
                href="#features"
                className="text-gray-500 hover:bg-gray-50 block pl-3 pr-4 py-3 text-base font-medium transition-colors duration-200"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-500 hover:bg-gray-50 block pl-3 pr-4 py-3 text-base font-medium transition-colors duration-200"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-gray-500 hover:bg-gray-50 block pl-3 pr-4 py-3 text-base font-medium transition-colors duration-200"
              >
                About
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 px-4">
              <div className="flex flex-col space-y-3">
                <a
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 text-base font-medium text-center py-2 transition-colors duration-200"
                >
                  Log in
                </a>
                <a
                  href="/signup"
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 rounded-lg text-base font-medium hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-md text-center"
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div id="home" className="pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                <Zap className="w-4 h-4 mr-2" /> New: Instant money transfers
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Modern Banking <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Made Simple</span>
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-lg">
                Arigo Pay combines cutting-edge technology with personalized service to give you complete control over your finances.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="/signup"
                  className="flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg"
                >
                  Get Started Free <ArrowRight size={20} className="ml-2" />
                </a>
                <a
                  href="#demo"
                  className="flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors duration-200"
                >
                  Watch Demo
                </a>
              </div>
              <div className="mt-8 flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <img className="w-10 h-10 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/12.jpg" alt="User" />
                  <img className="w-10 h-10 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                  <img className="w-10 h-10 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/45.jpg" alt="User" />
                </div>
                <div className="text-sm text-gray-600">
                  <p>Trusted by <span className="font-semibold">500K+</span> users</p>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Arigo Pay App Interface"
                  className="w-full rounded-xl shadow-2xl border border-gray-100"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 hidden sm:block">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <DollarSign className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-gray-500">Daily Savings</p>
                      <p className="font-bold text-gray-900">+$1,250</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Cloud */}
      <div className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wider mb-6">
            Trusted by leading companies
          </p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 items-center">
            {['TechCorp', 'Finova', 'GlobalBank', 'SwiftPay', 'BlueEdge'].map((company) => (
              <div key={company} className="col-span-1 flex justify-center opacity-70 hover:opacity-100 transition-opacity duration-200">
                <span className="text-xl font-bold text-gray-700">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Banking features designed for you
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to manage your money effectively, all in one place.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <CreditCard className="h-6 w-6 text-blue-600" />,
                title: "Virtual Cards",
                description: "Generate unlimited virtual cards for secure online transactions with customizable limits.",
                color: "bg-blue-100"
              },
              {
                icon: <Shield className="h-6 w-6 text-green-600" />,
                title: "Military-Grade Security",
                description: "Your money is protected with bank-level encryption and fraud monitoring.",
                color: "bg-green-100"
              },
              {
                icon: <Clock className="h-6 w-6 text-purple-600" />,
                title: "24/7 Access",
                description: "Bank whenever you want with our always-available mobile app and website.",
                color: "bg-purple-100"
              },
              {
                icon: <BarChart3 className="h-6 w-6 text-orange-600" />,
                title: "Smart Analytics",
                description: "Get personalized insights to help you save more and spend smarter.",
                color: "bg-orange-100"
              },
              {
                icon: <Globe className="h-6 w-6 text-red-600" />,
                title: "Global Transfers",
                description: "Send money worldwide with low fees and competitive exchange rates.",
                color: "bg-red-100"
              },
              {
                icon: <Users className="h-6 w-6 text-indigo-600" />,
                title: "Family Accounts",
                description: "Easily manage shared finances with your loved ones.",
                color: "bg-indigo-100"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: "500K+", label: "Active Users" },
              { number: "$1.2B", label: "Processed Monthly" },
              { number: "99.9%", label: "Uptime Reliability" }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <p className="text-4xl sm:text-5xl font-bold text-white">{stat.number}</p>
                <p className="mt-2 text-lg text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Get started in minutes
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Joining Arigo Pay is quick, easy, and completely digital.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Create your account",
                description: "Sign up with your email and basic information in just a few minutes."
              },
              {
                step: "2",
                title: "Verify your identity",
                description: "Quickly verify your identity using your government-issued ID."
              },
              {
                step: "3",
                title: "Start banking",
                description: "Add money and begin using all of Arigo Pay's features immediately."
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-4 top-0 h-full w-0.5 bg-gray-200 sm:hidden"></div>
                <div className="flex flex-col items-center sm:items-start">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-lg">
                    {step.step}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-gray-600 text-center sm:text-left">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                What our customers say
              </h2>
              <div className="mt-8">
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg text-gray-600 italic">
                    Arigo Pay has completely transformed how I manage my business finances. The instant notifications and spending analytics have saved me hours each month.
                  </blockquote>
                  <div className="mt-6 flex items-center">
                    <img className="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/women/32.jpg" alt="Sarah Johnson" />
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">Small Business Owner</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-1/2 lg:pl-12">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
                <div className="mt-6 space-y-6">
                  {[
                    {
                      question: "Is my money safe with Arigo Pay?",
                      answer: "Yes, we use bank-level security and your funds are FDIC insured up to $250,000."
                    },
                    {
                      question: "Are there any hidden fees?",
                      answer: "No, we're transparent about all fees. Most services are completely free."
                    },
                    {
                      question: "How quickly can I access my money?",
                      answer: "Transfers between Arigo Pay users are instant. External transfers typically take 1-2 business days."
                    }
                  ].map((faq, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-gray-900">{faq.question}</h4>
                      <p className="mt-2 text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to revolutionize your banking?
          </h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Join thousands of customers who are already enjoying smarter banking with Arigo Pay.
          </p>
          <div className="mt-8">
            <a
              href="#signup"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 shadow-lg transition-all duration-200"
            >
              Get Started Free <ArrowRight size={20} className="ml-2" />
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <Check className="h-5 w-5 text-blue-200" />
            <span className="text-sm text-blue-100">No credit check</span>
            <Check className="h-5 w-5 text-blue-200" />
            <span className="text-sm text-blue-100">No minimum balance</span>
            <Check className="h-5 w-5 text-blue-200" />
            <span className="text-sm text-blue-100">No monthly fees</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold">Arigo<span className="text-blue-400">Pay</span></h3>
              <p className="mt-4 text-gray-400">
                Modern banking solutions for individuals and businesses.
              </p>
              <div className="mt-6 flex space-x-6">
                {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    <span className="sr-only">{social}</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Product</h3>
              <ul className="mt-4 space-y-3">
                {['Personal', 'Business', 'Features', 'Pricing'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-3">
                {['About', 'Careers', 'Press', 'Blog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-3">
                {['Privacy', 'Terms', 'Cookie Policy', 'GDPR'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Arigo Pay. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;