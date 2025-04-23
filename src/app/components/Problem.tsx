'use client';

import { FaClock, FaBalanceScale, FaMoneyBillWave } from 'react-icons/fa';

export default function Problem() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#e84b35]">
          The Casting Challenge
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Time-Consuming */}
          <div className="group p-6 bg-[#0f2a39] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors duration-300">
                <FaClock className="text-[#e84b35] text-2xl animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#e84b35]">Time-Consuming</h3>
              <p className="text-white">
                Traditional casting processes can take weeks or months, delaying production timelines and increasing costs.
              </p>
            </div>
          </div>

          {/* Subjective */}
          <div className="group p-6 bg-[#0f2a39] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors duration-300">
                <FaBalanceScale className="text-[#e84b35] text-2xl animate-bounce" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#e84b35]">Subjective</h3>
              <p className="text-white">
                Casting decisions often rely on personal biases and limited perspectives, potentially missing perfect matches.
              </p>
            </div>
          </div>

          {/* Costly */}
          <div className="group p-6 bg-[#0f2a39] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors duration-300">
                <FaMoneyBillWave className="text-[#e84b35] text-2xl animate-spin-slow" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#e84b35]">Costly</h3>
              <p className="text-white">
                Extensive casting calls, travel expenses, and time investment lead to significant budget overruns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
