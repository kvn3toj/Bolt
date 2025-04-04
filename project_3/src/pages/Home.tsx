import React from 'react';
import { Link } from 'react-router-dom';
import { 
  // Eliminar: Store, Video, BarChart3, Search, Bell, Globe, 
  // Eliminar: MessageCircleQuestion as QuestionMarkCircle, User,
  Plus, Star, // Eliminar: Heart, Clock, 
  Play, // Eliminar: ChevronRight,
  TrendingUp, Award, Zap, Target, Heart
} from 'lucide-react';
import { BottomNavigation } from '../components/BottomNavigation';
import { ChevronRight } from 'lucide-react';

export function Home() {
  const trendingCourses = [
    {
      id: 1,
      title: "Fotografía Digital Profesional",
      instructor: "Ana García",
      rating: 4.8,
      students: 2500,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
    },
    {
      id: 2,
      title: "Marketing Digital Avanzado",
      instructor: "Carlos López",
      rating: 4.9,
      students: 3200,
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a"
    },
    {
      id: 3,
      title: "Desarrollo Web Full Stack",
      instructor: "Miguel Torres",
      rating: 4.7,
      students: 1800,
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8"
    }
  ];

  const achievements = [
    {
      title: "30 días consecutivos",
      description: "¡Mantén tu racha de aprendizaje!",
      progress: 25,
      total: 30,
      icon: Zap
    },
    {
      title: "Dominio del tema",
      description: "Completa todos los módulos",
      progress: 8,
      total: 10,
      icon: Award
    },
    {
      title: "Objetivos semanales",
      description: "Completa tus metas",
      progress: 4,
      total: 5,
      icon: Target
    }
  ];

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* User Update Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Highlight Update</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {/* Your Update */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-[#1E1E1E] flex items-center justify-center">
                    <Plus className="w-6 h-6" />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-sm">
                  1
                </div>
              </div>
              <p className="text-xs text-center mt-2">Your Update</p>
            </div>
            
            {/* Other Updates */}
            {[
              { name: 'Rossy', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop' },
              { name: 'Jonathan', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop' },
              { name: 'Patterson', image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop' },
              { name: 'William', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop' }
            ].map((profile, index) => (
              <div key={index} className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-[2px]">
                  <img 
                    src={profile.image} 
                    alt={profile.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <p className="text-xs text-center mt-2">{profile.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <TrendingUp className="w-6 h-6 mr-2" />
              Cursos Destacados
            </h2>
            <Link to="/courses" className="text-purple-500 hover:text-purple-400 text-sm">
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingCourses.map((course) => (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="bg-[#2A2A2A] rounded-xl overflow-hidden hover:bg-[#333333] transition-colors"
              >
                <div className="aspect-video relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{course.instructor}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm">{course.rating}</span>
                      <span className="mx-2 text-gray-500">•</span>
                      <span className="text-sm text-gray-400">{course.students} estudiantes</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Statistics Graph */}
        <div className="bg-[#2A2A2A] rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Graphic Update</h2>
          <div className="h-64 flex items-end space-x-2">
            {/* Sample graph bars */}
            {[40, 60, 45, 80, 100, 75, 50].map((height, index) => (
              <div key={index} className="flex-1">
                <div 
                  className="bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-md transition-all duration-200 ease-in-out"
                  style={{ '--chart-height': `${height}%`, height: 'var(--chart-height)' } as React.CSSProperties}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Achievements Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Tus Logros</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-[#2A2A2A] rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold mb-1">{achievement.title}</h3>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center">
                    <achievement.icon className="w-5 h-5 text-purple-500" />
                  </div>
                </div>
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-semibold inline-block text-purple-500">
                        {Math.round((achievement.progress / achievement.total) * 100)}%
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-gray-400">
                        {achievement.progress}/{achievement.total}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded-full bg-purple-600/20">
                    <div
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500 transition-all duration-200 ease-in-out"
                      style={{ '--chart-width': `${Math.round((achievement.progress / achievement.total) * 100)}%`, width: 'var(--chart-width)' } as React.CSSProperties}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link 
            to="/play"
            className="bg-[#2A2A2A] p-6 rounded-xl hover:bg-[#333333] transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <Play className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Continue Learning</h3>
                <p className="text-sm text-gray-400">Resume your last lesson</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/analytics"
            className="bg-[#2A2A2A] p-6 rounded-xl hover:bg-[#333333] transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Your Progress</h3>
                <p className="text-sm text-gray-400">Track your achievements</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <button aria-label="View all recent activity" className="text-purple-500 hover:text-purple-400">
              View All
            </button>
          </div>

          <div className="space-y-6">
            {[
              {
                title: 'Completed "Introduction to Photography"',
                time: '2 hours ago',
                icon: Star,
                color: 'bg-purple-600'
              },
              {
                title: 'Added "Digital Marketing" to favorites',
                time: '4 hours ago',
                icon: Heart,
                color: 'bg-pink-600'
              },
              {
                title: 'Started "Web Development Basics"',
                time: 'Yesterday',
                icon: Play,
                color: 'bg-blue-600'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-white">{activity.title}</p>
                  <p className="text-sm text-gray-400">{activity.time}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}