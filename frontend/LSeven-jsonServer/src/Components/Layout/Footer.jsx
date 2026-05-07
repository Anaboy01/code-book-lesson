export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-t-0 bg-white dark:bg-gray-900 mt-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">About</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Connect</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">LinkedIn</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 pt-8 text-center dark:text-gray-400">
          <p>&copy; 2024 CodeBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
