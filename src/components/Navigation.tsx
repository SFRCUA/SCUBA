import { useState } from 'react';

export default function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="fixed top-4 right-16 z-50">
      <div className="relative">
        <button
          onClick={toggleDropdown}
          onBlur={() => setTimeout(closeDropdown, 150)}
          className="h-10 px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 shadow-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center"
          aria-label="More Research"
          aria-expanded={isDropdownOpen}
        >
          More Research
          <svg
            className={`w-4 h-4 ml-2 inline-block transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-zinc-800 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <div className="py-2">
              <a
                href="https://linxins.net/coact/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors duration-200"
                onClick={closeDropdown}
              >
                <div className="font-medium">CoACT-1</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Computer-using Agents with Coding as Actions
                </div>
              </a>
              <a
                href="https://github.com/Yan98/GTA1"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors duration-200"
                onClick={closeDropdown}
              >
                <div className="font-medium">GTA-1</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  GUI Test-time Scaling Agent
                </div>
              </a>
            <a
                href="https://arxiv.org/abs/2510.01524"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors duration-200"
                onClick={closeDropdown}
            >
                <div className="font-medium">WALT</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Web Agents that Learn Tools
                </div>
            </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
