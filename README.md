# Neuroscience Workshop Landing Page

A high-converting, visually appealing landing page for Claudia Ruiz's neuroscience workshop, designed to reflect the style of Dr. Joe Dispenza's materials while incorporating strategic marketing, sales, and design principles.

## 🎯 Features

- **High-Converting Design**: Strategic placement of CTAs and persuasive copy
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **SEO Optimized**: Complete meta tags, structured data, and keyword optimization
- **Professional Gallery**: Showcase of expertise and credentials
- **Social Proof**: Comprehensive testimonials from participants and professionals
- **Flexible Date Management**: Easy-to-update workshop and meeting dates
- **Integration Ready**: Prepared for Stripe payment and Calendly scheduling

## 📁 File Structure

```
neuroscience-workshop-landing/
├── index.html              # Main landing page
├── styles.css              # All styling and responsive design
├── script.js               # Interactive functionality
├── README.md               # This documentation
├── claudia-placeholder.jpg  # Professional facilitator photo
├── gallery-placeholder-1.jpg # Workshop session image
├── gallery-placeholder-2.jpg # Brain mapping research image
├── gallery-placeholder-3.jpg # International presentation image
└── gallery-placeholder-4.jpg # Client transformation image
```

## 🚀 Quick Setup

1. **Upload Files**: Upload all files to your web server
2. **Update Links**: Replace placeholder links with actual Stripe and Calendly URLs
3. **Add Dates**: Update workshop and meeting dates in the HTML
4. **Replace Images**: Optionally replace placeholder images with actual photos
5. **Test**: Verify all functionality works correctly

## 🔧 Customization Guide

### Adding Workshop Dates

Find this section in `index.html` and update the dates:

```html
<div class="date-card">
    <h3>2-Day Open Training Workshop</h3>
    <p class="date-placeholder">[Workshop dates to be announced]</p>
    <p class="description">Intensive 2-day immersive experience</p>
</div>
```

Replace `[Workshop dates to be announced]` with actual dates like:
```html
<p class="date-placeholder">March 15-16, 2025</p>
```

### Integrating Payment Links

Find the Stripe payment buttons and replace the `#` with your actual Stripe payment link:

```html
<a href="#" class="btn btn-primary" id="signup-btn">Register for Workshop</a>
```

Replace with:
```html
<a href="https://your-stripe-payment-link.com" class="btn btn-primary" id="signup-btn">Register for Workshop</a>
```

### Integrating Calendly Links

Find the Calendly scheduling buttons and replace the `#` with your actual Calendly link:

```html
<a href="#" class="btn btn-secondary" id="schedule-btn">Schedule Consultation</a>
```

Replace with:
```html
<a href="https://calendly.com/your-link" class="btn btn-secondary" id="schedule-btn">Schedule Consultation</a>
```

### Adding Video Content

Find the video placeholder section and replace with actual video embed:

```html
<div class="video-placeholder">
    <p>[Video where Claudia explains what she does - to be embedded]</p>
</div>
```

Replace with YouTube embed or other video platform:
```html
<div class="video-container">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen></iframe>
</div>
```

### Updating Contact Information

The contact information is already populated from your provided data. To modify:

1. **Email**: Update `claudiaR@neurochangesolutions.com`
2. **Phone**: Update `+1 561 706 5168`
3. **Social Media**: Update LinkedIn, Facebook, and Twitter links

### Replacing Images

To replace placeholder images with actual photos:

1. **Claudia's Photo**: Replace `claudia-placeholder.jpg` with actual professional photo
2. **Gallery Images**: Replace `gallery-placeholder-*.jpg` with actual workshop/research photos
3. **Maintain Aspect Ratios**: Keep similar dimensions for best results

## 🎨 Design Customization

### Color Scheme

The current color palette matches the original flyer:
- **Primary Blue**: `#4A90E2`
- **Light Blue**: `#7BB3F0`
- **Accent Red**: `#E74C3C`
- **Background**: `#FFFFFF`
- **Text**: `#333333`

To change colors, update the CSS variables in `styles.css`.

### Typography

Current fonts:
- **Headings**: Poppins (Google Fonts)
- **Body Text**: Inter (Google Fonts)

To change fonts, update the Google Fonts link in the HTML head and CSS font-family declarations.

## 📱 Mobile Optimization

The page is fully responsive with:
- Mobile-first design approach
- Touch-friendly button sizes (44px minimum)
- Optimized typography scaling
- Flexible grid layouts
- Compressed images for faster loading

## 🔍 SEO Features

### Meta Tags
- Complete title and description tags
- Open Graph tags for social sharing
- Twitter Card tags
- Keyword optimization

### Structured Data
- Event schema for workshop information
- Person schema for Claudia Ruiz
- Organization schema for business information

### Technical SEO
- Semantic HTML5 structure
- Proper heading hierarchy (H1-H4)
- Optimized image alt text
- Clean URL structure

## 📊 Analytics Integration

To add Google Analytics:

1. Add tracking code to the `<head>` section:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

2. Update button tracking in `script.js` to use actual analytics calls.

## 🚀 Performance Optimization

The page is optimized for speed with:
- Compressed images
- Minified CSS (can be further compressed)
- Efficient JavaScript
- Optimized font loading
- Clean HTML structure

## 🔒 Security Considerations

- All external links open in new tabs
- No inline JavaScript (except structured data)
- Clean, validated HTML
- No security vulnerabilities in code

## 📞 Support and Maintenance

### Regular Updates Needed
1. **Workshop Dates**: Update as new sessions are scheduled
2. **Testimonials**: Add new participant feedback
3. **Gallery Images**: Update with recent workshop photos
4. **Pricing**: Adjust if group pricing changes

### Backup Recommendations
- Keep backup copies of all files
- Document any customizations made
- Test thoroughly after any changes

## 🎯 Conversion Optimization Tips

1. **A/B Testing**: Test different CTA button colors and text
2. **Urgency**: Update "limited spots" messaging based on actual availability
3. **Social Proof**: Regularly add new testimonials
4. **Loading Speed**: Monitor and optimize page load times
5. **Mobile Experience**: Regularly test on various mobile devices

## 📈 Success Metrics to Track

- **Conversion Rate**: Percentage of visitors who register
- **Bounce Rate**: Percentage of visitors who leave immediately
- **Time on Page**: How long visitors spend reading content
- **Mobile vs Desktop**: Performance across different devices
- **Traffic Sources**: Which channels bring the most qualified visitors

## 🆘 Troubleshooting

### Common Issues

1. **Images Not Loading**: Check file paths and ensure images are uploaded
2. **Buttons Not Working**: Verify JavaScript is enabled and links are correct
3. **Mobile Layout Issues**: Test on actual devices, not just browser simulation
4. **Slow Loading**: Optimize images and consider CDN for faster delivery

### Browser Compatibility

Tested and compatible with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📧 Contact for Support

For technical support or customization requests, contact the development team with:
- Specific issue description
- Browser and device information
- Screenshots if applicable
- Any error messages

---

**Ready to Transform Lives with Neuroscience!** 🧠✨

