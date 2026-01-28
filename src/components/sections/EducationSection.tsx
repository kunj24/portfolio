'use client'

import React from 'react'
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react'

export default function EducationSection() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-6xl">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Education
        </h2>
        <p className="text-base sm:text-lg text-neutral-400 px-4">
          My academic journey 
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
        {/* Bachelor's Degree */}
        <div className="education-card group bg-neutral-900/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-[#2ee6c1]/30 relative overflow-visible transition-all duration-500 transform md:hover:-translate-y-3 md:hover:scale-[1.02] touch-manipulation" style={{
          boxShadow: '0 0 0 rgba(46, 230, 193, 0)',
          transition: 'all 0.5s ease-in-out'
        }} onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 12px rgba(46, 230, 193, 0.25), 0 0 24px rgba(46, 230, 193, 0.12)';
        }} onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 rgba(46, 230, 193, 0)';
        }}>
          {/* Animated gradient border with moderate glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-[-3px] rounded-2xl" style={{
              background: 'linear-gradient(90deg, #3b82f6, #2ee6c1, #06b6d4, #2ee6c1, #3b82f6)',
              backgroundSize: '200% 200%',
              animation: 'gradient-rotate 3s ease-in-out infinite, border-glow 2s ease-in-out infinite',
              filter: 'blur(6px)'
            }} />
            <div className="absolute inset-[1px] bg-neutral-900 rounded-2xl" />
          </div>
          
          {/* Glowing corner accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#2ee6c1]/20 to-transparent rounded-tr-full opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* colored hover overlay (blue) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative bg-blue-900/40 p-4 rounded-2xl transition-all duration-500 md:group-hover:scale-110 md:group-hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] md:group-hover:bg-blue-900/60 self-center sm:self-start flex-shrink-0 border border-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent rounded-2xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
              <GraduationCap className="relative h-7 w-7 text-blue-400 transition-all duration-500 md:group-hover:scale-110 md:group-hover:rotate-12 md:group-hover:text-blue-300" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-neutral-100 mb-2 leading-tight md:group-hover:text-[#2ee6c1] transition-colors duration-300">
                Bachelor of Computer Science and Engineering
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center text-neutral-300 mb-2 text-sm sm:text-base">
                <div className="flex items-start justify-center sm:justify-start mb-1 sm:mb-0">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-neutral-400" />
                  <span className="font-semibold">Charotar University of Science and Technology</span>
                </div>
                <span className="hidden sm:inline mx-2">•</span>
                <span className="text-center sm:text-left font-medium">Anand, Gujarat</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start text-neutral-300 mb-3 text-sm sm:text-base">
                <Calendar className="h-4 w-4 mr-2 text-neutral-400" />
                <span className="font-medium">2022 - 2027</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <Award className="h-4 w-4 mr-2 text-green-600" />
                <span className="font-semibold text-green-600 text-sm sm:text-base">CGPA: 8.11/10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Higher Secondary */}
        <div className="group bg-neutral-900/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-[#ff4da6]/30 relative overflow-visible transition-all duration-500 transform md:hover:-translate-y-3 md:hover:scale-[1.02] touch-manipulation" style={{
          boxShadow: '0 0 0 rgba(255, 77, 166, 0)',
          transition: 'all 0.5s ease-in-out'
        }} onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 12px rgba(255, 77, 166, 0.25), 0 0 24px rgba(168, 85, 247, 0.12)';
        }} onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 rgba(255, 77, 166, 0)';
        }}>
          {/* Animated gradient border with moderate glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-[-3px] rounded-2xl" style={{
              background: 'linear-gradient(90deg, #a855f7, #ff4da6, #ec4899, #ff4da6, #a855f7)',
              backgroundSize: '200% 200%',
              animation: 'gradient-rotate 3s ease-in-out infinite, border-glow 2s ease-in-out infinite',
              filter: 'blur(6px)'
            }} />
            <div className="absolute inset-[1px] bg-neutral-900 rounded-2xl" />
          </div>
          
          {/* Glowing corner accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#ff4da6]/20 to-transparent rounded-tr-full opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* colored hover overlay (purple) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative bg-purple-900/40 p-4 rounded-2xl transition-all duration-500 md:group-hover:scale-110 md:group-hover:shadow-[0_0_25px_rgba(147,51,234,0.6)] md:group-hover:bg-purple-900/60 self-center sm:self-start flex-shrink-0 border border-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent rounded-2xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
              <GraduationCap className="relative h-7 w-7 text-purple-400 transition-all duration-500 md:group-hover:scale-110 md:group-hover:rotate-12 md:group-hover:text-purple-300" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-neutral-100 mb-2 leading-tight md:group-hover:text-[#ff4da6] transition-colors duration-300">
                Higher Secondary Education
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center text-neutral-300 mb-2 text-sm sm:text-base">
                <div className="flex items-center justify-center sm:justify-start mb-1 sm:mb-0">
                  <MapPin className="h-4 w-4 mr-2 text-neutral-400" />
                  <span className="font-semibold">Javiya Schooling System</span>
                </div>
                <span className="hidden sm:inline mx-2">•</span>
                <span className="text-center sm:text-left font-medium">Junagadh, Gujarat</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start text-neutral-300 mb-3 text-sm sm:text-base">
                <Calendar className="h-4 w-4 mr-2 text-neutral-400" />
                <span className="font-medium">2022 - 2023</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <Award className="h-4 w-4 mr-2 text-green-600" />
                <span className="font-semibold text-green-600 text-sm sm:text-base">Percentage: 91.16%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary School */}
        <div className="group bg-neutral-900/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-orange-500/30 relative overflow-visible transition-all duration-500 transform md:hover:-translate-y-3 md:hover:scale-[1.02] touch-manipulation" style={{
          boxShadow: '0 0 0 rgba(249, 115, 22, 0)',
          transition: 'all 0.5s ease-in-out'
        }} onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 12px rgba(249, 115, 22, 0.25), 0 0 24px rgba(251, 191, 36, 0.12)';
        }} onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 rgba(249, 115, 22, 0)';
        }}>
          {/* Animated gradient border with moderate glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-[-3px] rounded-2xl" style={{
              background: 'linear-gradient(90deg, #f97316, #fbbf24, #fb923c, #fbbf24, #f97316)',
              backgroundSize: '200% 200%',
              animation: 'gradient-rotate 3s ease-in-out infinite, border-glow 2s ease-in-out infinite',
              filter: 'blur(6px)'
            }} />
            <div className="absolute inset-[1px] bg-neutral-900 rounded-2xl" />
          </div>
          
          {/* Glowing corner accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-full opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-yellow-500/20 to-transparent rounded-tr-full opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* colored hover overlay (orange) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-orange-400/10 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative bg-orange-900/40 p-4 rounded-2xl transition-all duration-500 md:group-hover:scale-110 md:group-hover:shadow-[0_0_25px_rgba(234,88,12,0.6)] md:group-hover:bg-orange-900/60 self-center sm:self-start flex-shrink-0 border border-orange-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent rounded-2xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
              <GraduationCap className="relative h-7 w-7 text-orange-400 transition-all duration-500 md:group-hover:scale-110 md:group-hover:rotate-12 md:group-hover:text-orange-300" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-neutral-100 mb-2 leading-tight md:group-hover:text-[#ff4da6] transition-colors duration-300">
                Secondary School Education
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center text-neutral-300 mb-2 text-sm sm:text-base">
                <div className="flex items-center justify-center sm:justify-start mb-1 sm:mb-0">
                  <MapPin className="h-4 w-4 mr-2 text-neutral-400" />
                  <span className="font-semibold">Javiya Schooling System</span>
                </div>
                <span className="hidden sm:inline mx-2">•</span>
                <span className="text-center sm:text-left font-medium">Junagadh, Gujarat</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start text-neutral-300 mb-3 text-sm sm:text-base">
                <Calendar className="h-4 w-4 mr-2 text-neutral-400" />
                <span className="font-medium">2020 - 2021</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <Award className="h-4 w-4 mr-2 text-green-600" />
                <span className="font-semibold text-green-600 text-sm sm:text-base">Percentage: 72.15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
