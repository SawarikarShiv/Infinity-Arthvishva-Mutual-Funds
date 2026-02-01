import { useTranslation } from 'react-i18next'

function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gradient">
            {t('welcome')} to Infinity Arthvishva
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your trusted partner in mutual fund investments
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-hover">
            <h3 className="text-xl font-semibold mb-4">For Investors</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track your portfolio, explore funds, and plan your financial goals.
            </p>
          </div>
          <div className="card-hover">
            <h3 className="text-xl font-semibold mb-4">For Advisors</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Manage clients, provide recommendations, and grow your business.
            </p>
          </div>
          <div className="card-hover">
            <h3 className="text-xl font-semibold mb-4">Secure & Reliable</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Bank-level security with real-time updates and comprehensive reporting.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage