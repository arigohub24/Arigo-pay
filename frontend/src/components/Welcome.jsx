import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-blue-900 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto w-full"
      >
        {/* Welcome Header */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-4 sm:mb-6 text-blue-800"
        >
          Welcome to Horizon Bank!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-base sm:text-lg lg:text-xl text-blue-700 text-center mb-8 sm:mb-12 px-2"
        >
          Congratulations on verifying your email! Youre now part of our trusted community. Lets embark on a journey to secure your financial future.
        </motion.p>

        {/* About the Bank */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-center text-blue-800">
            About Horizon Bank
          </h2>
          <p className="text-blue-700 text-sm sm:text-base leading-relaxed px-2 sm:px-4">
            At Horizon Bank, we prioritize your financial success with innovative banking solutions, top-tier security, and personalized support. Whether youre saving for a dream, investing for the future, or managing daily expenses, were here to empower you every step of the way.
          </p>
        </motion.section>

        {/* Tier System */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-blue-800">
            Our Transfer Limit Tier System
          </h2>
          <p className="text-blue-700 text-sm sm:text-base mb-6 sm:mb-8 text-center px-2 sm:px-4">
            Enjoy different transfer limits based on your tier level. Each tier has specific requirements and offers enhanced benefits.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Tier 1 */}
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 text-center"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2 sm:mb-3">
                Tier 1: Standard
              </h3>
              <p className="text-blue-700 text-sm sm:text-base mb-3 sm:mb-4">
                Begin with essential banking features:
              </p>
              <ul className="text-blue-600 text-xs sm:text-sm space-y-1 sm:space-y-2">
                <li><strong>Transfer Limit:</strong> Up to $200,000</li>
                <li>Online and mobile banking</li>
                <li>Basic account management</li>
              </ul>
              <p className="text-blue-600 mt-3 sm:mt-4 text-xs sm:text-sm font-medium">
                <strong>Requirements:</strong> Minimum balance of $5,000 or regular monthly deposits of $1,000
              </p>
            </motion.div>

            {/* Tier 2 */}
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
              className="bg-blue-100 border border-blue-300 rounded-lg p-4 sm:p-6 text-center"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2 sm:mb-3">
                Tier 2: Premium
              </h3>
              <p className="text-blue-700 text-sm sm:text-base mb-3 sm:mb-4">
                Unlock enhanced transfer capabilities:
              </p>
              <ul className="text-blue-600 text-xs sm:text-sm space-y-1 sm:space-y-2">
                <li><strong>Transfer Limit:</strong> $200,000 - $500,000</li>
                <li>Priority customer support</li>
                <li>Reduced transaction fees</li>
              </ul>
              <p className="text-blue-600 mt-3 sm:mt-4 text-xs sm:text-sm font-medium">
                <strong>Requirements:</strong> Minimum balance of $50,000 or combined deposits/investments of $100,000
              </p>
            </motion.div>

            {/* Tier 3 */}
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
              className="bg-blue-200 border border-blue-400 rounded-lg p-4 sm:p-6 text-center"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2 sm:mb-3">
                Tier 3: Elite
              </h3>
              <p className="text-blue-700 text-sm sm:text-base mb-3 sm:mb-4">
                Enjoy premium banking privileges:
              </p>
              <ul className="text-blue-600 text-xs sm:text-sm space-y-1 sm:space-y-2">
                <li><strong>Transfer Limit:</strong> Above $500,000</li>
                <li>Personal financial advisor</li>
                <li>Exclusive investment opportunities</li>
              </ul>
              <p className="text-blue-600 mt-3 sm:mt-4 text-xs sm:text-sm font-medium">
                <strong>Requirements:</strong> Minimum balance of $250,000 or total relationship value of $500,000+
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center mt-8 sm:mt-12"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-800">
            Start Your Journey Today
          </h3>
          <p className="text-blue-700 text-sm sm:text-base mb-4 sm:mb-6 px-2 sm:px-4">
            Explore your account, make your first deposit, and begin climbing the tiers to unlock higher transfer limits and exclusive benefits!
          </p>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#1e40af" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-sm sm:text-base shadow-md"
            onClick={() => navigate("/")}
          >
            Go to Dashboard
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;