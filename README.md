# 🌤️ Weather Agent Chat

A beautiful, modern weather chatbot built with Next.js, TypeScript, and Tailwind CSS. Features real-time weather data, animated backgrounds, and multiple chat themes.

![Weather Agent Chat](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 **Beautiful UI/UX**
- **Modern Design**: Clean, responsive interface with glass morphism effects
- **Dark/Light Mode**: Seamless theme switching with persistence
- **8 Color Palettes**: Blue, Green, Purple, Red, Orange, Pink, Indigo, Teal
- **Mobile Responsive**: Optimized for all screen sizes
- **Smooth Animations**: Elegant transitions and hover effects

### 🌈 **Chat Themes**
- **Pokéball Dots**: Animated pokéball dots floating around
- **Matrix Rain**: Falling green code like Matrix
- **Sakura Petals**: Beautiful cherry blossom petals
- **Starry Night**: Twinkling stars in the night sky
- **Fire Embers**: Floating fire embers and sparks
- **Ocean Waves**: Gentle ocean waves and bubbles

### 🤖 **Weather Agent**
- **Real-time Weather**: Get current weather conditions
- **5-day Forecast**: Extended weather predictions
- **Weather Alerts**: Important weather warnings
- **Smart Responses**: AI-powered weather insights
- **Quick Replies**: One-click weather queries

### 🔧 **Advanced Features**
- **Message Search**: Find specific messages in chat history
- **Export Chat**: Download conversation as text file
- **Notification Sounds**: Audio alerts for new messages
- **Typing Indicators**: Real-time typing status
- **Delivery Status**: Message delivery confirmation
- **Auto-scroll**: Automatic scrolling to new messages
- **Local Storage**: Persistent settings and chat history

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-agent-chat.git
   cd weather-agent-chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
frontend-weather-agent/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── globals.css     # Global styles and CSS variables
│   │   ├── layout.tsx      # Root layout component
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── ChatWindow.tsx  # Main chat interface
│   │   ├── Message.tsx     # Individual message component
│   │   ├── MessageInput.tsx # Message input field
│   │   ├── Header.tsx      # Chat header
│   │   ├── SettingsModal.tsx # Settings panel
│   │   ├── ChatThemes.tsx  # Theme selector
│   │   ├── Aurora.tsx      # WebGL background effect
│   │   └── AnimatedBackground.tsx # Animated background
│   ├── hooks/              # Custom React hooks
│   │   ├── useWeatherChat.ts # Chat logic and API calls
│   │   ├── useTheme.ts     # Theme management
│   │   ├── useChatTheme.ts # Chat theme management
│   │   └── useNotificationSound.ts # Sound notifications
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🌐 API Integration

The app integrates with the Weather Agent API:

- **Endpoint**: `https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream`
- **Method**: POST
- **Headers**: 
  - `x-mastra-dev-playground: true`
  - `Content-Type: application/json`
- **Body**: JSON with message content and threadId

### API Response Format
```json
{
  "messages": [{"role": "user", "content": "What's the weather?"}],
  "runId": "weatherAgent",
  "threadId": "22-COMPB02-26",
  "resourceId": "weatherAgent"
}
```

## 🎨 Customization

### Adding New Color Palettes

1. Edit `src/hooks/useTheme.ts`
2. Add new palette to `colorPalettes` object
3. Define light and dark variants

### Adding New Chat Themes

1. Edit `src/components/ChatThemes.tsx`
2. Add new theme to `themes` array
3. Implement animation logic in `createParticles` function

### Styling

- **CSS Variables**: Defined in `src/app/globals.css`
- **Tailwind Classes**: Used throughout components
- **Custom Animations**: Defined in CSS with keyframes

## 🚀 Deployment

### Netlify (Recommended)

1. **Connect GitHub repository**
2. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. **Deploy**: Automatic deployment on push to main branch

### Vercel

1. **Import project** from GitHub
2. **Framework preset**: Next.js
3. **Deploy**: Automatic deployment

### Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm run start
   ```

## 📱 Mobile Optimization

- **Responsive Design**: Adapts to all screen sizes
- **Touch-friendly**: Optimized for mobile interactions
- **Fast Loading**: Optimized bundle size
- **PWA Ready**: Can be installed as app

## 🔧 Troubleshooting

### Common Issues

1. **Build Errors**: Ensure all dependencies are installed
2. **API Errors**: Check network connection and API endpoint
3. **Theme Issues**: Clear localStorage and refresh
4. **Mobile Issues**: Check viewport meta tag

### Performance

- **Bundle Size**: Optimized with Next.js
- **Loading Speed**: Lazy loading for components
- **Memory Usage**: Efficient state management
- **Animations**: Hardware-accelerated CSS animations

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Tailwind CSS** - Utility-first CSS
- **Anime.js** - Animation library
- **React Icons** - Icon library
- **OGL** - WebGL library for Aurora effect

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/weather-agent-chat/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/weather-agent-chat/discussions)
- **Email**: your.email@example.com

---

Made with ❤️ by [Your Name](https://github.com/yourusername)