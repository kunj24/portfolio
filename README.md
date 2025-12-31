# 🚀 Kunj Mungalpara - Portfolio Website

[![License](https://img.shields.io/github/license/kunj24/portfolio?style=flat-square)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

> A modern, interactive portfolio website showcasing my projects, skills, and experience as a Full Stack Developer and AI/ML enthusiast.

**Live Demo:** [Your Deployed URL Here]

---

## ✨ Features

### 🎨 **Visual Excellence**
- **Interactive 3D Hero Section** - Stunning Three.js animations with React Three Fiber
- **Custom Cursor System** - Multiple cursor variants for enhanced UX (desktop only)
- **Smooth Scroll Animations** - GSAP-powered transitions and reveal effects
- **Dark/Light Theme** - Persistent theme switching with smooth transitions
- **Chroma Grid Effects** - Dynamic glowing skill cards with hover interactions

### 📱 **Responsive Design**
- **Mobile-First Approach** - Optimized for all screen sizes
- **Touch-Friendly** - Smart detection for mobile devices
- **Consistent Styling** - Uniform experience across desktop and mobile
- **Adaptive Components** - Components adjust based on viewport

### 🎯 **Sections**
- **Hero** - Animated introduction with 3D elements and CTA buttons
- **About** - Professional summary with word reveal animations
- **Skills** - 18+ technologies displayed in an interactive grid with stats
- **Projects** - 5 featured projects with hover effects and GitHub links
- **Education** - Academic background with institution details
- **Contact** - Fully functional contact form with EmailJS integration

### ⚡ **Performance**
- **Next.js 15** - Latest App Router with server components
- **TypeScript** - Full type safety and IntelliSense
- **Optimized Images** - Lazy loading and Next.js Image optimization
- **Code Splitting** - Automatic bundle optimization
- **Fast Loading** - Lighthouse score optimized

---

## 🛠️ Tech Stack

### **Core**
- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [React 19](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling

### **3D & Animations**
- [Three.js](https://threejs.org/) - 3D graphics library
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React renderer for Three.js
- [React Three Drei](https://github.com/pmndrs/drei) - Useful helpers for R3F
- [GSAP](https://greensock.com/gsap/) - Professional-grade animation
- [Framer Motion](https://www.framer.com/motion/) - React animation library

### **UI Components**
- [Lucide React](https://lucide.dev/) - Beautiful icon library
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icon packs
- Custom components with advanced interactions

### **Forms & Email**
- [EmailJS](https://www.emailjs.com/) - Email service for contact form
- Form validation and error handling

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ and npm/yarn/pnpm installed
- Git for version control

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/kunj24/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
# EmailJS Configuration (optional for contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

---

## 📁 Project Structure

```
portfolio/
├── public/              # Static assets (images, icons)
│   └── images/         # Project and profile images
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── globals.css # Global styles
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
│   ├── components/     # React components
│   │   ├── 3d/         # Three.js 3D components
│   │   ├── sections/   # Page sections (Hero, About, etc.)
│   │   └── ui/         # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── types/          # TypeScript type definitions
├── .env.local          # Environment variables (not in repo)
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

---

## 🎨 Customization

### **Update Personal Information**

1. **Hero Section** - Edit `src/components/sections/HeroSection.tsx`
   - Change name, title, description
   - Update resume link

2. **Projects** - Edit `src/components/sections/ProjectsSection.tsx`
   - Add/remove projects in the `projects` array
   - Update project details, technologies, and GitHub links

3. **Skills** - Edit `src/components/sections/SkillsSection.tsx`
   - Add/remove skills in the `skills` array
   - Update stats numbers

4. **Education** - Edit `src/components/sections/EducationSection.tsx`
   - Update institution details and dates

5. **Contact Form** - Configure EmailJS in `.env.local`

### **Theming**

Colors and styles are configured in:
- `tailwind.config.ts` - Tailwind theme customization
- `src/app/globals.css` - CSS variables and global styles

---

## 🚀 Deployment

### **Deploy to Vercel (Recommended)**

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Configure environment variables
5. Deploy!

Your site will auto-deploy on every push to main branch.

### **Deploy to Netlify**

1. Push code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Connect repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Deploy!

---

## 📊 Stats

- **18+ Technologies** - HTML, CSS, JavaScript, React, Node.js, Python, and more
- **4+ Projects** - Full-stack, AI/ML, and web applications
- **Fully Responsive** - Works on all devices
- **Performance Optimized** - Fast loading and smooth animations

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/kunj24/portfolio/issues).

---

## 📝 License

This project is [MIT](./LICENSE) licensed.

---

## 📧 Contact

**Kunj Mungalpara**
- GitHub: [@kunj24](https://github.com/kunj24)
- LinkedIn: [Your LinkedIn]
- Email: [Your Email]

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - Amazing React framework
- [Three.js](https://threejs.org/) - Incredible 3D library
- [GSAP](https://greensock.com/) - Best animation library
- [Vercel](https://vercel.com/) - Seamless deployment platform

---

<div align="center">
  <p>Made with ❤️ by Kunj Mungalpara</p>
  <p>⭐ Star this repo if you like it!</p>
</div>
