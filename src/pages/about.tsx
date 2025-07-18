import React from 'react';
import Head from 'next/head';

const AboutPage = () => {
  const beliefs = [
    {
      title: "Universal Sinfulness",
      verse: "Romans 5:12",
      description: "All human kind are born in Adam, sinners by birth: 'Therefore, just as sin came into the world through one man, and death through sin, and so death spread to all men because all sinned--'"
    },
    {
      title: "No Human Righteousness",
      verse: "Romans 3:10",
      description: "There is none righteous before God: 'None is righteous, no, not one; no one understands; no one seeks for God'"
    },
    {
      title: "God's Justice",
      verse: "Deuteronomy 32:4",
      description: "God is righteous and Just and can never allow sin into heaven: 'A God of faithfulness and without iniquity, just and upright is He'"
    },
    {
      title: "Salvation by Faith",
      verse: "Galatians 2:16",
      description: "No good deed from man can justify him: 'yet we know that a person is not justified by works of the law but through faith in Jesus Christ'"
    },
    {
      title: "Perfect Obedience Required",
      verse: "James 2:10",
      description: "Breaking one law makes you guilty of all: 'For whoever keeps the whole law but fails in one point has become guilty of all'"
    },
    {
      title: "Blood Sacrifice Necessity",
      verse: "Hebrews 9:22",
      description: "God can never forgive sin without shedding of blood: 'without the shedding of blood there is no forgiveness of sins'"
    },
    {
      title: "Jesus as the Only Sacrifice",
      verse: "Hebrews 10:5-10",
      description: "The only available sacrifice is Jesus Christ: 'Sacrifices and offerings you have not desired, but a body have you prepared for me'"
    },
    {
      title: "Forgiveness Through Christ",
      verse: "Acts 13:38-39",
      description: "Righteousness comes through forgiveness: 'through this man forgiveness of sins is proclaimed to you, and by him everyone who believes is freed'"
    },
    {
      title: "Jesus as the Only Way",
      verse: "John 14:6",
      description: "Without Jesus Christ nobody can enter heaven: 'I am the way, and the truth, and the life. No one comes to the Father except through me'"
    },
    {
      title: "Salvation from Wrath",
      verse: "Romans 5:9",
      description: "Through Jesus' death, believers are saved from Hell: 'having now been justified by His blood, we shall be saved from wrath through Him'"
    }
  ];

  return (
    <>
      <Head>
        <title>About Us - Calvary Jesus Church</title>
        <meta name="description" content="Learn about our beliefs, mission, and biblical foundation at Calvary Jesus Church." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-blue-900 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-6">About Calvary Jesus Church</h1>
            <p className="text-xl text-center max-w-3xl mx-auto">
              We are a group of believers with a common faith based on Biblical facts and the authority of God's Word.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Story</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-6">
                  Calvary Jesus Church is founded on the solid rock of Biblical doctrine. We believe that the Bible 
                  is complete on its own and nothing exists outside the Bible claimed to be from God is true. Our 
                  faith is rooted in the truth that God has spoken to us through His Son.
                </p>
                <blockquote className="bg-blue-50 border-l-4 border-blue-500 p-6 italic text-gray-700 mb-6">
                  "Long ago, at many times and in many ways, God spoke to our fathers by the prophets, but in these 
                  last days, He has spoken to us by His Son, Whom He appointed the Heir of all things, through whom 
                  also, He created the world" - Hebrews 1:1-2
                </blockquote>
                <p className="text-gray-600 mb-6">
                  This gives us the reason to rely solely on the Bible and hence the reason to study the Bible. 
                  The Bible contains God's mind and will for our lives (2 Timothy 3:16-17) and is the only source 
                  of absolute divine authority for servants of Jesus Christ.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Study the Bible */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Study the Bible?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Perfect and Complete</h3>
                  <p className="text-gray-600 mb-2">"The law of the Lord is perfect, reviving the soul" - Psalm 19:7</p>
                  <p className="text-gray-600">It is infallible in its totality and complete in every part.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Every Word True</h3>
                  <p className="text-gray-600 mb-2">"Every word of God proves true" - Proverbs 30:5-6</p>
                  <p className="text-gray-600">It is infallible and inerrant in all its parts.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Authoritative and Final</h3>
                  <p className="text-gray-600 mb-2">"Forever O Lord, your word is firmly fixed" - Psalm 119:89</p>
                  <p className="text-gray-600">God's word is the final authority in all matters of faith and practice.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Sufficient for All Needs</h3>
                  <p className="text-gray-600 mb-2">"that the man of God may be complete" - 2 Timothy 3:16-17</p>
                  <p className="text-gray-600">It equips believers for every good work and spiritual need.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Beliefs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Core Beliefs</h2>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                {beliefs.map((belief, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">{belief.title}</h3>
                    <p className="text-sm text-blue-700 mb-3 font-medium">{belief.verse}</p>
                    <p className="text-gray-600 text-sm">{belief.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl mb-8">
                To unleash God's truth one verse at a time, teaching the Bible with unwavering commitment 
                to its authority, sufficiency, and transformative power in the lives of believers.
              </p>
              <div className="bg-blue-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Our Focus</h3>
                <p className="text-lg">
                  Teaching the Bible is our primary focus. We believe that through careful study and exposition 
                  of Scripture, believers are equipped to live lives that honor God and proclaim His truth to the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Us in Studying God's Word</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the transformative power of God's Word in a community committed to Biblical truth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/services" className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Join Our Services
              </a>
              <a href="/contact" className="border-2 border-blue-900 hover:bg-blue-900 hover:text-white text-blue-900 px-8 py-3 rounded-lg font-semibold transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
