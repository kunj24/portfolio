import React from 'react'
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react'

export default function EducationSection() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Education
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          My academic journey 
        </p>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Bachelor's Degree */}
        <div className="group bg-white dark:bg-neutral-900 rounded-lg p-6 shadow-lg border border-neutral-200 dark:border-neutral-800 relative overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:shadow-2xl">
              <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Bachelor of Computer Science and Engineering
              </h3>
              <div className="flex items-center text-neutral-600 dark:text-neutral-400 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="font-medium">Charotar University of Science and Technology</span>
                <span className="mx-2">•</span>
                <span>Anand, Gujarat</span>
              </div>
              <div className="flex items-center text-neutral-600 dark:text-neutral-400 mb-3">
                <Calendar className="h-4 w-4 mr-2" />
                <span>2022 - 2027</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2 text-green-600" />
                <span className="font-semibold text-green-600">CGPA: 8.11/10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Higher Secondary */}
        <div className="group bg-white dark:bg-neutral-900 rounded-lg p-6 shadow-lg border border-neutral-200 dark:border-neutral-800 relative overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:shadow-2xl">
              <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Higher Secondary Education
              </h3>
              <div className="flex items-center text-neutral-600 dark:text-neutral-400 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="font-medium">Javiya Schooling System</span>
                <span className="mx-2">•</span>
                <span>Junagadh, Gujarat</span>
              </div>
              <div className="flex items-center text-neutral-600 dark:text-neutral-400 mb-3">
                <Calendar className="h-4 w-4 mr-2" />
                <span>2022 - 2023</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2 text-green-600" />
                <span className="font-semibold text-green-600">Percentage: 91.16%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary School */}
        <div className="group bg-white dark:bg-neutral-900 rounded-lg p-6 shadow-lg border border-neutral-200 dark:border-neutral-800 relative overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
          <div className="flex items-start space-x-4">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:shadow-2xl">
              <GraduationCap className="h-6 w-6 text-orange-600 dark:text-orange-400 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Secondary School Education
              </h3>
              <div className="flex items-center text-neutral-600 dark:text-neutral-400 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="font-medium">Javiya Schooling System</span>
                <span className="mx-2">•</span>
                <span>Junagadh, Gujarat</span>
              </div>
              <div className="flex items-center text-neutral-600 dark:text-neutral-400 mb-3">
                <Calendar className="h-4 w-4 mr-2" />
                <span>2020 - 2021</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2 text-green-600" />
                <span className="font-semibold text-green-600">Percentage: 72.15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
