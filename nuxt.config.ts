export default defineNuxtConfig({
  app:{
    head:{
      title:'FreeTempMail',
      meta:[
        { 
          name: 'google-site-verification', 
          content: process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE  // Google Search Console verification code  
        }
      ]
    }
  },
  ssr: true,
  compatibilityDate: '2024-11-01',  
  devtools: { enabled: false },


  css:['~/assets/css/tailwind.css','~/assets/css/fonts.css'],


  modules:[
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/plausible',
    '@nuxtjs/sitemap',
    'nuxt-llms'
  ],
  i18n: {
    strategy: 'prefix_except_default',
    locales: ['en-US', 'zh-CN','JP'],
    defaultLocale: 'en-US',
    vueI18n: '@@/i18n/config.ts',
  },
  llms: {
    domain: 'https://mail.scu.edu.kg',
    title: 'Free Temporary Email | FreeTempMail',
    description: 'FreeTempMail is a free temporary email service that allows you to create disposable email addresses to protect your privacy. No registration required, instant generation, automatic email reception.',
    sections: [
      {
        title: 'FreeTempMail',
        description: 'FreeTempMail is a free temporary email service that allows you to create disposable email addresses to protect your privacy. No registration required, instant generation, automatic email reception.',
        links: [
          {
            title: 'FreeTempMail `s Features',
            description: 'FreeTempMail is a free temporary email service that allows you to create disposable email addresses to protect your privacy. No registration required, instant generation, automatic email reception.',
            href: 'https://mail.scu.edu.kg/#features',
          },
          {
            title: 'FreeTempMail `s testimonials',
            description: 'What Our Customers Say?.',
            href: 'https://mail.scu.edu.kg/#testimonials',
          },
          {
            title: 'FreeTempMail `s faq',
            description: 'the most frequently asked questions.',
            href: 'https://mail.scu.edu.kg/#faq',
          }
        ]
      }
    ]
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  sitemap: {
    defaults: {
      changefreq: 'daily',
      priority: 0.8
    }
  },

  runtimeConfig: {

    // Server
    name: 'jackson',
    environment: process.env.NODE_ENV || 'development',
   public: {
      env: process.env.NUXT_PUBLIC_ENV || 'development',
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      domainUrl: process.env.NUXT_PUBLIC_DOMAIN_URL,
      isServer: true,
      plausible: {
        domain: process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN,
        apiHost: process.env.NUXT_PUBLIC_PLAUSIBLE_API_HOST,
        ignoredHostnames: ['localhost', '127.0.0.1'],
        autoOutboundTracking: true,
        enabled: true,
      },
    },
    // The private keys which are only available on the server-side
  },
  devServer: {
    port: Number(process.env.PORT) || 3000,
    host: '0.0.0.0'
  },
  vite: {
    server: {
      allowedHosts: ['mail.scu.edu.kg'] 
    }
  }
})
