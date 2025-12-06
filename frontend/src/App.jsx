import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Star,
  Users,
  Calendar,
  Shield,
  Utensils,
  MapPinned,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Youtube,
  Instagram,
  Twitter,
  Sun,
  Moon,
} from 'lucide-react';

// === LOCAL IMAGES (YOUR PHOTOS) ===
import roomYellow from './assets/room-yellow.jpg';
import reception from './assets/reception.jpg';
import roomPink from './assets/room-pink.jpg';
import hall from './assets/hall.jpg';
import palashRoad from './assets/palash-road.jpg';
import exterior from './assets/exterior.jpg';
import dam from './assets/dam.jpg';
import roomPinkWide from './assets/room-pink-wide.jpg';
import chairCorner from './assets/chair-corner.jpg';
import palashBalcony from './assets/palash-balcony.jpg';
import baranti from './assets/baranti.webp';
import ayodhya from './assets/ayodhya.webp';
import hillRoad from './assets/1.jpg';

// === LOADING SCREEN COMPONENT ===
// === SIMPLE LOADING SCREEN COMPONENT ===
// === ELEGANT MINIMAL LOADING SCREEN ===
const LoadingScreen = ({ onLoadingComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onLoadingComplete, 600);
    }, 2200);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-orange-50 to-white transition-opacity duration-600 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        {/* Brand Name with Fade In */}
        <div className="mb-10 animate-pulse">
          <div className="w-16 h-16 mx-auto mb-4 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl">🏠</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Kingsukh Guest House
          </h1>
          <p className="text-orange-600 text-sm mt-1 tracking-widest">PURULIA</p>
        </div>

        {/* Three Dots Loader */}
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

// === DARK MODE TOGGLE COMPONENT ===
const DarkModeToggle = ({ isDarkMode, toggleDarkMode, isScrolled }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className={`relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
        isDarkMode ? 'bg-gray-700' : 'bg-orange-200'
      }`}
      aria-label="Toggle dark mode"
    >
      {/* Toggle Circle */}
      <div
        className={`absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
          isDarkMode
            ? 'translate-x-7 bg-gray-900'
            : 'translate-x-0.5 bg-orange-500'
        }`}
      >
        {isDarkMode ? (
          <Moon className="w-4 h-4 text-yellow-300" />
        ) : (
          <Sun className="w-4 h-4 text-white" />
        )}
      </div>
      
      {/* Background Icons */}
      <Sun
        className={`absolute left-1 top-1.5 w-4 h-4 transition-opacity ${
          isDarkMode ? 'opacity-30 text-gray-500' : 'opacity-0'
        }`}
      />
      <Moon
        className={`absolute right-1 top-1.5 w-4 h-4 transition-opacity ${
          isDarkMode ? 'opacity-0' : 'opacity-30 text-orange-400'
        }`}
      />
    </button>
  );
};

const KingsukhGuestHouse = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // === HERO SLIDER IMAGES ===
  const heroImages = [
    { url: exterior, alt: 'Kingsukh Guest House exterior' },
    { url: palashRoad, alt: 'Palash trees and scenic road near Baranti' },
    { url: dam, alt: 'Nearby dam view' },
  ];

  // === GALLERY IMAGES ===
  const galleryImages = [
    { url: exterior, alt: 'Guest House Exterior' },
    { url: roomYellow, alt: 'Cozy Double Room' },
    { url: roomPink, alt: 'Spacious Pink Room' },
    { url: hall, alt: 'Common Sitting Area' },
    { url: reception, alt: 'Reception Desk' },
    { url: palashRoad, alt: 'Palash Trees in Bloom' },
    { url: palashBalcony, alt: 'View of Palash Forest from Balcony' },
    { url: dam, alt: 'Nearby Dam' },
    { url: baranti, alt: 'Baranti Lake Sunset' },
    { url: ayodhya, alt: 'Ayodhya Pahar Hills' },
    { url: hillRoad, alt: 'Scenic Winding Hill Road' },
    { url: chairCorner, alt: 'Relaxing Corner Seating' },
    { url: roomPinkWide, alt: 'Suite Room with Seating Area' },
  ];

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode !== null) {
      setIsDarkMode(savedMode === 'true');
    } else if (prefersDark) {
      setIsDarkMode(true);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'rooms', 'services', 'gallery', 'contact'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = 'Mobile number must be 10 digits';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormData({ firstName: '', lastName: '', email: '', mobile: '', message: '' });
        setFormSubmitted(false);
      }, 3000);
    } else {
      setFormErrors(errors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Dark mode color classes
  const colors = {
    bg: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
    bgAlt: isDarkMode ? 'bg-gray-800' : 'bg-white',
    bgCard: isDarkMode ? 'bg-gray-800' : 'bg-white',
    bgInput: isDarkMode ? 'bg-gray-700' : 'bg-white',
    bgHover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-orange-50',
    text: isDarkMode ? 'text-white' : 'text-gray-800',
    textMuted: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    textSubtle: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    border: isDarkMode ? 'border-gray-600' : 'border-gray-300',
    navBg: isDarkMode ? 'bg-gray-900' : 'bg-white',
    footerBg: isDarkMode ? 'bg-black' : 'bg-gray-900',
  };

  const StatCard = ({ number, label, icon: Icon }) => (
    <div className={`${colors.bgCard} rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
      <Icon className="w-10 h-10 md:w-12 md:h-12 text-orange-500 mb-4 mx-auto" />
      <div className={`text-3xl md:text-4xl font-bold ${colors.text} mb-2`}>{number}</div>
      <div className={`${colors.textMuted} font-medium text-sm md:text-base`}>{label}</div>
    </div>
  );

  const ServiceCard = ({ icon: Icon, title, description }) => (
    <div className={`text-center p-4 md:p-6 rounded-2xl ${colors.bgHover} transition-all duration-300 group`}>
      <div className={`w-14 h-14 md:w-16 md:h-16 ${isDarkMode ? 'bg-orange-900/50' : 'bg-orange-100'} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors`}>
        <Icon className="w-7 h-7 md:w-8 md:h-8 text-orange-600" />
      </div>
      <h3 className={`font-bold text-base md:text-lg mb-2 ${colors.text}`}>{title}</h3>
      <p className={`${colors.textMuted} text-sm`}>{description}</p>
    </div>
  );

  const RoomCard = ({ title, description, price, image }) => (
    <div className={`${colors.bgCard} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden group">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-semibold text-sm md:text-base">
          ₹{price}/night
        </div>
      </div>
      <div className="p-4 md:p-6">
        <h3 className={`text-xl md:text-2xl font-bold mb-2 md:mb-3 ${colors.text}`}>{title}</h3>
        <p className={`${colors.textMuted} mb-4 text-sm md:text-base`}>{description}</p>
        <div className="flex items-center gap-1 md:gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-4 h-4 md:w-5 md:h-5 fill-orange-400 text-orange-400" />
          ))}
        </div>
        <div className="flex gap-4">
          <a
            href="https://wa.link/at5ion"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-orange-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold text-center hover:bg-orange-700 transition-all text-sm md:text-base"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className={`font-sans ${colors.bg} transition-colors duration-300`}>
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? `${colors.navBg} shadow-lg py-3 md:py-4` 
            : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="text-xl md:text-2xl font-bold">
            <span className={`${isScrolled ? 'text-orange-600' : 'text-white'}`}>Kingsukh</span>
            <span className={`${isScrolled ? (isDarkMode ? 'text-white' : 'text-gray-800') : 'text-orange-400'}`}> Guest House</span>
          </div>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {['home', 'about', 'rooms', 'services', 'gallery', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize font-medium transition-colors ${
                  activeSection === section
                    ? isScrolled
                      ? 'text-orange-600'
                      : 'text-orange-400'
                    : isScrolled
                    ? `${isDarkMode ? 'text-gray-300 hover:text-orange-600' : 'text-gray-700 hover:text-orange-600'}`
                    : 'text-white hover:text-orange-400'
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <DarkModeToggle 
              isDarkMode={isDarkMode} 
              toggleDarkMode={toggleDarkMode} 
              isScrolled={isScrolled} 
            />
            <a
              href="https://wa.link/at5ion"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-600 text-white px-5 xl:px-6 py-2.5 xl:py-3 rounded-full font-semibold hover:bg-orange-700 transition-all transform hover:scale-105 text-sm xl:text-base"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <DarkModeToggle 
              isDarkMode={isDarkMode} 
              toggleDarkMode={toggleDarkMode} 
              isScrolled={isScrolled} 
            />
            <button
              className={`${isScrolled ? (isDarkMode ? 'text-white' : 'text-gray-800') : 'text-white'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`lg:hidden ${colors.bgAlt} shadow-lg mt-4 py-4 absolute w-full`}>
            {['home', 'about', 'rooms', 'services', 'gallery', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`block w-full text-left px-6 py-3 capitalize ${colors.bgHover} ${colors.text} hover:text-orange-600 transition-colors`}
              >
                {section}
              </button>
            ))}
            <a
              href="https://wa.link/at5ion"
              target="_blank"
              rel="noopener noreferrer"
              className="block mx-6 mt-4 bg-orange-600 text-white px-6 py-3 rounded-full font-semibold text-center hover:bg-orange-700"
            >
              Book Now
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen min-h-[600px]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
        <div className="absolute inset-0 overflow-hidden">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url('${img.url}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}
        </div>

        <div className="relative z-20 h-full flex items-center">
          <div className="container mx-auto px-4 md:px-6 text-white">
            <div className="max-w-3xl">
              <p className="text-orange-400 text-sm md:text-lg mb-3 md:mb-4 font-semibold tracking-wider">
                SIMPLE - UNIQUE - FRIENDLY
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                Make Yourself At Home
                <br />
                <span className="text-orange-400">In Our Guest House</span>
              </h1>
              <p className="text-base md:text-xl mb-6 md:mb-8 text-gray-200">
                Experience tranquility surrounded by the scenic beauty of Purulia&apos;s hills and dams
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <a
                  href="https://wa.link/at5ion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-orange-700 transition-all transform hover:scale-105 shadow-xl text-center"
                >
                  Book Your Stay
                </a>
                <button
                  onClick={() => scrollToSection('about')}
                  className="inline-block border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-white hover:text-gray-800 transition-all text-center"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Indicators */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center gap-2 pb-6 md:pb-8">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-orange-500 w-6 md:w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Scroll Down Indicator - Hidden on mobile */}
        <div className="hidden md:block absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-2 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-12 md:py-20 ${colors.bgAlt} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={reception} alt="Guest House Reception" className="w-full h-[300px] md:h-[500px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-orange-600 text-white p-4 md:p-8 rounded-2xl shadow-xl">
                <div className="text-2xl md:text-4xl font-bold">150+</div>
                <div className="text-xs md:text-sm">Happy Guests</div>
              </div>
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 bg-white p-4 md:p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 md:w-6 md:h-6 fill-orange-400 text-orange-400" />
                  <span className="text-xl md:text-2xl font-bold text-gray-800">5.0</span>
                </div>
                <div className="text-xs md:text-sm text-gray-600">Guest Rating</div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <p className="text-orange-600 font-semibold mb-2 tracking-wider text-sm md:text-base">ABOUT US</p>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 ${colors.text}`}>The Best Holidays Start Here!</h2>
              <p className={`${colors.textMuted} mb-4 md:mb-6 leading-relaxed text-sm md:text-base`}>
                Embark on a tranquil journey at our Kingsukh Guest House, enveloped by the scenic allure of Biharinath
                Hill, Baranti Hill, Susunia Hill, Joychandi Hill, Garhpanchkot, Baranti Dam, Maithon Dam, and the
                captivating Panchat Dam.
              </p>
              <p className={`${colors.textMuted} mb-6 md:mb-8 leading-relaxed text-sm md:text-base`}>
                Revel in the embrace of comfort, relish delightful meals, and unwind in our verdant garden oasis. Your
                ideal retreat beckons, promising a harmonious blend of nature&apos;s beauty and heartfelt hospitality.
              </p>

              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className={`${colors.text} font-medium text-sm md:text-base`}>Beside Barshal Water Tank, Manpur, Barhanti</p>
                    <p className={`${colors.textMuted} text-sm`}>West Bengal 723156</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <a href="tel:+919007062180" className={`${colors.text} hover:text-orange-600 transition-colors text-sm md:text-base`}>
                    +91 9007062180
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <a
                    href="mailto:kkghosh0099@gmail.com"
                    className={`${colors.text} hover:text-orange-600 transition-colors text-sm md:text-base`}
                  >
                    kkgosh0099@gmail.com
                  </a>
                </div>
              </div>

              <a
                href="https://wa.link/at5ion"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold hover:bg-orange-700 transition-all transform hover:scale-105 text-sm md:text-base"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className={`py-12 md:py-20 ${colors.bg} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-orange-600 font-semibold mb-2 tracking-wider text-sm md:text-base">OUR LIVING ROOM</p>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${colors.text}`}>The Most Memorable Rest Time Starts Here</h2>
            <p className={`${colors.textMuted} mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base`}>
              Choose from our carefully designed rooms that offer comfort, elegance, and a peaceful atmosphere for your
              perfect getaway.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <RoomCard
              title="Cozy Haven Room"
              description="Escape to comfort in our Cozy Haven Room, a snug retreat designed for intimate relaxation. Perfect for couples or solo travelers."
              price="1000"
              image={roomYellow}
            />
            <RoomCard
              title="Spacious Serenity Suite"
              description="Indulge in luxury and ample space in our Spacious Serenity Suite, where tranquility meets roomy elegance. Ideal for families."
              price="1500"
              image={roomPinkWide}
            />
          </div>

          {/* Room Features */}
          <div className={`mt-10 md:mt-16 ${colors.bgCard} rounded-2xl p-6 md:p-8 shadow-lg`}>
            <h3 className={`text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 ${colors.text}`}>Room Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {[
                { icon: '🛏️', text: 'Comfortable Beds' },
                { icon: '📶', text: 'Free WiFi' },
                { icon: '🚿', text: 'Hot Water' },
                { icon: '❄️', text: 'Air Conditioning' },
                { icon: '📺', text: 'Television' },
                { icon: '🧹', text: 'Daily Housekeeping' },
                { icon: '🅿️', text: 'Free Parking' },
                { icon: '🌅', text: 'Scenic Views' },
              ].map((amenity, index) => (
                <div key={index} className={`flex items-center gap-2 md:gap-3 p-2 md:p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                  <span className="text-xl md:text-2xl">{amenity.icon}</span>
                  <span className={`${colors.text} font-medium text-xs md:text-base`}>{amenity.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-12 md:py-20 ${colors.bgAlt} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-orange-600 font-semibold mb-2 tracking-wider text-sm md:text-base">SERVICES</p>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${colors.text}`}>Strive Only For The Best</h2>
            <p className={`${colors.textMuted} mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base`}>
              We provide exceptional services to make your stay comfortable and memorable.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-10 md:mb-16">
            <ServiceCard icon={Shield} title="High Class Security" description="24/7 security for your peace of mind" />
            <ServiceCard icon={Calendar} title="24 Hours Room Service" description="Round-the-clock assistance" />
            <ServiceCard icon={Utensils} title="Restaurant" description="Delicious local cuisine" />
            <ServiceCard icon={MapPinned} title="Tourist Guide Support" description="Explore with local expertise" />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
            <StatCard number="100+" label="Bookings Completed" icon={Calendar} />
            <StatCard number="150+" label="Happy Customers" icon={Users} />
            <StatCard number="5.0" label="Rating" icon={Star} />
          </div>

          {/* Nearby Attractions */}
          <div className="mt-10 md:mt-16">
            <h3 className={`text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 ${colors.text}`}>Nearby Attractions</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 md:p-6 hover:shadow-lg transition-shadow`}>
                <img
                  src={baranti}
                  alt="Baranti Dam / Lake"
                  className="w-full h-32 md:h-40 object-cover rounded-lg mb-3 md:mb-4"
                />
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`font-bold ${colors.text} text-sm md:text-base`}>Baranti Dam</h4>
                  <span className="text-orange-600 text-xs md:text-sm font-medium">2 km</span>
                </div>
                <p className={`${colors.textMuted} text-xs md:text-sm`}>
                  A beautiful reservoir surrounded by hills, famous for peaceful sunsets.
                </p>
              </div>

              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 md:p-6 hover:shadow-lg transition-shadow`}>
                <img src={ayodhya} alt="Ayodhya Pahar" className="w-full h-32 md:h-40 object-cover rounded-lg mb-3 md:mb-4" />
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`font-bold ${colors.text} text-sm md:text-base`}>Ayodhya Pahar</h4>
                  <span className="text-orange-600 text-xs md:text-sm font-medium">35 km</span>
                </div>
                <p className={`${colors.textMuted} text-xs md:text-sm`}>
                  A scenic hill range with dense forests, trekking routes and viewpoints.
                </p>
              </div>

              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 md:p-6 hover:shadow-lg transition-shadow sm:col-span-2 md:col-span-1`}>
                <img
                  src={hillRoad}
                  alt="Scenic Hill Road"
                  className="w-full h-32 md:h-40 object-cover rounded-lg mb-3 md:mb-4"
                />
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`font-bold ${colors.text} text-sm md:text-base`}>Scenic Hill Road</h4>
                  <span className="text-orange-600 text-xs md:text-sm font-medium">Nearby</span>
                </div>
                <p className={`${colors.textMuted} text-xs md:text-sm`}>
                  Winding hill road offering panoramic views of the valley and hills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className={`py-12 md:py-20 ${colors.bg} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-orange-600 font-semibold mb-2 tracking-wider text-sm md:text-base">GALLERY</p>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${colors.text}`}>Explore Our Beautiful Property</h2>
            <p className={`${colors.textMuted} mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base`}>
              Take a visual tour of our guest house and the stunning surroundings that await you.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-lg md:rounded-xl cursor-pointer group ${
                  index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2 h-40 md:h-auto' : 'h-40 md:h-64'
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 md:p-4">
                  <p className="text-white font-semibold text-xs md:text-base">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-orange-400 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <p className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 text-white text-base md:text-xl font-semibold text-center px-4">
              {selectedImage.alt}
            </p>
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-12 md:py-20 ${colors.bgAlt} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-orange-600 font-semibold mb-2 tracking-wider text-sm md:text-base">CONTACT US</p>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${colors.text}`}>Get In Touch</h2>
            <p className={`${colors.textMuted} mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base`}>
              Have questions or ready to book? Reach out to us and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <div>
              <h3 className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 ${colors.text}`}>Contact Information</h3>

              <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 ${isDarkMode ? 'bg-orange-900/50' : 'bg-orange-100'} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${colors.text} mb-1 text-sm md:text-base`}>Address</h4>
                    <p className={`${colors.textMuted} text-sm md:text-base`}>
                      Beside Barshal Water Tank, Manpur, Barhanti, West Bengal 723156
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 ${isDarkMode ? 'bg-orange-900/50' : 'bg-orange-100'} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${colors.text} mb-1 text-sm md:text-base`}>Email</h4>
                    <a
                      href="mailto:kkghosh0099@gmail.com"
                      className={`${colors.textMuted} hover:text-orange-600 transition-colors text-sm md:text-base`}
                    >
                      kkgosh0099@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 ${isDarkMode ? 'bg-orange-900/50' : 'bg-orange-100'} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${colors.text} mb-1 text-sm md:text-base`}>Phone</h4>
                    <a
                      href="tel:+919007062180"
                      className={`${colors.textMuted} hover:text-orange-600 transition-colors text-sm md:text-base`}
                    >
                      +91 9007062180
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mb-6 md:mb-8">
                <h4 className={`font-semibold ${colors.text} mb-4 text-sm md:text-base`}>Follow Us</h4>
                <div className="flex gap-3 md:gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 md:w-12 md:h-12 bg-orange-600 rounded-full flex items-center justify-center text-white hover:bg-orange-700 transition-all transform hover:scale-110"
                  >
                    <Facebook size={18} />
                  </a>
                  <a
                    href="https://www.instagram.com/kingsukhguesthouse/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 bg-orange-600 rounded-full flex items-center justify-center text-white hover:bg-orange-700 transition-all transform hover:scale-110"
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 md:w-12 md:h-12 bg-orange-600 rounded-full flex items-center justify-center text-white hover:bg-orange-700 transition-all transform hover:scale-110"
                  >
                    <Youtube size={18} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 md:w-12 md:h-12 bg-orange-600 rounded-full flex items-center justify-center text-white hover:bg-orange-700 transition-all transform hover:scale-110"
                  >
                    <Twitter size={18} />
                  </a>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.902451087621!2d86.8635!3d23.5505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAxLjgiTiA4NsKwNTEnNDguNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kingsukh Guest House Location"
                  className="md:h-[250px]"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-2xl p-6 md:p-8`}>
              <h3 className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 ${colors.text}`}>Send a Message</h3>

              {formSubmitted && (
                <div className="mb-4 md:mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm md:text-base">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block ${colors.text} font-medium mb-2 text-sm md:text-base`}>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className={`w-full px-4 py-2.5 md:py-3 rounded-lg border ${
                        formErrors.firstName ? 'border-red-500' : colors.border
                      } ${colors.bgInput} ${colors.text} focus:outline-none focus:border-orange-500 transition-colors text-sm md:text-base`}
                    />
                    {formErrors.firstName && (
                      <p className="text-red-500 text-xs md:text-sm mt-1">{formErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className={`block ${colors.text} font-medium mb-2 text-sm md:text-base`}>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className={`w-full px-4 py-2.5 md:py-3 rounded-lg border ${
                        formErrors.lastName ? 'border-red-500' : colors.border
                      } ${colors.bgInput} ${colors.text} focus:outline-none focus:border-orange-500 transition-colors text-sm md:text-base`}
                    />
                    {formErrors.lastName && (
                      <p className="text-red-500 text-xs md:text-sm mt-1">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className={`block ${colors.text} font-medium mb-2 text-sm md:text-base`}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className={`w-full px-4 py-2.5 md:py-3 rounded-lg border ${
                      formErrors.email ? 'border-red-500' : colors.border
                    } ${colors.bgInput} ${colors.text} focus:outline-none focus:border-orange-500 transition-colors text-sm md:text-base`}
                  />
                  {formErrors.email && <p className="text-red-500 text-xs md:text-sm mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className={`block ${colors.text} font-medium mb-2 text-sm md:text-base`}>Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter your 10-digit mobile number"
                    className={`w-full px-4 py-2.5 md:py-3 rounded-lg border ${
                      formErrors.mobile ? 'border-red-500' : colors.border
                    } ${colors.bgInput} ${colors.text} focus:outline-none focus:border-orange-500 transition-colors text-sm md:text-base`}
                  />
                  {formErrors.mobile && <p className="text-red-500 text-xs md:text-sm mt-1">{formErrors.mobile}</p>}
                </div>

                <div>
                  <label className={`block ${colors.text} font-medium mb-2 text-sm md:text-base`}>Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message here..."
                    rows="4"
                    className={`w-full px-4 py-2.5 md:py-3 rounded-lg border ${
                      formErrors.message ? 'border-red-500' : colors.border
                    } ${colors.bgInput} ${colors.text} focus:outline-none focus:border-orange-500 transition-colors resize-none text-sm md:text-base`}
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-red-500 text-xs md:text-sm mt-1">{formErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg text-sm md:text-base"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${colors.footerBg} text-white py-12 md:py-16`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <div className="text-xl md:text-2xl font-bold mb-4">
                <span className="text-orange-500">Kingsukh</span>
                <span className="text-white"> Guest House</span>
              </div>
              <p className="text-gray-400 mb-6 text-sm md:text-base">
                Your perfect retreat in the heart of Purulia, offering comfort, tranquility, and unforgettable
                experiences.
              </p>
              <div className="flex gap-3 md:gap-4">
                <a
                  href="#"
                  className="w-9 h-9 md:w-10 md:h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white transition-all"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://www.instagram.com/kingsukhguesthouse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 md:w-10 md:h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white transition-all"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 md:w-10 md:h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white transition-all"
                >
                  <Youtube size={16} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 md:w-10 md:h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white transition-all"
                >
                  <Twitter size={16} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base md:text-lg font-bold mb-4 md:mb-6">Quick Links</h4>
              <ul className="space-y-2 md:space-y-3">
                {['Home', 'About', 'Rooms', 'Services', 'Gallery', 'Contact'].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollToSection(link.toLowerCase())}
                      className="text-gray-400 hover:text-orange-500 transition-colors text-sm md:text-base"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-base md:text-lg font-bold mb-4 md:mb-6">Our Services</h4>
              <ul className="space-y-2 md:space-y-3">
                {['Room Service', 'Restaurant', 'Tourist Guide', 'Parking', 'Security', 'WiFi'].map((service) => (
                  <li key={service}>
                    <span className="text-gray-400 text-sm md:text-base">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-base md:text-lg font-bold mb-4 md:mb-6">Contact Info</h4>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-400 text-sm md:text-base">
                    Beside Barshal Water Tank, Manpur, Barhanti, West Bengal 723156
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <a href="tel:+919007062180" className="text-gray-400 hover:text-orange-500 transition-colors text-sm md:text-base">
                    +91 9007062180
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <a
                    href="mailto:kkghosh0099@gmail.com"
                    className="text-gray-400 hover:text-orange-500 transition-colors text-sm md:text-base"
                  >
                    kkgosh0099@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-center md:text-left text-xs md:text-sm">
                © {new Date().getFullYear()} Kingsukh Guest House. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-xs md:text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-xs md:text-sm">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-xs md:text-sm">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {isScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 md:bottom-8 right-4 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-700 transition-all transform hover:scale-110 z-40"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 transform rotate-90" />
        </button>
      )}

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.link/at5ion"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 md:bottom-8 left-4 md:left-8 w-12 h-12 md:w-14 md:h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-all transform hover:scale-110 z-40"
      >
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
};

export default KingsukhGuestHouse;