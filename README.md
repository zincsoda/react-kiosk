# Quote Kiosk Display

A React-based kiosk application designed to run on Raspberry Pi and other Single Board Computers (SBCs). Features an inspirational quote display with offline detection and automatic failover to an offline landing page.

## Overview

This application is specifically designed for kiosk mode deployments on embedded systems like Raspberry Pi, where it will display continuously in fullscreen mode. When connected to the internet, it shows inspirational quotes; when offline, it displays a professional offline message.

## Features

- **Offline Detection**: Automatically detects when internet connection is lost
- **Graceful Offline Handling**: Shows a professional offline landing page when disconnected
- **Kiosk-Ready**: Optimized for fullscreen display on Raspberry Pi and SBCs
- **Responsive Design**: Works on various screen sizes and orientations
- **Visual Status Indicators**: Clear online/offline status with animated indicators
- **Low Resource Usage**: Lightweight React app optimized for embedded systems

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Kiosk Deployment on Raspberry Pi

### Prerequisites

- Raspberry Pi 3/4 or compatible SBC
- Node.js 16+ installed
- HDMI display/touchscreen
- Optional: WiFi/LAN connection

### Setup Instructions

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd react-kiosk
   npm install
   ```

2. **Build for Production**
   ```bash
   npm run build
   ```

3. **Install Node.js Server**
   ```bash
   npm install -g serve
   cd build
   serve -s . -l 3000
   ```

4. **Configure Raspberry Pi for Kiosk Mode**
   
   Create a startup script (`kiosk.sh`):
   ```bash
   #!/bin/bash
   unclutter &
   xset s off
   xset -dpms
   xset s noblank
   chromium-browser --kiosk --disable-infobars --disable-session-crashed-bubble http://localhost:3000
   ```

   Make it executable:
   ```bash
   chmod +x kiosk.sh
   ```

5. **Auto-start Options**
   
   **Option A - Desktop Autostart:**
   - Add `@kiosk.sh` to `/home/pi/.config/lxsession/LXDE-pi/autostart`
   
   **Option B - Systemd Service:**
   ```bash
   # Create service file
   sudo nano /etc/systemd/system/kiosk.service
   ```
   
   Add the following content:
   ```ini
   [Unit]
   Description=Kiosk Display
   After=multi-user.target graphical-session.target
   
   [Service]
   Type=oneshot
   RemainAfterExit=yes
   ExecStart=/home/pi/kiosk.sh
   User=pi
   
   [Install]
   WantedBy=multi-user.target
   ```
   
   Enable and start:
   ```bash
   sudo systemctl enable kiosk.service
   sudo systemctl start kiosk.service
   ```

### Performance Optimization

- **Disable Power Management**: Prevent screen sleep/power saving
- **GPU Memory Split**: Increase GPU memory split for better graphics performance
- **CPU Governor**: Set to 'performance' mode for consistent frame rates
- **Thermal Management**: Ensure adequate cooling for sustained operation

### Hardware Considerations

- **Display**: Supports 1920x1080 minimum, works with touchscreens
- **Memory**: Recommended 2GB RAM minimum for smooth operation
- **Storage**: 8GB SD card minimum, consider USB SSD for better performance
- **Network**: WiFi/Ethernet for online content (graceful offline handling available)

## Troubleshooting

### Common Kiosk Issues

**Browser Not Loading:**
- Ensure Chromium is installed: `sudo apt install chromium-browser`

**Auto-start Problems:**
- Check service status: `sudo systemctl status kiosk.service`
- View logs: `journalctl -u kiosk.service -f`
- Verify script permissions: `ls -la kiosk.sh`

### Customization

**Changing the Quote:**
Edit the quote and author in `src/App.js`:
```javascript
<h1 className="quote">"Your custom quote here"</h1>
<p className="author">— Author Name</p>
```

**Modifying Offline Message:**
Update the offline content in `src/App.js` offline section:
```javascript
<h1 className="offline-title">Custom Offline Title</h1>
<p className="offline-message">Custom offline message...</p>
```

**Styling Changes:**
All styles can be modified in `src/App.css` to match your branding or color scheme.

## Development

### Development Mode
```bash
npm start
```
Runs the development server at [http://localhost:3000](http://localhost:3000)

### Building for Production
```bash
npm run build
```
Creates optimized production build in the `build` folder.

### Testing
```bash
npm test
```
Runs the Interactive test runner.

## License

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is available under the MIT License.
