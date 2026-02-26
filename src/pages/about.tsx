import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, Users, Heart, Cross, Shield, Star } from 'lucide-react';

interface Leader {
  id: number;
  name: string;
  position: string;
  bio?: string;
  image_url?: string;
  email?: string;
  role?: string;
  image?: string;
  description?: string;
}

export default function About() {
  const [leadershipData, setLeadershipData] = useState<Leader[]>([]);
  // Static fallback leadership
  const staticLeadership: Leader[] = [
    { id: 1, name: "Pastor Bruce", position: "Missionary Pastor", image_url: "/images/about/leadership/pastor-bruce.jpg", description: "Leading our church in Bible-centered teaching and pastoral care.", email: "Pst.bruce67@gmail.com" },
    { id: 2, name: "Oliver Oyando", position: "Church Secretary", image_url: "/images/about/leadership/elder-johnson.jpg", description: "Ensures smooth daily operations by handling administrative and communication tasks.", email: "oyandooliver6@gmail.com" },
    { id: 3, name: "Kevin Odhiambo", position: "Secretary", image_url: "/images/about/leadership/kevin-odhiambo.jpg", description: "Handles all technology and digital communication platforms.", email: "manodhiambo@gmail.com" },
    { id: 4, name: "Joyce Akoth", position: "Vice Secretary", image_url: "/images/about/leadership/joyce-akoth.jpg", description: "Supports secretarial duties and assists in administrative functions.", email: "joyceakoth@gmail.com" },
    { id: 5, name: "Samuel Ondieki", position: "Vice Chairman", image_url: "/images/about/leadership/samuel-ondieki.jpg", description: "Assists the chairman in leadership and decision-making responsibilities.", email: "samuelondieki@gmail.com" },
    { id: 6, name: "Felix Ochieng", position: "Treasurer", image_url: "/images/about/leadership/felix-ochieng.jpg", description: "Manages church finances and ensures transparency in financial matters.", email: "felixochieng@gmail.com" },
    { id: 7, name: "John Olary", position: "Vice Treasurer", image_url: "/images/about/leadership/john-olary.jpg", description: "Supports the treasurer in managing church financial responsibilities.", email: "johnolary@gmail.com" },
  ];

  useEffect(() => {
    fetch('/api/public/leadership')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setLeadershipData(data); else setLeadershipData(staticLeadership); })
      .catch(() => setLeadershipData(staticLeadership));
  }, []);

  const leadership = leadershipData.length > 0 ? leadershipData : staticLeadership;

  const beliefs = [
    {
      title: "Biblical Foundation",
      description: "All human kind are born in Adam, sinners by birth. Therefore, just as sin came into the world through one man, and death through sin, and so death spread to all men because all sinned (Romans 5:12).",
      verse: "Romans 5:12"
    },
    {
      title: "God's Righteousness",
      description: "God is righteous and Just and can never allow sin into heaven. A God of faithfulness and without iniquity, just and upright is He (Deuteronomy 32:4).",
      verse: "Deuteronomy 32:4"
    },
    {
      title: "Salvation Through Christ",
      description: "The only way one can be righteous, right with God is through the forgiveness. Through this man forgiveness of sins is proclaimed to you, and by him everyone who believes is freed (Acts 13:38-39).",
      verse: "Acts 13:38-39"
    },
    {
      title: "Jesus is the Way",
      description: "Without Jesus Christ nobody can enter heaven. I am the way, and the truth, and the life. No one comes to the Father except through me (John 14:6).",
      verse: "John 14:6"
    }
  ];

  const coreValues = [
    {
      icon: BookOpen,
      title: "Biblical Authority",
      description: "We believe the Bible is complete on its own and is our sole authority for faith and practice."
    },
    {
      icon: Cross,
      title: "Christ-Centered",
      description: "Jesus Christ is at the center of everything we do, teach, and believe."
    },
    {
      icon: Users,
      title: "Community",
      description: "We are a family of believers committed to growing together in faith."
    },
    {
      icon: Heart,
      title: "Love",
      description: "We show God's love through our actions and service to others."
    },
    {
      icon: Shield,
      title: "Truth",
      description: "We are committed to teaching and living according to God's truth."
    },
    {
      icon: Star,
      title: "Excellence",
      description: "We strive for excellence in all we do for the glory of God."
    }
  ];

  return (
    <>
      <Head>
        <title>About Us - Calvary Jesus Church</title>
        <meta name="description" content="Learn about Calvary Jesus Church - our story, beliefs, leadership team, and mission to unleash God's truth one verse at a time." />
        <meta name="keywords" content="about us, church leadership, biblical beliefs, church history, Migori church" />
      </Head>

      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="absolute inset-0 bg-black/30"></div>
          <img
            src="/images/about/church-history.jpg"
            alt="About Calvary Jesus Church"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
            <p className="text-xl md:text-2xl opacity-90">
              Discover our story, beliefs, and the people who make up our church family
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section id="story" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
                  Our Story
                </h2>
                <div className="prose prose-lg text-slate-600 space-y-6">
                  <p>
                    Calvary Jesus Church is based on Biblical doctrine solely. We believe that the Bible is complete 
                    on its own and nothing exists outside the Bible claimed to be from God is true.
                  </p>
                  <p>
                    Our faith is based on the fact that, "Long ago, at many times and in many ways, God spoke to our 
                    fathers by the prophets, but in these last days, He has spoken to us by His Son, Whom He appointed 
                    the Heir of all things, through whom also, He created the world" (Hebrews 1:1-2).
                  </p>
                  <p>
                    The Prophets and Apostles, after laying the foundation, we now build on it. This means that the 
                    only way God can communicate is through the Bible and not through dreams, visions, etc. This gives 
                    us the reasons to rely solely on the Bible and hence the reason to study the Bible.
                  </p>
                </div>
              </div>
              <div className="lg:order-first">
                <img
                  src="/images/about/mission-vision.jpg"
                  alt="Our Story"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section id="mission" className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
              Our Mission
            </h2>
            <div className="bg-white p-12 rounded-lg shadow-lg">
              <blockquote className="text-2xl md:text-3xl text-slate-700 font-medium leading-relaxed mb-6">
                "We are a dedicated church in unleashing God's truth one verse at a time. 
                Teaching the Bible is our focus."
              </blockquote>
              <p className="text-lg text-slate-600">
                Our mission is to study and teach God's Word faithfully, building lives on the solid foundation 
                of Biblical truth, and creating a community where believers can grow in their faith together.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Our Core Values
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                These fundamental values guide everything we do as a church community
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="text-center p-8 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <IconComponent className="w-16 h-16 text-amber-600 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Beliefs & Values */}
        <section id="beliefs" className="py-20 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Beliefs
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                We are a group of believers with a common faith based on Biblical facts
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {beliefs.map((belief, index) => (
                <div key={index} className="bg-slate-800 p-8 rounded-lg">
                  <h3 className="text-2xl font-bold text-amber-400 mb-4">{belief.title}</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">{belief.description}</p>
                  <div className="text-amber-500 font-semibold">— {belief.verse}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section id="leadership" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Leadership Team
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Meet the dedicated leaders who serve our church community
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadership.map((leader, index) => (
                <div key={leader.id || index} className="text-center group">
                  <div className="relative mb-6 overflow-hidden rounded-lg">
                    <img
                      src={leader.image_url || leader.image || '/images/about/leadership/default.jpg'}
                      alt={leader.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={e => { (e.target as HTMLImageElement).src = '/images/about/leadership/pastor-bruce.jpg'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{leader.name}</h3>
                  <p className="text-amber-600 font-semibold mb-3">{leader.position || leader.role}</p>
                  <p className="text-slate-600 text-sm mb-4">{leader.bio || leader.description}</p>
                  {leader.email && (
                    <a href={`mailto:${leader.email}`} className="text-amber-600 hover:text-amber-700 font-medium">
                      Contact
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Study the Bible */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Why Study the Bible?
              </h2>
              <p className="text-xl text-slate-600">
                Because it contains God's mind and Will for our lives (2 Timothy 3:16-17). 
                It is the only source of absolute divine authority for you as a servant of Jesus Christ.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  point: "It is infallible in its totality",
                  verse: "The law of the Lord is perfect, reviving the soul; the testimony of the Lord is sure, making wise the simple (Psalm 19:7)"
                },
                {
                  point: "It is infallible/inerrant in its parts",
                  verse: "Every word of God proves true; He is a shield to those who take refuge in Him. Do not add to His Words, lest he rebuke you and you be found a liar (Proverbs 30:5-6)"
                },
                {
                  point: "It is complete",
                  verse: "I warn everyone who hears the words of the prophesy of this book: if anyone add to them, God will add to him the plagues described in this book (Revelation 22:19)"
                },
                {
                  point: "It is authoritative and final",
                  verse: "Forever O Lord, your word is firmly fixed in the heavens (Psalm 119:89)"
                },
                {
                  point: "It is sufficient for your needs",
                  verse: "That the man of God may be complete, equipped for every good work (2 Timothy 3:16-17)"
                },
                {
                  point: "It will accomplish what it promises",
                  verse: "So shall my word be that goes out from my mouth; it shall not return to me empty, but it shall accomplish that which I purpose (Isaiah 55:11)"
                },
                {
                  point: "It provides the assurance of your salvation",
                  verse: "Whoever is of God hears the word of God (John 8:47)"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.point}</h3>
                  <p className="text-slate-600 italic">{item.verse}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Church Family
            </h2>
            <p className="text-xl mb-8 opacity-90">
              We welcome you to be part of our community as we grow together in God's Word
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Visit Us
              </Link>
              <Link href="/services" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Join Our Services
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
