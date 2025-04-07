
import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';
import { Button } from '@/components/ui/button';
import { ClientLogo } from '@/types/sections';

export interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaSecondaryText: string;
  backgroundImage: string;
  showTrustedClients?: boolean;
  trustedClientsTitle?: string;
  trustedClients?: ClientLogo[];
}

// Fonction pour récupérer les données du Hero
const fetchHeroData = async (): Promise<HeroData> => {
  // Utiliser le nouveau service pour récupérer les données
  const config = getHomepageConfig();
  
  if (config.sectionData && config.sectionData.hero) {
    return config.sectionData.hero as HeroData;
  }
  
  // Valeurs par défaut si aucune données n'est stockée
  return {
    title: 'Solutions numériques innovantes pour votre entreprise',
    subtitle: 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.',
    ctaText: 'Découvrir nos services',
    ctaSecondaryText: 'Nous contacter',
    backgroundImage: '',
    showTrustedClients: true,
    trustedClientsTitle: 'Ils nous font confiance',
    trustedClients: [
      {
        id: '1',
        name: 'Client 1',
        logoUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
      },
      {
        id: '2',
        name: 'Client 2',
        logoUrl: 'https://images.unsplash.com/photo-1614680376408-16afefa3332b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
      },
      {
        id: '3',
        name: 'Client 3',
        logoUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
      },
      {
        id: '4',
        name: 'Client 4',
        logoUrl: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
      }
    ]
  };
};

const Hero = () => {
  const { data: heroData } = useQuery({
    queryKey: ['heroData'],
    queryFn: fetchHeroData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Effet pour animer les éléments au chargement
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('appeared');
        }, 150 * index);
      });
    };
    
    animateElements();
  }, []);

  return (
    <section id="hero" className="relative py-32 md:py-44 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Formes géométriques en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden opacity-70 dark:opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-pink-100 dark:bg-pink-900/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M0 0h1v1H0zM39 0h1v1h-1z\'/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '30px 30px'
        }}
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20">
          {/* Contenu principal */}
          <div className="max-w-3xl animate-on-scroll opacity-0 translate-y-4 transition duration-1000 ease-out">
            <div className="mb-6">
              <span className="inline-block text-sm font-medium bg-primary/10 text-primary px-4 py-1.5 rounded-full animate-on-scroll opacity-0 translate-y-4 transition duration-1000 ease-out">
                Innovation Numérique
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent animate-on-scroll opacity-0 translate-y-4 transition duration-1000 ease-out">
              {heroData?.title || 'Solutions numériques innovantes pour votre entreprise'}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl animate-on-scroll opacity-0 translate-y-4 transition duration-1000 ease-out delay-100">
              {heroData?.subtitle || 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.'}
            </p>
            
            <div className="flex flex-wrap gap-4 animate-on-scroll opacity-0 translate-y-4 transition duration-1000 ease-out delay-200">
              <Button 
                asChild 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-medium rounded-md group"
              >
                <a href="#services">
                  {heroData?.ctaText || 'Découvrir nos services'}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              >
                <a href="#contact">
                  {heroData?.ctaSecondaryText || 'Nous contacter'}
                </a>
              </Button>
            </div>
          </div>
          
          {/* Image ou illustration */}
          <div className="w-full lg:w-2/5 relative animate-on-scroll opacity-0 translate-y-4 transition duration-1000 ease-out delay-300">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-1 border border-gray-200 dark:border-gray-700">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Digital Transformation" 
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>
            
            {/* Éléments de design */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-full opacity-20 blur-lg"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-400 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
        
        {/* Section "Ils nous font confiance" */}
        {heroData?.showTrustedClients && heroData?.trustedClients?.length > 0 && (
          <div className="mt-24 pt-10 border-t border-gray-200 dark:border-gray-800 animate-on-scroll opacity-0 translate-y-4 transition duration-1000 ease-out delay-500">
            <div className="flex flex-col items-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-8">
                {heroData.trustedClientsTitle || 'Ils nous font confiance'}
              </p>
              <div className="flex flex-wrap gap-10 items-center justify-center">
                {heroData.trustedClients.map((client) => (
                  <div key={client.id} className="h-8 md:h-10 w-auto opacity-60 hover:opacity-100 transition-opacity">
                    {client.websiteUrl ? (
                      <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                        <img 
                          src={client.logoUrl} 
                          alt={client.name} 
                          className="h-full w-auto grayscale hover:grayscale-0 transition-all duration-300" 
                          title={client.name}
                        />
                      </a>
                    ) : (
                      <img 
                        src={client.logoUrl} 
                        alt={client.name} 
                        className="h-full w-auto grayscale hover:grayscale-0 transition-all duration-300" 
                        title={client.name}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
