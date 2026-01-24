# Deployment Guide

## Prerequisites

Before deploying the College Management System, ensure you have the following:

### System Requirements
- **Node.js**: Version 16.x or higher
- **npm or yarn**: Package manager
- **Git**: Version control system
- **MySQL**: Version 8.x or higher
- **Text Editor**: VS Code or similar
- **Web Browser**: Chrome, Firefox, Safari, or Edge

### Hosting Services
- **Frontend Hosting**: Vercel, Netlify, or GitHub Pages
- **Backend Functions**: Vercel Serverless Functions
- **Database**: AWS RDS, Google Cloud SQL, or managed MySQL service
- **Domain**: Custom domain (optional but recommended)

## Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/college-management-system.git
cd college-management-system
```

### 2. Set Up Backend
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
DB_HOST=localhost
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=college_management
JWT_SECRET=your_jwt_secret_key
BCRYPT_ROUNDS=12
PORT=3000
NODE_ENV=development
```

### 3. Set Up Database
```sql
-- Execute the database schema
mysql -u your_username -p < ../database_schema.sql
```

Or run the MySQL command line:
```bash
mysql -u your_username -p
USE college_management;
SOURCE path_to_database_schema.sql;
```

### 4. Set Up Frontend
```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=College Management System
```

### 5. Start Development Servers
Backend:
```bash
cd ../backend
npm run dev
```

Frontend:
```bash
cd ../frontend
npm run dev
```

## Production Deployment

### Backend Deployment (Vercel)

#### 1. Prepare Backend for Production
Ensure your backend is configured for serverless deployment:

**vercel.json** (in backend directory):
```json
{
  "version": 2,
  "functions": {
    "api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  },
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/index.js"
    }
  ]
}
```

#### 2. Environment Variables
In your Vercel project settings, add these environment variables:
```
DB_HOST=your_mysql_host
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_database_name
JWT_SECRET=your_strong_jwt_secret
BCRYPT_ROUNDS=12
NODE_ENV=production
```

#### 3. Deploy Backend
```bash
cd backend
npm install -g vercel
vercel --prod
```

### Frontend Deployment (Vercel/Netlify)

#### 1. Update Environment Variables
Update your frontend `.env.production`:
```env
VITE_API_BASE_URL=https://your-backend-url.vercel.app/api
VITE_APP_TITLE=College Management System
```

#### 2. Build Frontend
```bash
cd frontend
npm run build
```

#### 3. Deploy Frontend
Using Vercel:
```bash
npm install -g vercel
vercel --prod
```

Using Netlify:
1. Go to Netlify dashboard
2. Drag and drop the `dist` folder (or select the build output directory)
3. Configure build settings if needed

## Database Setup for Production

### Option 1: AWS RDS
1. Create an RDS instance with MySQL
2. Configure security groups to allow connections
3. Connect using the RDS endpoint
4. Import the schema using the provided SQL file

### Option 2: Google Cloud SQL
1. Create a Cloud SQL instance with MySQL
2. Configure authorized networks
3. Import the database schema
4. Update connection settings in environment variables

### Option 3: Other Managed Services
Any managed MySQL service (Azure Database, DigitalOcean, etc.) can be used by:
1. Creating the database instance
2. Configuring firewall rules
3. Importing the schema
4. Updating connection parameters

## Configuration Settings

### Environment Variables

#### Backend (.env)
```
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
JWT_SECRET=a_very_long_random_string_for_security
BCRYPT_ROUNDS=12
NODE_ENV=production
PORT=3000
```

#### Frontend (.env)
```
VITE_API_BASE_URL=https://your-backend-domain.com/api
VITE_APP_TITLE=College Management System
```

### Security Best Practices
1. Use strong, unique passwords for database access
2. Rotate JWT secrets periodically
3. Enable SSL/TLS for all connections
4. Implement rate limiting
5. Use environment-specific configurations

## Database Migration

### Initial Setup
Run the schema file to create all tables:
```sql
SOURCE path_to_database_schema.sql;
```

### Future Updates
For future schema changes, create migration scripts:
```
database/
├── migrations/
│   ├── 001_initial_schema.sql
│   ├── 002_add_indexes.sql
│   └── 003_update_constraints.sql
```

## SSL Certificate Setup

### For Custom Domains
1. Purchase SSL certificate or use free options (Let's Encrypt)
2. Configure your hosting provider to use SSL
3. Update API URLs to use HTTPS
4. Test certificate installation

### Using Let's Encrypt
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## Monitoring and Logging

### Application Logs
Set up log management for both frontend and backend:
- Error tracking
- Performance monitoring
- User activity logs
- Security event logging

### Database Monitoring
- Query performance monitoring
- Connection pool monitoring
- Slow query logging
- Database health checks

## Backup and Recovery

### Database Backups
Schedule regular backups:
```bash
mysqldump -u username -p database_name > backup_$(date +%Y%m%d_%H%M%S).sql
```

### File Backups
Back up configuration files and important data regularly.

## Troubleshooting

### Common Issues

#### 1. Database Connection Errors
- Check environment variables
- Verify database host and credentials
- Confirm firewall rules allow connections
- Test database connectivity separately

#### 2. Authentication Failures
- Verify JWT secret matches between frontend and backend
- Check token expiration settings
- Ensure HTTPS is used in production

#### 3. CORS Issues
- Configure proper CORS settings in backend
- Ensure API URL matches in frontend
- Check browser console for specific errors

#### 4. Build Failures
- Verify all dependencies are installed
- Check environment variables
- Ensure sufficient disk space
- Review build logs for specific errors

### Debugging Tips
1. Check server logs for error details
2. Use browser developer tools for frontend issues
3. Test API endpoints individually
4. Monitor database performance
5. Review security configurations

## Performance Optimization

### Frontend Optimization
- Minimize bundle size
- Implement code splitting
- Use lazy loading for components
- Optimize images and assets

### Backend Optimization
- Implement database indexing
- Optimize query performance
- Use caching for frequently accessed data
- Implement pagination for large datasets

### Database Optimization
- Create proper indexes
- Optimize queries
- Use connection pooling
- Monitor query performance

## Maintenance Procedures

### Regular Maintenance
1. Update dependencies regularly
2. Monitor application performance
3. Review security configurations
4. Clean up old logs and temporary files
5. Verify backup integrity

### Security Updates
1. Apply security patches promptly
2. Update dependencies for known vulnerabilities
3. Review and rotate secrets regularly
4. Monitor for suspicious activity

### Scaling Considerations
1. Monitor resource usage
2. Plan for traffic increases
3. Implement caching strategies
4. Consider database replication
5. Evaluate load balancing needs

## Rollback Procedures

### Steps for Rollback
1. Identify the problematic release
2. Revert to the previous stable version
3. Restore database from backup if needed
4. Update DNS or routing if necessary
5. Notify users of the rollback