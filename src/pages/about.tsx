import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, Users, Heart, Shield, Star, ArrowRight, Quote } from 'lucide-react';

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

  const staticLeadership: Leader[] = [
    { id: 1, name: 'Pastor Bruce', position: 'Missionary Pastor', image_url: '/images/about/leadership/pastor-bruce.jpg', description: 'Leading our church in Bible-centered teaching and pastoral care.', email: 'Pst.bruce67@gmail.com' },
    { id: 2, name: 'Oliver Oyando', position: 'Church Secretary', image_url: '/images/about/leadership/elder-johnson.jpg', description: 'Ensures smooth daily operations by handling administrative and communication tasks.', email: 'oyandooliver6@gmail.com' },
    { id: 3, name: 'Kevin Odhiambo', position: 'Secretary', image_url: '/images/about/leadership/kevin-odhiambo.jpg', description: 'Handles all technology and digital communication platforms.', email: 'manodhiambo@gmail.com' },
    { id: 4, name: 'Joyce Akoth', position: 'Vice Secretary', image_url: '/images/about/leadership/joyce-akoth.jpg', description: 'Supports secretarial duties and assists in administrative functions.', email: 'joyceakoth@gmail.com' },
    { id: 5, name: 'Samuel Ondieki', position: 'Vice Chairman', image_url: '/images/about/leadership/samuel-ondieki.jpg', description: 'Assists the chairman in leadership and decision-making responsibilities.', email: 'samuelondieki@gmail.com' },
    { id: 6, name: 'Felix Ochieng', position: 'Treasurer', image_url: '/images/about/leadership/felix-ochieng.jpg', description: 'Manages church finances and ensures transparency in financial matters.', email: 'felixochieng@gmail.com' },
    { id: 7, name: 'John Olary', position: 'Vice Treasurer', image_url: '/images/about/leadership/john-olary.jpg', description: 'Supports the treasurer in managing church financial responsibilities.', email: 'johnolary@gmail.com' },
  ];

  useEffect(() => {
    fetch('/api/public/leadership')
      .then(r => r.json())
      .then(data => setLeadershipData(Array.isArray(data) && data.length > 0 ? data : staticLeadership))
      .catch(() => setLeadershipData(staticLeadership));
  }, []);

  const leadership = leadershipData.length > 0 ? leadershipData : staticLeadership;

  const beliefs = [
    { title: 'Biblical Foundation', description: 'All human kind are born in Adam, sinners by birth. Therefore, just as sin came into the world through one man, and death through sin, and so death spread to all men because all sinned.', verse: 'Romans 5:12' },
    { title: "God's Righteousness", description: "God is righteous and Just and can never allow sin into heaven. A God of faithfulness and without iniquity, just and upright is He.", verse: 'Deuteronomy 32:4' },
    { title: 'Salvation Through Christ', description: 'The only way one can be righteous, right with God is through the forgiveness. Through this man forgiveness of sins is proclaimed to you, and by him everyone who believes is freed.', verse: 'Acts 13:38-39' },
    { title: 'Jesus is the Way', description: 'Without Jesus Christ nobody can enter heaven. I am the way, and the truth, and the life. No one comes to the Father except through me.', verse: 'John 14:6' },
  ];

  const coreValues = [
    { icon: BookOpen, title: 'Biblical Authority', description: 'We believe the Bible is complete on its own and is our sole authority for faith and practice.' },
    { icon: Heart,    title: 'Christ-Centered',   description: 'Jesus Christ is at the center of everything we do, teach, and believe.' },
    { icon: Users,    title: 'Community',          description: 'We are a family of believers committed to growing together in faith.' },
    { icon: Heart,    title: 'Love',               description: "We show God's love through our actions and service to others." },
    { icon: Shield,   title: 'Truth',              description: "We are committed to teaching and living according to God's truth." },
    { icon: Star,     title: 'Excellence',         description: 'We strive for excellence in all we do for the glory of God.' },
  ];

  const biblePoints = [
    { point: 'It is infallible in its totality', verse: 'The law of the Lord is perfect, reviving the soul; the testimony of the Lord is sure, making wise the simple. — Psalm 19:7' },
    { point: 'It is infallible/inerrant in its parts', verse: 'Every word of God proves true; He is a shield to those who take refuge in Him. Do not add to His Words, lest he rebuke you. — Proverbs 30:5-6' },
    { point: 'It is complete', verse: 'I warn everyone who hears the words of the prophesy of this book: if anyone add to them, God will add to him the plagues described in this book. — Revelation 22:19' },
    { point: 'It is authoritative and final', verse: "Forever O Lord, your word is firmly fixed in the heavens. — Psalm 119:89" },
    { point: 'It is sufficient for your needs', verse: 'That the man of God may be complete, equipped for every good work. — 2 Timothy 3:16-17' },
    { point: 'It will accomplish what it promises', verse: 'So shall my word be that goes out from my mouth; it shall not return to me empty, but it shall accomplish that which I purpose. — Isaiah 55:11' },
    { point: 'It provides the assurance of your salvation', verse: 'Whoever is of God hears the word of God. — John 8:47' },
  ];

  return (
    <>
      <Head>
        <title>About Us — Calvary Jesus Church</title>
        <meta name="description" content="Learn about Calvary Jesus Church — our story, beliefs, leadership team, and mission to unleash God's truth one verse at a time." />
      </Head>
      <Header />

      <main>
        {/* ── Hero ── */}
        <section className="relative py-36 bg-cjc-navy overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/about/church-history.jpg" alt="About CJC" className="w-full h-full object-cover opacity-15" />
          </div>
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
            <div className="w-12 h-0.5 bg-cjc-gold mx-auto mb-6" />
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">About Us</h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Discover our story, beliefs, and the people who make up our church family
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />
        </section>

        {/* ── Our Story ── */}
        <section id="story" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <img src="/images/about/mission-vision.jpg" alt="Our Story"
                  className="w-full h-96 object-cover rounded-2xl shadow-xl" />
              </div>
              <div className="order-1 lg:order-2">
                <p className="section-label">Our History</p>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-cjc-navy mb-8">Our Story</h2>
                <div className="space-y-5 text-gray-600 leading-relaxed">
                  <p>Calvary Jesus Church is based on Biblical doctrine solely. We believe that the Bible is complete on its own and nothing exists outside the Bible claimed to be from God is true.</p>
                  <p>Our faith is based on the fact that, "Long ago, at many times and in many ways, God spoke to our fathers by the prophets, but in these last days, He has spoken to us by His Son, Whom He appointed the Heir of all things, through whom also, He created the world" (Hebrews 1:1-2).</p>
                  <p>The Prophets and Apostles, after laying the foundation, we now build on it. This means that the only way God can communicate is through the Bible — giving us every reason to rely solely on the Word and study it faithfully.</p>
                </div>
                <div className="mt-8">
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-cjc-gold hover:bg-cjc-gold-mid text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                    Visit Us <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission ── */}
        <section id="mission" className="py-24 bg-cjc-navy text-white relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-cjc-gold/5 rounded-full" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <p className="section-label text-cjc-gold">Our Purpose</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-12">Our Mission</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12">
              <Quote className="w-10 h-10 text-cjc-gold/40 mx-auto mb-6" />
              <blockquote className="font-heading text-2xl md:text-3xl font-medium leading-relaxed mb-6">
                "We are a dedicated church in unleashing God's truth one verse at a time. Teaching the Bible is our focus."
              </blockquote>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our mission is to study and teach God's Word faithfully, building lives on the solid foundation of Biblical truth, and creating a community where believers can grow in their faith together.
              </p>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />
        </section>

        {/* ── Core Values ── */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="section-label">What We Stand For</p>
              <div className="gold-divider">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-cjc-navy">Our Core Values</h2>
              </div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">These fundamental values guide everything we do as a church community</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map(({ icon: Icon, title, description }) => (
                <div key={title} className="group p-8 rounded-2xl border border-gray-100 hover:border-cjc-gold/30 hover:shadow-xl transition-all duration-300 text-center">
                  <div className="w-14 h-14 bg-cjc-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-cjc-gold/20 transition-colors">
                    <Icon className="w-7 h-7 text-cjc-gold" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-cjc-navy mb-3">{title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Beliefs ── */}
        <section id="beliefs" className="py-24 bg-cjc-cream">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="section-label">Theological Foundation</p>
              <div className="gold-divider">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-cjc-navy">Our Beliefs</h2>
              </div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">We are a group of believers with a common faith based on Biblical facts</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              {beliefs.map((belief, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-cjc-gold/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-cjc-gold/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-cjc-gold font-bold text-sm">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-cjc-navy mb-3">{belief.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-3">{belief.description}</p>
                      <span className="text-cjc-gold text-sm font-semibold">— {belief.verse}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Leadership ── */}
        <section id="leadership" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="section-label">Meet the Team</p>
              <div className="gold-divider">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-cjc-navy">Leadership Team</h2>
              </div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">Meet the dedicated leaders who serve our church community</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadership.map((leader, i) => (
                <div key={leader.id || i} className="group text-center">
                  <div className="relative mb-5 overflow-hidden rounded-2xl shadow-md">
                    <img
                      src={leader.image_url || leader.image || '/images/about/leadership/pastor-bruce.jpg'}
                      alt={leader.name}
                      className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={e => { (e.target as HTMLImageElement).src = '/images/about/leadership/pastor-bruce.jpg'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cjc-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-cjc-navy mb-1">{leader.name}</h3>
                  <p className="text-cjc-gold text-sm font-semibold mb-3">{leader.position || leader.role}</p>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{leader.bio || leader.description}</p>
                  {leader.email && (
                    <a href={`mailto:${leader.email}`} className="text-cjc-gold hover:text-cjc-gold-mid text-sm font-medium transition-colors">
                      Contact →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Study the Bible ── */}
        <section className="py-24 bg-cjc-navy text-white relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="text-center mb-14">
              <p className="section-label text-cjc-gold">The Word of God</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Why Study the Bible?</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Because it contains God's mind and Will for our lives (2 Timothy 3:16-17). It is the only source of absolute divine authority for you as a servant of Jesus Christ.
              </p>
            </div>
            <div className="space-y-4">
              {biblePoints.map((item, i) => (
                <div key={i} className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cjc-gold/30 rounded-xl p-6 transition-all duration-300 flex items-start gap-4">
                  <span className="w-7 h-7 bg-cjc-gold/20 rounded-lg flex items-center justify-center text-cjc-gold font-bold text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <h3 className="font-heading text-base font-bold mb-2">{item.point}</h3>
                    <p className="text-gray-300 text-sm italic leading-relaxed">{item.verse}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />
        </section>

        {/* ── CTA ── */}
        <section className="py-24 bg-cjc-cream">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="section-label">You Are Welcome</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-cjc-navy mb-6">Join Our Church Family</h2>
            <p className="text-gray-600 text-xl mb-10 max-w-2xl mx-auto">We welcome you to be part of our community as we grow together in God's Word</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-cjc-gold hover:bg-cjc-gold-mid text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">Visit Us</Link>
              <Link href="/services" className="border-2 border-cjc-navy text-cjc-navy hover:bg-cjc-navy hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">Join Our Services</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
