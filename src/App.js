import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Toaster, toast } from 'react-hot-toast';

const SunIcon = () => (
  <svg className="w-6 h-6 sun-icon" fill="none" stroke="#dc7314" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
    />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-6 h-6 moon-icon" fill="#898a88" stroke="#898a88" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

const App = () => {
  // Form state
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [funFact, setFunFact] = useState('');
  const [currentProject, setCurrentProject] = useState('');
  const [openToWork, setOpenToWork] = useState(false);
  const [openToCollab, setOpenToCollab] = useState(false);
  const [mentoring, setMentoring] = useState(false);
  const [selectedTech, setSelectedTech] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [achievements, setAchievements] = useState('');
  const [interests, setInterests] = useState('');
  const [codingPhilosophy, setCodingPhilosophy] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [preferredWorkEnvironment, setPreferredWorkEnvironment] = useState('');
  const [buyMeACoffeeUsername, setBuyMeACoffeeUsername] = useState('');

  const styleBlock = `
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes stars {
      0% {
        opacity: 0;
        transform: scale(0.5);
      }
      50% {
        opacity: 1;
        transform: scale(1.2);
      }
      100% {
        opacity: 0;
        transform: scale(0.5);
      }
    }

    @keyframes floatCloud {
      0% {
        transform: translateX(-50%);
        opacity: 0;
      }
      50% {
      transform: translateX(50%);
        opacity: 0.8;
      }
      100% {
        transform: translateX(100%);
        opacity: 0;
      }
    }

    @keyframes sunRays {
      0% {
        transform: scale(1);
        opacity: 0.8;
      }
      50% {
        transform: scale(1.2);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 0.8;
      }
    }

    .toggle-wrapper {
      position: relative;
      overflow: hidden;
    }

    .toggle-wrapper::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.2) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
    }

    .toggle-wrapper.dark::before {
      opacity: 1;
    }

    .sun-icon {
      animation: ${theme === 'dark' ? 'none' : 'rotate 10s linear infinite'};
      transform-origin: center;
      position: relative;
      z-index: 2;
      color: #FFD700;
    }

    .sun-icon::after {
      content: '';
      position: absolute;
      width: 200%;
      height: 200%;
      top: -50%;
      left: -50%;
      background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
      animation: ${theme === 'dark' ? 'none' : 'sunRays 3s ease-in-out infinite'};
      z-index: 1;
      pointer-events: none;
    }

    .moon-icon {
      animation: ${theme === 'dark' ? 'rotate 10s linear infinite' : 'none'};
      transform-origin: center;
      z-index: 2;
      color: #F4F6F0;
    }

    .star {
      position: absolute;
      background: white;
      border-radius: 50%;
      animation: stars 2s infinite;
      z-index: 1;
    }

    .cloud {
      position: absolute;
      width: 12px;
      height: 6px;
      background: white;
      border-radius: 6px;
      opacity: 0;
      animation: floatCloud 4s linear infinite;
      z-index: 1;
      filter: drop-shadow(0 1px 1px rgba(0,0,0,0.1));
      left: 40px;
    }

    .cloud::before,
    .cloud::after {
      content: '';
      position: absolute;
      top: -3px;
      background: white;
      border-radius: 50%;
    }

    .cloud::before {
      width: 8px;
      height: 8px;
      left: 1px;
    }

    .cloud::after {
      width: 6px;
      height: 6px;
      left: 6px;
    }

    .toggle-circle {
      z-index: 2;
      background: white;
      position: relative;
    }
  `;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Generated markdown state
  const [readme, setReadme] = useState('');

  // Updated tech options
  const techOptions = [
    // Frontend
    { label: 'React', value: 'react', category: 'Frontend', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg' },
    { label: 'Vue.js', value: 'vuejs', category: 'Frontend', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg' },
    { label: 'Angular', value: 'angular', category: 'Frontend', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg' },
    { label: 'Next.js', value: 'nextjs', category: 'Frontend', icon: 'https://cdn.worldvectorlogo.com/logos/nextjs-2.svg' },
    { label: 'Svelte', value: 'svelte', category: 'Frontend', icon: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg' },
    { label: 'TypeScript', value: 'typescript', category: 'Frontend', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg' },
    { label: 'JavaScript', value: 'javascript', category: 'Frontend', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg' },
    { label: 'Tailwind CSS', value: 'tailwind', category: 'Frontend', icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg' },
    
    // Backend
    { label: 'C#', value: 'csharp', category: 'Backend', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg' },
    { label: 'C++', value: 'cpp', category: 'Backend', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg' },
    { label: 'Node.js', value: 'nodejs', category: 'Backend', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg' },
    { label: 'Python', value: 'python', category: 'Backend', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
    { label: 'Django', value: 'django', category: 'Backend', icon: 'https://cdn.worldvectorlogo.com/logos/django.svg' },
    { label: 'Flask', value: 'flask', category: 'Backend', icon: 'https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-icon.svg' },
    { label: 'Java', value: 'java', category: 'Backend', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg' },
    { label: 'Spring', value: 'spring', category: 'Backend', icon: 'https://www.vectorlogo.zone/logos/springio/springio-icon.svg' },
    { label: 'PHP', value: 'php', category: 'Backend', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg' },
    { label: 'Laravel', value: 'laravel', category: 'Backend', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-plain.svg' },
    
    // Database
    { label: 'MongoDB', value: 'mongodb', category: 'Database', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg' },
    { label: 'PostgreSQL', value: 'postgresql', category: 'Database', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg' },
    { label: 'MySQL', value: 'mysql', category: 'Database', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg' },
    { label: 'Redis', value: 'redis', category: 'Database', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg' },
    
    // DevOps & Tools
    { label: 'Docker', value: 'docker', category: 'DevOps', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg' },
    { label: 'Kubernetes', value: 'kubernetes', category: 'DevOps', icon: 'https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg' },
    { label: 'AWS', value: 'aws', category: 'Cloud', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original.svg' },
    { label: 'Git', value: 'git', category: 'Tools', icon: 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg' },
    { label: 'VS Code', value: 'vscode', category: 'Tools', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg' },
    
    // Mobile
    { label: 'React Native', value: 'reactnative', category: 'Mobile', icon: 'https://reactnative.dev/img/header_logo.svg' },
    { label: 'Flutter', value: 'flutter', category: 'Mobile', icon: 'https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg' },
    { label: 'Swift', value: 'swift', category: 'Mobile', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/swift/swift-original.svg' },
    { label: 'Kotlin', value: 'kotlin', category: 'Mobile', icon: 'https://www.vectorlogo.zone/logos/kotlinlang/kotlinlang-icon.svg' },
  ];

  const handleTechSelect = (value) => {
    setSelectedTech(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // Replace the existing select element with this custom dropdown
  const CustomDropdown = () => (
    <div className="relative w-full">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full px-4 py-2.5 text-left bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm flex justify-between items-center"
      >
        <span className="text-gray-700 dark:text-gray-200">
          {selectedTech.length > 0 
            ? `${selectedTech.length} technologies selected`
            : 'Select technologies'}
        </span>
        <svg
          className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {Object.entries(
            techOptions.reduce((acc, item) => {
              if (!acc[item.category]) acc[item.category] = [];
              acc[item.category].push(item);
              return acc;
            }, {})
          ).map(([category, items]) => (
            <div key={category}>
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-600 font-medium text-gray-700 dark:text-gray-200">
                {category}
              </div>
              {items.map((item) => (
                <div
                  key={item.value}
                  onClick={() => handleTechSelect(item.value)}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center space-x-3"
                >
                  <img src={item.icon} alt={item.label} className="w-5 h-5" />
                  <span className="text-gray-700 dark:text-gray-200">{item.label}</span>
                  {selectedTech.includes(item.value) && (
                    <svg className="w-5 h-5 text-blue-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Function to generate the markdown readme
  const generateReadme = () => {
    const techIconsHTML = selectedTech.map(tech => {
      const option = techOptions.find(opt => opt.value === tech);
      if (!option) return '';
      return `<a href="#" target="_blank"><img src="${option.icon}" alt="${option.label}" width="40" height="40" style="margin: 0 4px 8px 4px;"/></a>`;
    }).join('');

    // Create sections only if they have content
    const aboutSection = [
      currentProject && `- 🚀 Working on **${currentProject}**`,
      preferredWorkEnvironment && `- 💼 Preferred work environment: **${preferredWorkEnvironment}**`,
      funFact && `- ⚡ Fun fact: **${funFact}**`
    ].filter(Boolean).join('\n');

    const codingPhilosophySection = codingPhilosophy ? `
### 💭 Coding Philosophy

${codingPhilosophy}
` : '';

    const achievementsSection = achievements ? `
### 🏆 Achievements & Certifications

${achievements}
` : '';

    const interestsSection = interests ? `
### 🎯 Interests & Hobbies

${interests}
` : '';

    const buyMeCoffeeSection = buyMeACoffeeUsername ? `
### ☕ Support My Work

<a href="https://www.buymeacoffee.com/${buyMeACoffeeUsername}">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" >
</a>
` : '';

    const connectSection = [
      email && `- 📫 Email: [${email}](mailto:${email})`,
      portfolio && `- 🌐 Portfolio: [${portfolio}](${portfolio})`,
      linkedin && `- 💼 LinkedIn: [${linkedin}](https://linkedin.com/in/${linkedin})`
    ].filter(Boolean).join('\n');

    // Only generate stats sections if username is provided
    const githubStatsSection = githubUsername ? `### 📊 GitHub Stats

<div align="center" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px;">
<div>
  <img width="600" src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${githubUsername}&theme=radical" alt="GitHub Profile Summary" />
</div>
  <img height="180" src="https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=radical" alt="GitHub Stats" />
  <img height="180" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=radical" alt="Most Used Languages" />
</div>
` : '';

    const markdown = `<div align="center">
  
# Hi there! 👋 I'm ${name}

${role ? `### ${role}` : ''}
${location ? `📍 ${location}` : ''}
${yearsOfExperience ? `💻 ${yearsOfExperience} years of experience` : ''}

${openToWork ? '🔭 **Open to Work!**' : ''}
${openToCollab ? '👯 **Open to Collaboration!**' : ''}
${mentoring ? '📚 **Available for Mentoring!**' : ''}

</div>

---

${aboutSection ? `### 👨‍💻 About Me\n\n${aboutSection}\n\n` : ''}

${codingPhilosophySection}

${achievementsSection}

${interestsSection}

${selectedTech.length > 0 ? `### 🛠 Tech Stack

${techIconsHTML}` : ''}

${githubStatsSection}

${connectSection ? `### 🌐 Connect with me

${connectSection}` : ''}

${buyMeCoffeeSection}

${githubUsername ? `
---

<div align="center">
  <img src="https://komarev.com/ghpvc/?username=${githubUsername}&label=Profile%20views&color=0e75b6&style=flat" alt="Profile views" />
</div>` : ''}

${openToWork ? `
<div align="center">
  
### 🔍 Open to Work!
Feel free to reach out for opportunities!

</div>
` : ''}`;

    return markdown;
  };

  // Update readme preview whenever fields change
  useEffect(() => {
    setReadme(generateReadme());
  }, [
    name,
    role,
    location,
    email,
    githubUsername,
    portfolio,
    linkedin,
    funFact,
    currentProject,
    openToWork,
    openToCollab,
    mentoring,
    selectedTech,
    buyMeACoffeeUsername,
    achievements,
    interests,
    codingPhilosophy,
    yearsOfExperience,
    preferredWorkEnvironment
  ]);

  // Update copyToClipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(readme).then(() => {
      toast.success('README copied to clipboard!', {
        duration: 2000,
        position: 'bottom-right',
        style: {
          background: theme === 'dark' ? '#374151' : '#fff',
          color: theme === 'dark' ? '#fff' : '#000',
        },
      });
    }).catch(() => {
      toast.error('Failed to copy README.', {
        duration: 2000,
        position: 'bottom-right',
        style: {
          background: theme === 'dark' ? '#374151' : '#fff',
          color: theme === 'dark' ? '#fff' : '#000',
        },
      });
    });
  };

  // Update downloadReadme function
  const downloadReadme = () => {
    try {
      const element = document.createElement('a');
      const file = new Blob([readme], {type: 'text/markdown'});
      element.href = URL.createObjectURL(file);
      element.download = 'README.md';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast.success('README downloaded successfully!', {
        duration: 2000,
        position: 'bottom-right',
        style: {
          background: theme === 'dark' ? '#374151' : '#fff',
          color: theme === 'dark' ? '#fff' : '#000',
        },
      });
    } catch (error) {
      toast.error('Failed to download README.', {
        duration: 2000,
        position: 'bottom-right',
        style: {
          background: theme === 'dark' ? '#374151' : '#fff',
          color: theme === 'dark' ? '#fff' : '#000',
        },
      });
    }
  };

  // Add this function to create stars
  const createStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const size = Math.random() * 2 + 1;
      const left = Math.random() * 70;
      const top = Math.random() * 70;
      const delay = Math.random() * 2;
      
      stars.push(
        <div
          key={i}
          className="star"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    return stars;
  };

  // Add this function to create clouds
  const createClouds = () => {
    const clouds = [];
    for (let i = 0; i < 3; i++) {
      const top = 10 + Math.random() * 50;
      const delay = i * 1.5; // More evenly spaced delays
      
      clouds.push(
        <div
          key={i}
          className="cloud"
          style={{
            top: `${top}%`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    return clouds;
  };

  // Add useEffect to handle dark mode class on html element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Preview component for Buy Me a Coffee
  const BuyMeCoffeePreview = () => {
    if (!buyMeACoffeeUsername) return null;
    
    return (
      <div className="mt-4 p-4 border border-yellow-400 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-yellow-600 dark:text-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Support Preview</h4>
              <p className="text-xs text-yellow-600 dark:text-yellow-400">Your Buy Me a Coffee button will appear as:</p>
            </div>
          </div>
          <a 
            href={`https://www.buymeacoffee.com/${buyMeACoffeeUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-yellow-600 dark:text-yellow-400 hover:underline"
          >
            Test Link →
          </a>
        </div>
        <div className="mt-3">
          <img 
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" 
            alt="Buy Me A Coffee" 
            className="h-[60px] w-[217px]"
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`${theme === "light" ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-gray-100"} min-h-screen p-8 font-sans transition-colors duration-200 relative`}>
      <Toaster />
      <div 
        className={`fixed inset-0 ${theme === "light" ? "bg-gray-50" : "bg-gray-900"} transition-colors duration-200 z-0`}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            GitHub Profile README Generator
          </h2>
          <div className="flex items-center space-x-2">
            <style>{styleBlock}</style>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-500 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 toggle-wrapper ${theme === 'dark' ? 'dark' : ''}`}
              style={{
                backgroundColor: theme === 'dark' ? 'rgb(67, 56, 202)' : 'rgb(59, 130, 246)'
              }}
            >
              <span className="sr-only">Toggle theme</span>
              {theme === 'dark' ? createStars() : createClouds()}
              <div
                className={`${
                  theme === 'dark' ? 'translate-x-9' : 'translate-x-0'
                } pointer-events-none flex h-[34px] w-[34px] transform items-center justify-center rounded-full bg-white shadow-lg ring-0 transition duration-500 ease-in-out toggle-circle`}
              >
                {theme === 'dark' ? (
                  <MoonIcon />
                ) : (
                  <SunIcon />
                )}
              </div>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="space-y-5">
              {/* Basic Info Section */}
              <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
              <div>
                <label className="block text-sm font-medium mb-2">Name:</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              {/* Professional Info Section */}
              <h3 className="text-lg font-semibold border-b pb-2 mt-6">Professional Information</h3>
              <div>
                <label className="block text-sm font-medium mb-2">Role:</label>
                <input 
                  type="text" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-colors"
                  placeholder="Senior Full Stack Developer"
                />
              </div>
              
              {/* Status Toggles */}
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={openToWork}
                    onChange={(e) => setOpenToWork(e.target.checked)}
                    className="rounded text-blue-500 focus:ring-blue-500 dark:bg-gray-700"
                  />
                  <span>Open to Work</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={openToCollab}
                    onChange={(e) => setOpenToCollab(e.target.checked)}
                    className="rounded text-blue-500 focus:ring-blue-500 dark:bg-gray-700"
                  />
                  <span>Open to Collaborate</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={mentoring}
                    onChange={(e) => setMentoring(e.target.checked)}
                    className="rounded text-blue-500 focus:ring-blue-500 dark:bg-gray-700"
                  />
                  <span>Available for Mentoring</span>
                </label>
              </div>

              {/* Additional fields... */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Location:</label>
                  <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-colors"
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Current Project:</label>
                  <input 
                    type="text" 
                    value={currentProject} 
                    onChange={(e) => setCurrentProject(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-colors"
                    placeholder="Building an awesome app"
                  />
                </div>
              </div>

              {/* Social Links Section */}
              <h3 className="text-lg font-semibold border-b pb-2 mt-6">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Portfolio Website:</label>
                  <input 
                    type="url" 
                    value={portfolio} 
                    onChange={(e) => setPortfolio(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-colors"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email:</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn Username:</label>
                  <input 
                    type="text" 
                    value={linkedin} 
                    onChange={(e) => setLinkedin(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-colors"
                    placeholder="username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub Username:</label>
                  <input 
                    type="text" 
                    value={githubUsername} 
                    onChange={(e) => setGithubUsername(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-colors"
                    placeholder="username"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    This will be used for GitHub stats, and most used languages.
                  </p>
                </div>
              </div>

              {/* Fun Fact Section */}
              <div>
                <label className="block text-sm font-medium mb-2">Fun Fact About You:</label>
                <input 
                  type="text" 
                  value={funFact} 
                  onChange={(e) => setFunFact(e.target.value)} 
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-colors"
                  placeholder="I love coding while drinking coffee!"
                />
              </div>

              {/* Technologies Section */}
              <h3 className="text-lg font-semibold border-b pb-2 mt-6">Technologies & Tools</h3>
              <div>
                <label className="block text-sm font-medium mb-2">Select your tech stack:</label>
                <CustomDropdown />
              </div>

              {/* New Professional Details Section */}
              <h3 className="text-lg font-semibold border-b pb-2 mt-6">Professional Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Years of Experience:</label>
                  <input 
                    type="text" 
                    value={yearsOfExperience} 
                    onChange={(e) => setYearsOfExperience(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-colors"
                    placeholder="5+ years"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Work Environment:</label>
                  <input 
                    type="text" 
                    value={preferredWorkEnvironment} 
                    onChange={(e) => setPreferredWorkEnvironment(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-colors"
                    placeholder="Remote / Hybrid / On-site"
                  />
                </div>
              </div>

              {/* Additional Sections */}
              <h3 className="text-lg font-semibold border-b pb-2 mt-6">Additional Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">(Optional) Coding Philosophy:</label>
                  <textarea 
                    value={codingPhilosophy} 
                    onChange={(e) => setCodingPhilosophy(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-colors"
                    placeholder="Share your approach to coding and software development..."
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">(Optional) Achievements & Certifications:</label>
                  <textarea 
                    value={achievements} 
                    onChange={(e) => setAchievements(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-colors"
                    placeholder="List your notable achievements, awards, and certifications..."
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">(Optional) Interests & Hobbies:</label>
                  <textarea 
                    value={interests} 
                    onChange={(e) => setInterests(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-colors"
                    placeholder="Share your interests outside of coding..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Buy Me a Coffee Section */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <div className="flex items-center space-x-2">
                    <span>Buy Me a Coffee Username</span>
                    <a
                      href="https://www.buymeacoffee.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:underline"
                    >
                      (Get username)
                    </a>
                  </div>
                </label>
                <input 
                  type="text" 
                  value={buyMeACoffeeUsername} 
                  onChange={(e) => setBuyMeACoffeeUsername(e.target.value)} 
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-colors"
                  placeholder="yourusername"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Enter your Buy Me a Coffee username to add a support button to your profile
                </p>
                <BuyMeCoffeePreview />
              </div>
            </div>
          </form>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-4">Preview README.md</h3>
            <div className="w-full h-[calc(100vh-300px)] overflow-y-auto p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown 
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    // This ensures links open in new tab
                    a: ({node, ...props}) => (
                      <a target="_blank" rel="noopener noreferrer" {...props} />
                    ),
                  }}
                >
                  {readme}
                </ReactMarkdown>
              </div>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={copyToClipboard} 
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-2.5 px-5 rounded-lg hover:opacity-90 transition-opacity shadow-sm"
              >
                📋 Copy to Clipboard
              </button>
              <button 
                onClick={downloadReadme} 
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium py-2.5 px-5 rounded-lg hover:opacity-90 transition-opacity shadow-sm"
              >
                💾 Download README.md
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
