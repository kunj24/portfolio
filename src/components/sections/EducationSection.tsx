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
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 px-4">
          My academic journey 
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
        {/* Bachelor's Degree */}
        <div className="education-card group bg-white dark:bg-neutral-900 rounded-lg p-5 sm:p-6 shadow-lg border border-neutral-200 dark:border-neutral-800 relative overflow-hidden transition-all duration-300 transform md:hover:-translate-y-2 md:hover:shadow-xl md:hover:shadow-blue-600/25 md:hover:drop-shadow-[0_0_12px_rgba(37,99,235,0.7)] touch-manipulation">
          {/* colored hover overlay (blue) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blue-500/6 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full transition-transform duration-300 md:group-hover:scale-110 md:group-hover:shadow-2xl md:group-hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.5)] self-center sm:self-start flex-shrink-0">
              <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400 transition-transform duration-300 md:group-hover:scale-110" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 leading-tight">
                Bachelor of Computer Science and Engineering
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center text-neutral-700 dark:text-neutral-300 mb-2 text-sm sm:text-base">
                <div className="flex items-start justify-center sm:justify-start mb-1 sm:mb-0">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-neutral-500 dark:text-neutral-400" />
                  <span className="font-semibold">Charotar University of Science and Technology</span>
                </div>
                <span className="hidden sm:inline mx-2">•</span>
                <span className="text-center sm:text-left font-medium">Anand, Gujarat</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start text-neutral-700 dark:text-neutral-300 mb-3 text-sm sm:text-base">
                <Calendar className="h-4 w-4 mr-2 text-neutral-500 dark:text-neutral-400" />
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
        <div className="group bg-white dark:bg-neutral-900 rounded-lg p-5 sm:p-6 shadow-lg border border-neutral-200 dark:border-neutral-800 relative overflow-hidden transition-all duration-300 transform md:hover:-translate-y-2 md:hover:shadow-xl md:hover:shadow-purple-600/25 md:hover:drop-shadow-[0_0_12px_rgba(147,51,234,0.7)] touch-manipulation">
          {/* colored hover overlay (purple) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-purple-500/6 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full transition-transform duration-300 md:group-hover:scale-110 md:group-hover:shadow-2xl md:group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.5)] self-center sm:self-start flex-shrink-0">
              <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400 transition-transform duration-300 md:group-hover:scale-110" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 leading-tight">
                Higher Secondary Education
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center text-neutral-700 dark:text-neutral-300 mb-2 text-sm sm:text-base">
                <div className="flex items-center justify-center sm:justify-start mb-1 sm:mb-0">
                  <MapPin className="h-4 w-4 mr-2 text-neutral-500 dark:text-neutral-400" />
                  <span className="font-semibold">Javiya Schooling System</span>
                </div>
                <span className="hidden sm:inline mx-2">•</span>
                <span className="text-center sm:text-left font-medium">Junagadh, Gujarat</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start text-neutral-700 dark:text-neutral-300 mb-3 text-sm sm:text-base">
                <Calendar className="h-4 w-4 mr-2 text-neutral-500 dark:text-neutral-400" />
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
        <div className="group bg-white dark:bg-neutral-900 rounded-lg p-5 sm:p-6 shadow-lg border border-neutral-200 dark:border-neutral-800 relative overflow-hidden transition-all duration-300 transform md:hover:-translate-y-2 md:hover:shadow-xl md:hover:shadow-orange-600/25 md:hover:drop-shadow-[0_0_12px_rgba(234,88,12,0.7)] touch-manipulation">
          {/* colored hover overlay (orange) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-orange-400/6 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full transition-transform duration-300 md:group-hover:scale-110 md:group-hover:shadow-2xl md:group-hover:drop-shadow-[0_0_8px_rgba(234,88,12,0.5)] self-center sm:self-start flex-shrink-0">
              <GraduationCap className="h-6 w-6 text-orange-600 dark:text-orange-400 transition-transform duration-300 md:group-hover:scale-110" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 leading-tight">
                Secondary School Education
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center text-neutral-700 dark:text-neutral-300 mb-2 text-sm sm:text-base">
                <div className="flex items-center justify-center sm:justify-start mb-1 sm:mb-0">
                  <MapPin className="h-4 w-4 mr-2 text-neutral-500 dark:text-neutral-400" />
                  <span className="font-semibold">Javiya Schooling System</span>
                </div>
                <span className="hidden sm:inline mx-2">•</span>
                <span className="text-center sm:text-left font-medium">Junagadh, Gujarat</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start text-neutral-700 dark:text-neutral-300 mb-3 text-sm sm:text-base">
                <Calendar className="h-4 w-4 mr-2 text-neutral-500 dark:text-neutral-400" />
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
