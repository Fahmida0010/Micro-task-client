

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        
        <div className="mb-10 text-center">
          <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs uppercase font-extrabold px-3 py-1 rounded-full tracking-wider">
            Legal & Security
          </span>
          <h1 className="text-4xl font-extrabold mt-4 mb-3 text-gray-900 dark:text-white">Privacy Policy</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: October 2026</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100 dark:border-gray-800 space-y-8 text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300">
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Information We Collect</h2>
            <p>
              When you register or interact with MicroTask, we collect personal information such as your name, email address, profile photo, and role preference (Worker or Buyer). We also store transaction histories, coin balances, and task submissions to ensure seamless platform operations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. How We Use Your Information</h2>
            <p>
              The information we collect is utilized to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Manage and authenticate your user account securely.</li>
              <li>Process coin transfers, purchases via Stripe, and withdrawals.</li>
              <li>Provide real-time notifications regarding task status and approvals.</li>
              <li>Maintain platform security and prevent fraudulent activities.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Data Security & Protection</h2>
            <p>
              We implement industry-standard security protocols, including JWT-based authentication and encrypted password storage, to protect your personal data from unauthorized access, alteration, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Cookies and Tracking</h2>
            <p>
              Our website uses local storage and basic cookies to remember your theme preferences (Dark/Light mode) and keep your login session active for a better user experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. Contact Us</h2>
            <p>
              If you have any questions or concerns regarding our Privacy Policy, feel free to reach out to our support team through our contact page.
            </p>
          </section>

        </div>

      </main>

    
    </div>
  );
};

export default PrivacyPolicy;