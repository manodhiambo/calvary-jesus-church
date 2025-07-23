import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, Mail, ExternalLink } from 'lucide-react';

interface LocationData {
  name: string;
  address: string;
  serviceTime: string;
  description?: string;
  mapUrl: string;
  directionsUrl?: string;
}

const LocationMap: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState(0);

  const locations: LocationData[] = [
    {
      name: "Nyaduong' Village Location",
      address: "Nyaduong' village next to Nyaduong' Secondary and Primary Schools, Migori",
      serviceTime: "Sunday 9:00 AM - 12:00 PM",
      description: "Our main worship location in Nyaduong' village",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.4799877335027!2d34.47337571532466!3d-1.063975599286632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19d6d5d20ef2b8f5%3A0x24f0b2d8dcdd1c7f!2sNyaduong'%20Secondary%20School!5e0!3m2!1sen!2ske!4v1709878675012!5m2!1sen!2ske",
      directionsUrl: "https://maps.google.com/?q=Nyaduong'+Secondary+School,+Migori"
    },
    {
      name: "Migori Town Location",
      address: "Oruba, Migori Town inside Dip Primary School",
      serviceTime: "Sunday 2:00 PM - 4:00 PM",
      description: "Our afternoon service location in Migori town",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.4799877335027!2d34.47337571532466!3d-1.063975599286632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19d6d5d20ef2b8f5%3A0x24f0b2d8dcdd1c7f!2sMigori,+Kenya!5e0!3m2!1sen!2ske!4v1709878675012!5m2!1sen!2ske",
      directionsUrl: "https://maps.google.com/?q=Dip+Primary+School,+Migori"
    }
  ];

  const contactInfo = {
    email: "Pst.bruce67@gmail.com",
    phone: "+254735464102",
    facebook: "https://www.facebook.com/profile.php?id=100064378341874"
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-6">
        <div className="text-center text-white">
          <MapPin className="w-12 h-12 mx-auto mb-3 opacity-90" />
          <h2 className="text-2xl font-bold">Find Us</h2>
          <p className="text-blue-100 mt-2">
            Join us for worship at either of our two locations
          </p>
        </div>
      </div>

      <div className="p-8">
        {/* Location Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {locations.map((location, index) => (
            <button
              key={index}
              onClick={() => setActiveLocation(index)}
              className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                activeLocation === index
                  ? 'border-blue-900 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-blue-300 text-gray-700'
              }`}
            >
              <h3 className="font-semibold text-lg mb-1">{location.name}</h3>
              <p className="text-sm opacity-75 mb-2">{location.serviceTime}</p>
              <p className="text-xs">{location.address}</p>
            </button>
          ))}
        </div>

        {/* Active Location Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Location Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {locations[activeLocation].name}
              </h3>
              
              {/* Address */}
              <div className="flex items-start mb-4">
                <MapPin className="w-5 h-5 text-blue-900 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">{locations[activeLocation].address}</p>
                </div>
              </div>

              {/* Service Time */}
              <div className="flex items-start mb-4">
                <Clock className="w-5 h-5 text-blue-900 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Service Time</p>
                  <p className="text-gray-600">{locations[activeLocation].serviceTime}</p>
                </div>
              </div>

              {/* Description */}
              {locations[activeLocation].description && (
                <div className="mb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {locations[activeLocation].description}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {locations[activeLocation].directionsUrl && (
                <a
                  href={locations[activeLocation].directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </a>
              )}
              <button className="flex-1 border border-blue-900 hover:bg-blue-50 text-blue-900 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                View on Maps
              </button>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-blue-900 mr-3" />
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="text-gray-600 hover:text-blue-900 transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-blue-900 mr-3" />
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-gray-600 hover:text-blue-900 transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-96 lg:h-full min-h-[400px]">
            <iframe
              src={locations[activeLocation].mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-md"
              title={`Map of ${locations[activeLocation].name}`}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-900 mb-3">Visitor Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <p className="font-medium mb-1">What to Expect:</p>
              <ul className="space-y-1 text-xs">
                <li>• Warm, welcoming atmosphere</li>
                <li>• Bible-based teaching</li>
                <li>• Fellowship and community</li>
                <li>• All ages welcome</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">What to Bring:</p>
              <ul className="space-y-1 text-xs">
                <li>• Your Bible (we have extras available)</li>
                <li>• Open heart and mind</li>
                <li>• Questions are welcome</li>
                <li>• Come as you are</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
