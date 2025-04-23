'use client';

import { FaFileUpload, FaMicrophoneAlt, FaListUl } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/webavy.png')" }}
    >

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 text-[#e84b35]">
          How It Works
        </h2>

        <div className="relative flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center mb-12 md:mb-0 w-full md:w-1/3">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-2xl rotate-45 transform transition-transform group-hover:rotate-0 duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaFileUpload className="text-white text-3xl -rotate-45" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Upload Script</h3>
            <p className="text-gray-300 max-w-xs">
              Submit your script and character descriptions to our AI-powered platform
            </p>
          </div>

          {/* Arrow 1 */}
          <div className="hidden md:block absolute left-1/3 top-1/2 transform -translate-y-1/2">
            <BsArrowRight className="text-4xl text-white/50 animate-pulse" />
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center mb-12 md:mb-0 w-full md:w-1/3">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-2xl rotate-45 transform transition-transform group-hover:rotate-0 duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaMicrophoneAlt className="text-white text-3xl -rotate-45" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Analyze Auditions</h3>
            <p className="text-gray-300 max-w-xs">
              Our AI evaluates performance, accent, and character alignment
            </p>
          </div>

          {/* Arrow 2 */}
          <div className="hidden md:block absolute right-1/3 top-1/2 transform -translate-y-1/2">
            <BsArrowRight className="text-4xl text-white/50 animate-pulse" />
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center w-full md:w-1/3">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-2xl rotate-45 transform transition-transform group-hover:rotate-0 duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaListUl className="text-white text-3xl -rotate-45" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Get Smart Shortlist</h3>
            <p className="text-gray-300 max-w-xs">
              Receive an AI-curated list of the best-matched talent for each role
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
