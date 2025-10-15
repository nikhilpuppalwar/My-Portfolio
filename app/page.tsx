"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (scrolled / height) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  return mounted ? progress : 0;
}

function Particles() {
  const [particles, setParticles] = useState<Array<{ left: number; top: number; size: number; delay: number; color: string }>>([]);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const next = Array.from({ length: 18 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 12 + 4,
      delay: Math.random() * 6,
      color: i % 3 === 0 ? "#0ea5e9" : i % 3 === 1 ? "#7c3aed" : "#64748b",
    }));
    setParticles(next);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, background: p.color, animationDelay: `${p.delay}s` }}
        />
      ))}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about", icon: "👤" },
    { label: "Skills", href: "#skills", icon: "⚡" },
    { label: "Projects", href: "#projects", icon: "🚀" },
    { label: "Certificates", href: "#certificates", icon: "🏆" },
    { label: "Education", href: "#education", icon: "🎓" },
    { label: "Experience", href: "#experience", icon: "💼" },
    { label: "Contact", href: "#contact", icon: "📧" },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'backdrop-blur-xl bg-black/80 border-b border-cyan-500/20' : 'backdrop-blur-md bg-black/40'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a 
            href="#home" 
            className="group flex items-center space-x-2 text-white font-bold text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">NP</span>
            </div>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Nikhil DP
            </span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a 
                  href={item.href}
                  className="group relative px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10 flex items-center space-x-2"
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <motion.button
            aria-label="Toggle menu"
            className="lg:hidden relative p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.div>
            <motion.div
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-2 left-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.div>
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2 border-t border-white/10">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="group flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                <motion.div
                  className="ml-auto w-2 h-2 bg-cyan-400 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  );
}

function Section({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className ?? ""}`}>{children}</section>
  );
}

export default function Home() {
  const progress = useScrollProgress();
  const cloudinarySrc = "https://res.cloudinary.com/dkrkxulxx/image/upload/v1755696072/Nikhil_Profile_Image_cbuby7.jpg";
  const unsplashFallback = "https://images.unsplash.com/photo-1603415526960-f8f0a2f9cba6?w=800&q=75&auto=format";
  const [heroSrc, setHeroSrc] = useState<string>(cloudinarySrc);
  const handleHeroError = () => {
    setHeroSrc((prev) => (prev === cloudinarySrc ? "/me.jpg" : unsplashFallback));
  };


  // Skills functionality
  useEffect(() => {
    const skillsGrid = document.getElementById('skills-grid');
    const skillTabs = document.querySelectorAll('.skill-tab');
    
    // Skills data moved inside useEffect to avoid dependency issues
    const skillsData = [
      { name: "Python", category: "programming", icon: "🐍" },
      { name: "Java", category: "programming", icon: "☕" },
      { name: "C++", category: "programming", icon: "⚡" },
      { name: "Kotlin", category: ["programming", "mobile"], icon: "📱" },
      { name: "SQL", category: ["programming", "data_ml"], icon: "🗄️" },
      { name: "DSA", category: "programming", icon: "🧮" },
      { name: "Android Studio", category: "mobile", icon: "🤖" },
      { name: "Firebase", category: "mobile", icon: "🔥" },
      { name: "RESTful APIs", category: "programming", icon: "🌐" },
      { name: "Git / GitHub", category: "programming", icon: "📚" },
      { name: "TensorFlow", category: "data_ml", icon: "🧠" },
      { name: "Scikit-learn", category: "data_ml", icon: "🔬" },
      { name: "Pandas", category: "data_ml", icon: "🐼" },
      { name: "Matplotlib", category: "data_ml", icon: "📊" },
      { name: "Seaborn", category: "data_ml", icon: "📈" },
    ];
    
    function getSkillHtml(skill: { name: string; category: string | string[]; icon: string }) {
      return `
        <div class="group rounded-xl border border-white/10 p-6 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer text-center" data-categories="${Array.isArray(skill.category) ? skill.category.join(',') : skill.category}">
          <div class="text-4xl mb-3">${skill.icon}</div>
          <span class="text-white font-medium">${skill.name}</span>
        </div>
      `;
    }

    function renderSkills(category: string) {
      if (skillsGrid) {
        skillsGrid.innerHTML = '';
        const filteredSkills = skillsData.filter(skill => 
          category === 'all' || 
          (Array.isArray(skill.category) && skill.category.includes(category)) || 
          skill.category === category
        );

        filteredSkills.forEach(skill => {
          skillsGrid.innerHTML += getSkillHtml(skill);
        });
      }
    }

    function setActiveTab(activeCategory: string) {
      skillTabs.forEach(tab => {
        const tabCategory = tab.getAttribute('data-category');
        if (tabCategory === activeCategory) {
          tab.classList.remove('bg-gray-800', 'text-gray-300', 'hover:text-cyan-400');
          tab.classList.add('bg-cyan-600', 'text-white');
        } else {
          tab.classList.remove('bg-cyan-600', 'text-white');
          tab.classList.add('bg-gray-800', 'text-gray-300', 'hover:bg-gray-800', 'hover:text-cyan-400');
        }
      });
    }

    // Initialize skills
    skillTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-category');
        renderSkills(category || 'all');
        setActiveTab(category || 'all');
      });
    });
    
    // Initial render
    renderSkills('all');
    setActiveTab('all');

    // Projects carousel functionality
    const projectsData = [
      {
        title: "Laundry-Mart-App",
        description: "An intuitive Android application for managing laundry services, built with Kotlin, Firebase, and XML layouts. The app provides users with a seamless experience to schedule laundry pickups, view services, track orders, and more.",
        features: [
          "🔹 Splash Screen with Lottie animation",
          "🔹 Onboarding screen with intro text and start button", 
          "🔹 Login / Sign-Up UI (design only)",
          "🔹 Home/Main Screen with:",
          "  • Laundry service menu",
          "  • Schedule Pickup option",
          "  • Track Orders section",
          "  • Eco-friendly laundry tips",
          "  • Offers & Promotions section",
          "  • Customer Reviews",
          "  • User Profile access",
          "🔹 Modern UI Design using XML layouts",
          "🔹 Animations with Lottie for visual appeal"
        ],
        techStack: {
          "Language": "Kotlin",
          "UI Design": "XML Layouts", 
          "Backend Services": "Firebase Realtime Database",
          "Animations": "Lottie",
          "IDE": "Android Studio"
        },
        images: [
          "./images/laundary_mart_photo/mart_home.jpg",
          "./images/laundary_mart_photo/mart_home_layout.jpg",
          "./images/laundary_mart_photo/mart_login.jpg",
          "./images/laundary_mart_photo/mart_signup.jpg",
          "./images/laundary_mart_photo/mart_pickup.jpg",
          "./images/laundary_mart_photo/mart_track.jpg",
          "./images/laundary_mart_photo/mart_profile.jpg",
          "./images/laundary_mart_photo/mart_service_detail.jpg",
        ],
        technologies: ["Android Studio", "Kotlin", "Firebase", "Lottie"]
      },
      {
        title: "Agri Mart",
        description: "Agri Mart is a mobile app that helps farmers list and sell agricultural products directly to buyers. Users can explore products, add them to their cart, and place secure orders.",
        features: [
          "🌱 Product Listing: Farmers can upload product details with images and prices",
          "🛒 Add to Cart & Buy: Buyers can add products to the cart and purchase them",
          "🔐 Login & Signup: Secure authentication for both buyers and sellers",
          "📍 Marketplace Navigation:",
          "  • 🏠 Home: Browse featured products",
          "  • 🔍 Explore: Search and filter by category", 
          "  • 🛒 Cart: Manage selected products before checkout",
          "  • 📦 Orders: Track past purchases",
          "  • 👤 Profile: User details and settings",
          "📝 Product Details Page: Displays product description, price, seller details",
          "💳 Secure Checkout: Supports multiple payment methods for smooth transactions"
        ],
        techStack: {
          "Language": "Kotlin",
          "UI Design": "XML Layouts",
          "Backend Services": "Firebase",
          "Database": "Firebase Realtime Database",
          "IDE": "Android Studio"
        },
        images: [
          "/images/agro_mart/welcome.jpg",
          "/images/agro_mart/listing.jpg",
          "/images/agro_mart/login main.jpg",
          "/images/agro_mart/login.jpg",
          "/images/agro_mart/home.jpg",
          "/images/agro_mart/cart.jpg",
          "/images/agro_mart/profile.jpg",
          "/images/agro_mart/detail.jpg",
        ],
        technologies: ["Android Studio", "Kotlin", "Firebase", "REST APIs"]
      }
    ];

    let currentSlide = 0;
    const slidesContainer = document.getElementById('project-slides-container');
    const dotsContainer = document.getElementById('slide-dots');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');

    function createProjectSlide(project: {
      title: string;
      description: string;
      features: string[];
      techStack: Record<string, string | undefined>;
      images: string[];
      technologies: string[];
    }, index: number) {
      return `
        <div class="project-slide ${index === 0 ? 'active' : ''}" data-slide="${index}">
          <div class="grid lg:grid-cols-2 gap-12 items-start">
            <!-- Phone Mockup -->
            <div class="flex justify-center lg:justify-end">
              <div class="mobile-frame">
                <div id="phone-screen-${index}" class="w-full h-full bg-black overflow-hidden">
                  <img id="phone-image-${index}" src="${project.images[0]}" alt="${project.title} screen" class="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            
            <!-- Project Information -->
            <div class="space-y-6">
              <div class="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                <h3 class="text-3xl font-bold text-white mb-4">${project.title}</h3>
                <p class="text-gray-300 text-lg mb-6">${project.description}</p>
                
                <!-- Features Display -->
                <div class="mb-6">
                  <h4 class="text-xl font-semibold text-cyan-400 mb-3">📱 Features</h4>
                  <div id="features-display-${index}" class="text-gray-300 space-y-1 max-h-48 overflow-y-auto">
                    <!-- Features will be displayed line by line -->
                  </div>
                </div>
                
                <!-- Tech Stack -->
                <div class="mb-6">
                  <h4 class="text-xl font-semibold text-cyan-400 mb-3">🚧 Tech Stack</h4>
                  <div class="grid grid-cols-2 gap-2 text-sm">
                    ${Object.entries(project.techStack).map(([key, value]) => `
                      <div class="flex justify-between">
                        <span class="text-gray-400">${key}:</span>
                        <span class="text-white">${value}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
                
                <!-- Technology Tags -->
                <div class="flex flex-wrap gap-2">
                  ${project.technologies.map((tech: string) => 
                    `<span class="px-3 py-1 bg-cyan-600/20 text-cyan-400 rounded-full text-sm border border-cyan-600/30">${tech}</span>`
                  ).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function createDots() {
      if (dotsContainer) {
        dotsContainer.innerHTML = '';
        projectsData.forEach((_, index) => {
          const dot = document.createElement('button');
          dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${index === 0 ? 'bg-cyan-400' : 'bg-gray-600 hover:bg-gray-500'}`;
          dot.setAttribute('data-slide', index.toString());
          dot.addEventListener('click', () => goToSlide(index));
          dotsContainer.appendChild(dot);
        });
      }
    }

    function goToSlide(slideIndex: number) {
      const slides = document.querySelectorAll('.project-slide');
      const dots = document.querySelectorAll('#slide-dots button');
      
      // Clear any existing feature display
      if ((window as Window & { clearFeatureDisplay?: () => void }).clearFeatureDisplay) {
        (window as Window & { clearFeatureDisplay?: () => void }).clearFeatureDisplay!();
      }
      
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === slideIndex);
        (slide as HTMLElement).style.display = index === slideIndex ? 'block' : 'none';
        (slide as HTMLElement).style.opacity = index === slideIndex ? '1' : '0';
      });
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('bg-cyan-400', index === slideIndex);
        dot.classList.toggle('bg-gray-600', index !== slideIndex);
      });
      
      currentSlide = slideIndex;
      
      // Start features display for the new slide
      setTimeout(() => {
        displayFeaturesLineByLine(slideIndex);
      }, 500);
    }

    function nextSlide() {
      const nextIndex = (currentSlide + 1) % projectsData.length;
      goToSlide(nextIndex);
    }

    function prevSlide() {
      const prevIndex = (currentSlide - 1 + projectsData.length) % projectsData.length;
      goToSlide(prevIndex);
    }

    // Phone screen image rotation
    function rotatePhoneImages() {
      projectsData.forEach((project: {
        title: string;
        images: string[];
      }, projectIndex: number) => {
        const phoneImage = document.getElementById(`phone-image-${projectIndex}`);
        if (phoneImage) {
          let imageIndex = 0;
        setInterval(() => {
          imageIndex = (imageIndex + 1) % project.images.length;
          (phoneImage as HTMLImageElement).src = project.images[imageIndex];
          (phoneImage as HTMLImageElement).alt = `${project.title} screen ${imageIndex + 1}`;
        }, 3000); // Change image every 3 seconds
        }
      });
    }

    // Line-by-line text display
    function displayFeaturesLineByLine(projectIndex: number) {
      const featuresDisplay = document.getElementById(`features-display-${projectIndex}`);
      if (featuresDisplay && projectsData[projectIndex]) {
        const project = projectsData[projectIndex] as {
          features: string[];
        };
        let currentLine = 0;
        
        const displayNextLine = () => {
          if (currentLine < project.features.length) {
            const lineElement = document.createElement('div');
            lineElement.className = 'console-line';
            lineElement.textContent = project.features[currentLine];
            featuresDisplay.appendChild(lineElement);
            currentLine++;
          } else {
            // Reset after showing all lines
            setTimeout(() => {
              featuresDisplay.innerHTML = '';
              currentLine = 0;
            }, 2000);
          }
        };

        // Start displaying lines
        const interval = setInterval(displayNextLine, 800); // Show new line every 800ms
        
        // Clear interval when slide changes
        const clearIntervalOnSlideChange = () => {
          clearInterval(interval);
        };
        
        // Store clear function for later use
        (window as Window & { clearFeatureDisplay?: () => void }).clearFeatureDisplay = clearIntervalOnSlideChange;
      }
    }

    function initCarousel() {
      if (slidesContainer) {
        slidesContainer.innerHTML = projectsData.map((project, index) => 
          createProjectSlide(project, index)
        ).join('');
        
        createDots();
        
        if (prevButton) prevButton.addEventListener('click', prevSlide);
        if (nextButton) nextButton.addEventListener('click', nextSlide);
        
        // Initialize phone image rotation
        rotatePhoneImages();
        
        // Initialize features display for first slide
        displayFeaturesLineByLine(0);
        
        // Auto-advance slides every 8 seconds
        setInterval(nextSlide, 8000);
      }
    }

    initCarousel();
  }, []);

  return (
    <div className="relative font-sans">
      <div id="scroll-progress" style={{ width: `${progress}%` }} />
      <Header />
      {/* Hero */}
      <div id="home" className="relative pt-28 overflow-hidden gradient-bg">
        <Particles />
        <Section id="hero" className="py-16 md:py-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                Nikhil Dilip Puppalwar
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="mt-3 text-lg md:text-xl text-gray-300">
                Computer Engineering Student | Android Developer | AI/ML Enthusiast
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.6 }} className="mt-6 text-gray-400">
                “Transforming ideas into apps and intelligent solutions”
              </motion.p>
              <div className="mt-8 flex gap-3">
                <a href="#projects" className="px-4 py-2 rounded bg-white text-black font-medium hover:opacity-90">View Projects</a>
                <a href="#contact" className="px-4 py-2 rounded border border-white/20 text-white hover:bg-white/10">Contact</a>
              </div>
            </div>
            <div className="relative h-64 md:h-[420px]">
              <Image
                src={heroSrc}
                alt="Portrait"
                fill
                priority
                onError={handleHeroError}
                className="object-cover rounded-xl border border-white/10 shadow-2xl"
              />
            </div>
          </div>
        </Section>
      </div>

      {/* Marquee */}
      <Section id="companies" className="py-10">
        <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">Places I have worked with in the past</p>
        <div className="relative overflow-hidden border border-white/10 rounded-lg">
          <div className="flex items-center gap-16 animate-[marquee_20s_linear_infinite] p-6 [--tw-translate-x:0]">
            {[
              { name: "SPACE For Early Childhood Education", color: "bg-blue-500" },
              { name: "Infosys Springboard", color: "bg-green-500" },
              { name: "PCCoE", color: "bg-purple-500" },
            ].map((company, i) => (
              <div key={i} className="shrink-0 opacity-80 hover:opacity-100 transition-opacity">
                <div className={`${company.color} text-white px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap`}>
                  {company.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </Section>

      {/* About */}
      <Section id="about" className="py-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">About Me</h2>
          <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
            Hi, I&apos;m Nikhil Puppalwar, a passionate and detail-oriented Computer Engineering student with a strong interest in mobile app development, data science, and machine learning. I enjoy transforming innovative ideas into real-world applications that create impact and solve meaningful problems.
          </p>
          <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed mt-4">
            I have hands-on experience building Android apps using Kotlin, Firebase, and Cloud services, and I&apos;ve also worked on projects involving data analysis, predictive modeling, and AI-based solutions. I&apos;m always eager to explore new technologies, contribute to open-source projects, and continuously improve my technical and creative skills.
          </p>
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Skills</h2>
          <p className="text-gray-400 text-lg">Technologies and tools I work with</p>
        </div>
        
        {/* Skill Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="skill-tab px-6 py-3 rounded-lg bg-cyan-600 text-white font-medium transition-all duration-300" data-category="all">
            All Skills
          </button>
          <button className="skill-tab px-6 py-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-800 hover:text-cyan-400 font-medium transition-all duration-300" data-category="programming">
            Programming
          </button>
          <button className="skill-tab px-6 py-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-800 hover:text-cyan-400 font-medium transition-all duration-300" data-category="mobile">
            Mobile Development
          </button>
          <button className="skill-tab px-6 py-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-800 hover:text-cyan-400 font-medium transition-all duration-300" data-category="data_ml">
            Data & ML
          </button>
        </div>

        {/* Skills Grid */}
        <div id="skills-grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {/* Skills will be dynamically rendered here */}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-gray-400 text-lg">My recent work and side projects</p>
          <div id="slide-dots" className="flex justify-center space-x-2 mt-6 mb-8">
            {/* Dots will be generated here */}
          </div>
        </div>

        <div className="project-carousel-container relative">
          <div id="project-slides-container">
            {/* Slides will be injected here */}
          </div>
          
          {/* Navigation Buttons */}
          <button id="prev-slide" className="absolute left-0 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800 text-white rounded-full shadow-lg z-10 hover:bg-gray-700 transition">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button id="next-slide" className="absolute right-0 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800 text-white rounded-full shadow-lg z-10 hover:bg-gray-700 transition">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience</h2>
          <p className="text-gray-400 text-lg">My professional journey and internships</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-white/10 p-8 bg-white/5 hover:bg-white/10 transition-all duration-300">
            <div className="text-xl font-semibold text-white mb-3">💻 Android App Development Intern</div>
            <div className="text-cyan-400 font-medium mb-2">SPACE For Early Childhood Education</div>
            <p className="text-gray-400">Built & enhanced Android apps with modern UI/UX design principles</p>
          </div>
          <div className="rounded-xl border border-white/10 p-8 bg-white/5 hover:bg-white/10 transition-all duration-300">
            <div className="text-xl font-semibold text-white mb-3">🎓 Infosys Springboard Internship 6.0</div>
            <div className="text-cyan-400 font-medium mb-2">AI/ML Specialization</div>
            <p className="text-gray-400">Learned AI/software practices and machine learning fundamentals</p>
          </div>
        </div>
      </Section>


      {/* Certificates */}
      <Section id="certificates" className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Licenses & Certifications</h2>
          <p className="text-gray-400 text-lg">Professional certifications and achievements</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Basics of Python", issuer: "Coding Ninjas", date: "2024", file: "certificate_coding_ninjas_basic_python.pdf" },
            { title: "Programming in Modern C++", issuer: "NPTEL", date: "2024", file: "Programming_in_Modern_C++_Nptel.pdf" },
            { title: "Introduction to SQL", issuer: "Simplilearn", date: "2024", file: "Introduction_to_SQL.pdf" },
            { title: "Introduction to Deep Learning", issuer: "Infosys Springboard", date: "2024", file: "Introduction_to_Deep_Learning.pdf" },
            { title: "Artificial Intelligence", issuer: "Infosys Springboard", date: "2024", file: "Artificial_Intelligence.pdf" },
            { title: "Computer Vision 101", issuer: "Infosys Springboard", date: "2024", file: "Computer_Vision_101.pdf" },
            { title: "Generative AI", issuer: "Infosys Springboard", date: "2024", file: "Generative_AI_Unleashing.pdf" },
            { title: "Android Development", issuer: "Infosys Springboard", date: "2024", file: "Android_p_-prog.pdf" },
            { title: "Data Science", issuer: "Infosys Springboard", date: "2024", file: "Introduction_to_Data_Science.pdf" },
          ].map((cert, i) => (
            <div key={i} className="group rounded-xl border border-white/10 p-6 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer" onClick={() => {
              const certificateUrl = `/certificates/${cert.file}`;
              console.log('Opening certificate:', certificateUrl);
              const newWindow = window.open(certificateUrl, '_blank');
              if (!newWindow) {
                alert('Please allow pop-ups for this site to view certificates');
              }
            }}>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 0012 21a12.001 12.001 0 008.618-18.016z" />
                  </svg>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{cert.title}</h3>
              <p className="text-gray-300 mb-1">{cert.issuer}</p>
              <p className="text-sm text-gray-500">{cert.date} • No Expiration</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Hire Me */}
      <Section id="why-hire" className="py-20 bg-gradient-to-b from-gray-900/50 to-transparent rounded-xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Hire Me?</h2>
          <p className="text-gray-400 text-lg">What makes me a valuable team member</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">DSA & Core Engineering</h3>
            <p className="text-gray-400">Strong foundation in Data Structures and Algorithms in C++/Java, ensuring optimal and scalable code for production systems.</p>
          </div>
          
          <div className="text-center p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Mobile Development Expertise</h3>
            <p className="text-gray-400">Developed real-time applications like Agri Mart App using Kotlin/Android Studio and Firebase for dynamic listing and secure services.</p>
          </div>
          
          <div className="text-center p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 12h2m10 0h2M3 12l.463-.248A1.103 1.103 0 015.152 9.47L7.5 5.5m0 0h8.5M12 21v-2m0-4v-2m0-4V9m-3 5h6m-3 6h6m-3 0h-6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Practical Machine Learning</h3>
            <p className="text-gray-400">Hands-on experience with TensorFlow, Scikit-learn, Pandas, and Matplotlib for Data Analysis and feature engineering.</p>
          </div>
        </div>
      </Section>

      {/* Education */}
      <Section id="education" className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Academic Journey</h2>
          <p className="text-gray-400 text-lg">My educational background and achievements</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 p-6 bg-white/5 border-l-4 border-l-cyan-500">
              <h3 className="text-xl font-bold text-white mb-2">B.Tech Computer Engineering</h3>
              <p className="text-gray-300 mb-1">Pimpri Chinchwad College Of Engineering, Pune</p>
              <p className="text-sm text-gray-500 mb-2">2023 - 2027 (Expected Graduation)</p>
              <p className="text-gray-400">Current CGPA: 7.42</p>
            </div>
            
            <div className="rounded-xl border border-white/10 p-6 bg-white/5 border-l-4 border-l-indigo-500">
              <h3 className="text-xl font-bold text-white mb-2">Class XII (MAHARASHTRA BOARD)</h3>
              <p className="text-gray-300 mb-1">Vikas Hindi Vidyalaya, Pandharkawada</p>
              <p className="text-gray-400">Percentage: 71.33%</p>
            </div>
            
            <div className="rounded-xl border border-white/10 p-6 bg-white/5 border-l-4 border-l-purple-500">
              <h3 className="text-xl font-bold text-white mb-2">Class X (CBSE)</h3>
              <p className="text-gray-300 mb-1">Gurukul English Medium School, Pandharkawada</p>
              <p className="text-gray-400">Percentage: 85.50%</p>
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="rounded-xl border border-white/10 p-8 bg-white/5 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Resume & Documents</h3>
              <p className="text-gray-400 mb-6">View my complete resume and professional documents</p>
              <div className="space-y-4">
                <button 
                  onClick={() => window.open('/Nikhil_Puppalwar4.3.pdf', '_blank')}
                  className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  View Resume (PDF)
                </button>
                <button 
                  onClick={() => window.open('/Nikhil_Puppalwar_Hired_Certificate.pdf', '_blank')}
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 0012 21a12.001 12.001 0 008.618-18.016z" />
                  </svg>
                  View Hired Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-gray-400 text-lg">Let&apos;s connect and work together</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Email */}
            <a href="mailto:nikhilpuppalwar16@gmail.com" className="group rounded-xl border border-white/10 p-6 bg-white/5 hover:bg-white/10 transition-all duration-300 text-center flex flex-col items-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-2">Email</h3>
              <p className="text-gray-400 text-sm group-hover:text-white transition-colors px-2">nikhilpuppalwar16@gmail.com</p>
            </a>

            {/* GitHub */}
            <a href="https://github.com/nikhilpuppalwar" target="_blank" rel="noreferrer" className="group rounded-xl border border-white/10 p-6 bg-white/5 hover:bg-white/10 transition-all duration-300 text-center flex flex-col items-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-500/20 flex items-center justify-center group-hover:bg-gray-500/30 transition-colors">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-2">GitHub</h3>
              <p className="text-gray-400 text-sm group-hover:text-white transition-colors px-2">github.com/nikhilpuppalwar</p>
            </a>

            {/* LinkedIn */}
            <a href="https://linkedin.com/in/nikhil-puppalwar" target="_blank" rel="noreferrer" className="group rounded-xl border border-white/10 p-6 bg-white/5 hover:bg-white/10 transition-all duration-300 text-center flex flex-col items-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-2">LinkedIn</h3>
              <p className="text-gray-400 text-sm group-hover:text-white transition-colors">linkedin.com/in/nikhil-puppalwar</p>
            </a>

            {/* Phone */}
            <a href="tel:+919370654064" className="group rounded-xl border border-white/10 p-6 bg-white/5 hover:bg-white/10 transition-all duration-300 text-center flex flex-col items-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-2">Phone</h3>
              <p className="text-gray-400 text-sm group-hover:text-white transition-colors">+91 9370654064</p>
            </a>
          </div>
        </div>
      </Section>

      <footer className="py-10 text-center text-xs text-gray-500" suppressHydrationWarning>© {new Date().getFullYear()} Nikhil Dilip Puppalwar</footer>
    </div>
  );
}
