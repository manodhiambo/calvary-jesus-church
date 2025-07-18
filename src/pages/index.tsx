import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Play, Calendar, MapPin, Clock, Heart, BookOpen, Users, Send } from 'lucide-react'
import Layout from '@/components/Layout'
import Button from '@/components/ui/Button'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Biblical Teaching",
      description: "We believe the Bible is complete and the only source of divine authority for our lives."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community",
      description: "Join a loving community of believers dedicated to growing in faith together."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Worship",
      description: "Experience authentic worship as we gather to praise and honor God."
    }
  ]

  const upcomingEvents = [
    {
      date: "2024-01-07",
      title: "Sunday Service",
      time: "9:00 AM - 12:00 PM",
      location: "Nyaduong' village"
    },
    {
      date: "2024-01-07",
      title: "Sunday Service",
      time: "2:00 PM - 4:00 PM",
      location: "Oruba, Migori Town"
    },
    {
      date: "2024-01-10",
      title: "Bible Study",
      time: "6:00 PM - 8:00 PM",
      location: "Church Hall"
    }
  ]

  const backgroundPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900">
          <div className="absolute inset-0 bg-black/30"></div>
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("${backgroundPattern}")`,
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Welcome to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-secondary-200">
                Calvary Jesus Church
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Unleashing God's truth one verse at a time
            </p>
            <blockquote className="scripture-text text-lg md:text-xl text-gray-300 italic mb-8 max-w-4xl mx-auto">
              "Long ago, at many times and in many ways, God spoke to our fathers by the prophets, 
              but in these last days, He has spoken to us by His Son..."
            </blockquote>
            <cite className="text-secondary-400 text-sm">Hebrews 1:1-2</cite>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button
              size="lg"
              className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 text-lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              <Link href="/about">Learn More</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary-900 px-8 py-4 text-lg"
              leftIcon={<Play className="w-5 h-5" />}
            >
              <Link href="/services">Join Service</Link>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Study the Bible?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Because it contains God's mind and will for our lives. It is the only source of absolute divine authority.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow" hover>
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Times Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Join Us This Sunday
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Experience the power of God's word as we gather together for worship, 
                fellowship, and Biblical teaching.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <Clock className="w-6 h-6 text-primary-600" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Morning Service</p>
                    <p className="text-gray-600 dark:text-gray-300">9:00 AM - 12:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg">
                  <Clock className="w-6 h-6 text-secondary-600" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Afternoon Service</p>
                    <p className="text-gray-600 dark:text-gray-300">2:00 PM - 4:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <MapPin className="w-6 h-6 text-gray-600" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Locations</p>
                    <p className="text-gray-600 dark:text-gray-300">Nyaduong' village & Oruba, Migori</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  <Link href="/contact">Plan Your Visit</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/api/placeholder/600/400"
                  alt="Church service"
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center text-white">
                <Play className="w-8 h-8 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join us for worship, fellowship, and growing in God's word together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 text-primary-600">
                      <Calendar className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Take Your Next Step?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Whether you're new to faith or looking to deepen your relationship with God, 
              we're here to walk alongside you on your spiritual journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                <Link href="/about">Learn About Us</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg"
                leftIcon={<Send className="w-5 h-5" />}
              >
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gray-800 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <blockquote className="text-lg md:text-xl text-gray-300 italic mb-6">
              "All Scripture is breathed out by God and profitable for teaching, for reproof, 
              for correction, and for training in righteousness, that the man of God may be 
              complete, equipped for every good work."
            </blockquote>
            <cite className="text-secondary-400 text-base">2 Timothy 3:16-17</cite>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default HomePage
