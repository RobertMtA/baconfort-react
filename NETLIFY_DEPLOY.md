# Netlify Configuration for BACONFORT Frontend

## Build Settings

### Site settings
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Production branch**: `main` (or `master`)

### Environment variables
```bash
# Backend API URL
VITE_API_URL=https://tu-backend-render.onrender.com

# Environment
NODE_ENV=production
```

## Deploy Configuration

### Build & deploy
1. Connect GitHub repository
2. Set branch to deploy from (usually `main`)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Auto-deploy: Enable

### Site configuration
- **Site name**: `baconfort` (or your preferred name)
- **Custom domain**: Configure if you have one

## Post-Deploy Checklist

### 1. Verify build
- Check deploy logs for any errors
- Confirm all assets are loading

### 2. Test functionality
- Navigation between pages
- Admin panel access
- API connectivity
- Image gallery loading
- Reviews system

### 3. Update backend CORS
Update backend environment variables:
```bash
FRONTEND_URL=https://your-site-name.netlify.app
CORS_ORIGIN=https://your-site-name.netlify.app
```

## Common Issues & Solutions

### Build Errors
- **Memory issues**: Increase Node.js memory in build command
- **Dependencies**: Ensure all dependencies are in `dependencies` not `devDependencies`

### Runtime Errors
- **API connection**: Verify VITE_API_URL points to correct backend
- **CORS errors**: Update backend CORS settings
- **Routing issues**: Netlify automatically handles SPA routing

### Performance
- **Large bundle**: Check for unnecessary dependencies
- **Image optimization**: Ensure images are optimized
- **Lazy loading**: Components load as needed

## Environment Variables Setup

In Netlify dashboard:
1. Go to Site settings
2. Build & deploy
3. Environment variables
4. Add:
   ```
   VITE_API_URL = https://your-backend.onrender.com
   NODE_ENV = production
   ```

## Custom Headers (Optional)

Create `public/_headers` file:
```
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

## Redirects (Already configured)

File `public/_redirects` should contain:
```
/*    /index.html   200
```
