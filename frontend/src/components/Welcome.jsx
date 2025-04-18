import { motion } from 'framer-motion';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        {/* Welcome Header */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-6"
        >
          Welcome to Horizon Bank!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-300 text-center mb-12"
        >
          Congratulations on verifying your email! Youre now part of our trusted community. Lets embark on a journey to secure your financial future.
        </motion.p>

        {/* About the Bank */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            About Horizon Bank
          </h2>
          <p className="text-gray-300 leading-relaxed">
            At Horizon Bank, we prioritize your financial success with innovative banking solutions, top-tier security, and personalized support. Whether youre saving for a dream, investing for the future, or managing daily expenses, were here to empower you every step of the way.
          </p>
        </motion.section>

        {/* Tier System */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Our Tiered Banking System
          </h2>
          <p className="text-gray-300 mb-8 text-center">
            Grow with us through our exclusive Tier 1-3 system, designed to reward your loyalty and financial engagement with enhanced benefits.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1 */}
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
              transition={{ duration: 0.3 }}
              className="bg-gray-700 rounded-lg p-6 text-center"
            >
              <h3 className="text-xl font-semibold text-indigo-300 mb-3">
                Tier 1: Starter
              </h3>
              <p className="text-gray-300 mb-4">
                Begin your journey with essential banking features, including:
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>Free checking and savings accounts</li>
                <li>Online and mobile banking</li>
                <li>Basic debit card rewards</li>
              </ul>
              <p className="text-gray-400 mt-4 text-sm">
                <strong>Progress:</strong> Maintain a balance of $1,000 or complete 20 transactions monthly to upgrade to Tier 2.
              </p>
            </motion.div>

            {/* Tier 2 */}
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
              transition={{ duration: 0.3 }}
              className="bg-gray-700 rounded-lg p-6 text-center"
            >
              <h3 className="text-xl font-semibold text-indigo-300 mb-3">
                Tier 2: Growth
              </h3>
              <p className="text-gray-300 mb-4">
                Unlock enhanced benefits as you grow, including:
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>Waived ATM fees nationwide</li>
                <li>Higher interest rates on savings</li>
                <li>Exclusive loan discounts</li>
              </ul>
              <p className="text-gray-400 mt-4 text-sm">
                <strong>Progress:</strong> Maintain a balance of $5,000 or secure a loan to advance to Tier 3.
              </p>
            </motion.div>

            {/* Tier 3 */}
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
              transition={{ duration: 0.3 }}
              className="bg-gray-700 rounded-lg p-6 text-center"
            >
              <h3 className="text-xl font-semibold text-indigo-300 mb-3">
                Tier 3: Elite
              </h3>
              <p className="text-gray-300 mb-4">
                Enjoy premium banking privileges, including:
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>Personal financial advisor</li>
                <li>Priority customer support</li>
                <li>Exclusive investment opportunities</li>
              </ul>
              <p className="text-gray-400 mt-4 text-sm">
                <strong>Progress:</strong> Maintain elite status with a balance of $25,000 or active investments.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center mt-12"
        >
          <h3 className="text-xl font-semibold mb-4">
            Start Your Journey Today
          </h3>
          <p className="text-gray-300 mb-6">
            Explore your account, make your first deposit, and begin climbing the tiers to unlock exclusive benefits!
          </p>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: '#4f46e5' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium"
            onClick={() => alert('Redirecting to dashboard...')}
          >
            Go to Dashboard
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;