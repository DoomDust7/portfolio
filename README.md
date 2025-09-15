# Portfolio Website
Link: https://doomdust7.github.io/portfolio/
A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Features a clean design, smooth animations, and mobile-first responsive layout.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic content
- **Contact Form**: Functional contact form with validation
- **Smooth Animations**: CSS animations and JavaScript-powered effects
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Scroll Effects**: Navbar changes on scroll, scroll-to-top button
- **Loading Animation**: Preloader for better user experience

## Sections

1. **Hero Section**: Eye-catching introduction with call-to-action buttons
2. **About Section**: Personal information and statistics
3. **Skills Section**: Technical skills organized by category
4. **Projects Section**: Featured projects with descriptions and links
5. **Contact Section**: Contact information and working contact form

## Customization

### Personal Information
Update the following in `index.html`:

```html
<!-- Update your name -->
<h1 class="hero-title">
    Hi, I'm <span class="highlight">Your Name</span>
</h1>

<!-- Update your title -->
<h2 class="hero-subtitle">Full Stack Developer</h2>

<!-- Update your description -->
<p class="hero-description">
    I create beautiful, functional, and user-centered digital experiences.
    Passionate about clean code and innovative solutions.
</p>
```

### Contact Information
Update contact details in the contact section:

```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <span>your.email@example.com</span>
</div>
<div class="contact-item">
    <i class="fas fa-phone"></i>
    <span>+1 (555) 123-4567</span>
</div>
<div class="contact-item">
    <i class="fas fa-map-marker-alt"></i>
    <span>Your City, Country</span>
</div>
```

### Social Links
Update social media links:

```html
<div class="social-links">
    <a href="https://github.com/yourusername" class="social-link">
        <i class="fab fa-github"></i>
    </a>
    <a href="https://linkedin.com/in/yourprofile" class="social-link">
        <i class="fab fa-linkedin"></i>
    </a>
    <!-- Add more social links as needed -->
</div>
```

### Projects
Update the projects section with your actual projects:

```html
<div class="project-card">
    <div class="project-image">
        <div class="project-placeholder">
            <i class="fas fa-laptop-code"></i>
        </div>
    </div>
    <div class="project-content">
        <h3>Your Project Name</h3>
        <p>Project description...</p>
        <div class="project-tech">
            <span class="tech-tag">React</span>
            <span class="tech-tag">Node.js</span>
        </div>
        <div class="project-links">
            <a href="https://github.com/yourusername/project" class="project-link">
                <i class="fab fa-github"></i> Code
            </a>
            <a href="https://yourproject.com" class="project-link">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
        </div>
    </div>
</div>
```

### Skills
Update the skills section with your technical skills:

```html
<div class="skill-item">
    <i class="fab fa-react"></i>
    <span>React</span>
</div>
```

### Colors and Styling
Main colors can be customized in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #fbbf24;
    --text-color: #333;
    --background-color: #ffffff;
}
```

## File Structure

```
Portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Optimized CSS and JavaScript
- Minimal external dependencies
- Fast loading times
- Smooth animations with hardware acceleration

## Deployment

1. Upload all files to your web hosting service
2. Ensure all file paths are correct
3. Test the website on different devices and browsers
4. Update all placeholder content with your information

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help customizing the portfolio, feel free to reach out!

---

**Note**: Remember to replace all placeholder content with your actual information before deploying the website.
