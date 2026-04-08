import { Mail, Phone, MapPin, Github, Linkedin, Send, MessageCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'devenbofficial@gmail.com',
      href: 'mailto:devenbofficial@gmail.com',
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 8369183414',
      href: 'tel:+918369183414',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Kalyan, Maharashtra, India',
      href: null,
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      title: 'GitHub',
      value: 'github.com/Deven-Bagade',
      href: 'https://github.com/Deven-Bagade',
      gradient: 'from-gray-700 to-gray-900',
      bgGradient: 'from-gray-50 to-gray-100'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'deven-bagade-5b092b2b3',
      href: 'https://www.linkedin.com/in/deven-bagade-5b092b2b3',
      gradient: 'from-blue-600 to-blue-700',
      bgGradient: 'from-blue-50 to-blue-100'
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            I'm currently seeking opportunities to contribute to impactful projects. 
            Feel free to reach out if you'd like to collaborate or just have a chat!
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const isHovered = hoveredCard === index;
            const CardWrapper = method.href ? 'a' : 'div';
            
            return (
              <CardWrapper
                key={index}
                href={method.href || undefined}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative block"
              >
                <div className={`h-full bg-white rounded-3xl p-8 shadow-xl border border-gray-200/50 transition-all duration-500 ${
                  isHovered ? 'scale-105 shadow-2xl' : ''
                } ${method.href ? 'cursor-pointer' : ''}`}>
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 text-sm break-words">{method.value}</p>
                  </div>

                  {/* Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${method.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`}></div>
                </div>
              </CardWrapper>
            );
          })}
        </div>

        {/* Social Links */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            const socialIndex = index + contactMethods.length;
            const isHovered = hoveredCard === socialIndex;
            
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredCard(socialIndex)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative block"
              >
                <div className={`h-full bg-white rounded-3xl p-8 shadow-xl border border-gray-200/50 transition-all duration-500 ${
                  isHovered ? 'scale-105 shadow-2xl' : ''
                }`}>
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${social.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {social.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{social.value}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>

                  {/* Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${social.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`}></div>
                </div>
              </a>
            );
          })}
        </div>

        {/* CTA Card */}
        <div className="relative group">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-[2px] shadow-2xl">
            <div className="bg-white rounded-3xl p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl text-gray-900 mb-4">Let's Build Something Great!</h3>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                Open to internships, full-time opportunities, freelance projects, and collaboration. 
                Let's create innovative solutions together!
              </p>
              <a
                href="mailto:devenbofficial@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span className="text-lg">Send Message</span>
              </a>
            </div>
          </div>
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-gray-200/50">
            <p className="text-gray-600">
              © 2025 Deven Bagade · Privacy · Terms · Cookies
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  );
}
