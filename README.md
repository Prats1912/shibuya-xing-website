# Shibuya Xing Restaurant Website

A modern, responsive restaurant website built with React, TypeScript, and Tailwind CSS.

## Features

- Responsive design that works on all devices
- Interactive navigation with Japanese text hover effects
- Smooth scrolling between sections
- Modern animations and transitions
- Optimized for performance

## Netlify Deployment

This project is ready for Netlify deployment. You have two options:

### Option 1: Drag and Drop (Recommended)

1. Build the project (already done - `dist` folder is ready)
2. Simply drag and drop the entire `dist` folder into Netlify's deploy area
3. Your website will be live immediately!

### Option 2: Git Integration

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

## Local Development

To run this project locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── App.tsx        # Main app component
│   ├── main.tsx       # Entry point
│   └── index.css      # Global styles
├── public/            # Static assets
├── dist/              # Production build (ready for Netlify)
└── package.json       # Dependencies and scripts
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Icons** - Additional icons
- **GSAP** - Animations
- **AOS** - Scroll animations

## Deployment Files

The `dist` folder contains:
- `_redirects` - Handles client-side routing
- `netlify.toml` - Netlify configuration with optimizations
- All built assets and files ready for production

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Code splitting and lazy loading
- Optimized images and assets
- Proper caching headers
- Minified CSS and JavaScript
- Tree shaking for smaller bundle sizes

---

Ready to deploy! Just drag the `dist` folder to Netlify and your website will be live.
