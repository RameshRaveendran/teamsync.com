# 🚀 TeamSync - Deployment & Production Guide

## 📋 Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [Deployment Options](#deployment-options)
4. [Database Setup](#database-setup)
5. [Security Considerations](#security-considerations)
6. [Monitoring & Logs](#monitoring--logs)
7. [Performance Optimization](#performance-optimization)
8. [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Checklist

- [ ] All tests pass
- [ ] No console errors or warnings
- [ ] Environment variables configured
- [ ] `.env` file created (not in repository)
- [ ] MongoDB connection verified
- [ ] JWT_SECRET is strong and unique
- [ ] CORS origins configured
- [ ] API documentation updated
- [ ] Database backups scheduled
- [ ] Error monitoring setup (Sentry, etc.)

---

## ⚙️ Environment Setup

### 1. Production Environment Variables

```bash
# .env (Never commit this!)
PORT=5000
NODE_ENV=production

# MongoDB Atlas
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/teamsync

# Security
JWT_SECRET=your_super_secret_random_string_min_32_chars
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=https://yourdomain.com,https://app.yourdomain.com

# Logging
LOG_LEVEL=info
LOG_FILE=/var/log/teamsync/app.log
```

### 2. Generate Secure JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Verify Setup

```bash
npm install
npm run dev
# Test: curl http://localhost:5000
```

---

## 🌍 Deployment Options

### Option 1: Heroku (Easiest)

#### Prerequisites
- Heroku account
- Heroku CLI installed

#### Steps

1. **Initialize Heroku app**
```bash
heroku login
heroku create teamsync-app
```

2. **Add MongoDB Atlas addon**
```bash
heroku addons:create mongolab:sandbox
```

3. **Set environment variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret_here
heroku config:set CORS_ORIGIN=your_domain.com
```

4. **Deploy**
```bash
git push heroku main
```

5. **View logs**
```bash
heroku logs --tail
```

---

### Option 2: AWS EC2

#### Prerequisites
- AWS account
- EC2 instance (t3.micro or larger)
- Security group configured

#### Steps

1. **Connect to instance**
```bash
ssh -i your-key.pem ec2-user@your-instance-ip
```

2. **Install Node.js & npm**
```bash
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install nodejs -y
```

3. **Install MongoDB (optional - use Atlas instead)**
```bash
sudo yum install -y mongodb-org
sudo systemctl start mongod
```

4. **Clone repository**
```bash
git clone your-repo-url
cd teamsync
npm install
```

5. **Set up PM2 for process management**
```bash
sudo npm install -g pm2
pm2 start server.js --name "teamsync"
pm2 startup
pm2 save
```

6. **Configure Nginx as reverse proxy**
```bash
sudo yum install nginx -y
sudo systemctl start nginx
```

Nginx config (`/etc/nginx/conf.d/teamsync.conf`):
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **SSL with Let's Encrypt**
```bash
sudo yum install certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

---

### Option 3: DigitalOcean

#### Prerequisites
- DigitalOcean account
- Droplet (1GB RAM minimum)

#### Steps

1. **Create Droplet** (Ubuntu 22.04)

2. **Initial setup**
```bash
ssh root@your_droplet_ip
apt update && apt upgrade -y
```

3. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Install PM2**
```bash
sudo npm install -g pm2
```

5. **Clone and setup project**
```bash
git clone your-repo
cd teamsync
npm install
pm2 start server.js --name "teamsync"
pm2 startup
```

6. **Install Nginx**
```bash
sudo apt install nginx -y
sudo systemctl enable nginx
```

---

### Option 4: Docker Containerization

#### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application
COPY . .

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:5000', r => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start app
CMD ["node", "server.js"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: production
      MONGO_URI: mongodb://mongo:27017/teamsync
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - mongo
    restart: always

  mongo:
    image: mongo:5.0
    volumes:
      - mongo_data:/data/db
    environment:
      MONGO_INITDB_DATABASE: teamsync
    restart: always

volumes:
  mongo_data:
```

#### Run with Docker

```bash
docker-compose build
docker-compose up -d
```

---

## 🗄️ Database Setup

### Using MongoDB Atlas

1. **Create account** at mongodb.com/atlas

2. **Create cluster** (free tier available)

3. **Add connection string**
```
mongodb+srv://username:password@cluster0.mongodb.net/teamsync?retryWrites=true&w=majority
```

4. **Index optimization** (in MongoDB)
```javascript
// Users
db.users.createIndex({ email: 1 }, { unique: true })

// Projects
db.projects.createIndex({ owner: 1 })
db.projects.createIndex({ members: 1 })

// Tasks
db.tasks.createIndex({ projectId: 1 })
db.tasks.createIndex({ assignedTo: 1 })
db.tasks.createIndex({ status: 1 })

// Comments
db.comments.createIndex({ taskId: 1 })
db.comments.createIndex({ userId: 1 })

// Notifications
db.notifications.createIndex({ userId: 1 })
db.notifications.createIndex({ isRead: 1 })
```

### Backup Strategy

```bash
# Manual backup
mongodump --uri "mongodb+srv://user:pass@cluster0.mongodb.net/teamsync" --out /backup/teamsync

# Restore
mongorestore --uri "mongodb+srv://user:pass@cluster0.mongodb.net/teamsync" /backup/teamsync
```

---

## 🔐 Security Considerations

### 1. HTTPS/SSL
- Always use HTTPS in production
- Use Let's Encrypt for free certificates
- Configure HSTS headers

### 2. Enable CORS Properly
```javascript
// Don't use "*" in production
const corsOptions = {
  origin: process.env.CORS_ORIGIN.split(','),
  credentials: true,
  optionsSuccessStatus: 200
};
```

### 3. Rate Limiting
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use("/api/", limiter);
```

### 4. Helmet for Security Headers
```bash
npm install helmet
```

```javascript
const helmet = require("helmet");
app.use(helmet());
```

### 5. Input Validation
- Always validate and sanitize inputs
- Use Mongoose schema validation
- Implement rate limiting on auth endpoints

### 6. Secrets Management
- Use environment variables
- Rotate JWT_SECRET periodically
- Never commit `.env` file

---

## 📊 Monitoring & Logs

### 1. Sentry for Error Tracking
```bash
npm install @sentry/node @sentry/tracing
```

```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

### 2. Logging with Winston
```bash
npm install winston
```

```javascript
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" })
  ]
});

logger.info("Server started");
```

### 3. Monitoring Health Checks
```javascript
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date(),
    uptime: process.uptime()
  });
});
```

---

## ⚡ Performance Optimization

### 1. Database Indexing
```javascript
// Mongoose schema
const userSchema = new Schema({
  email: { type: String, index: true, unique: true }
});
```

### 2. Caching with Redis
```bash
npm install redis
```

```javascript
const redis = require("redis");
const client = redis.createClient();

// Cache project data
app.get("/projects/:id", async (req, res) => {
  const cacheKey = `project:${req.params.id}`;
  const cached = await client.get(cacheKey);

  if (cached) return res.json(JSON.parse(cached));

  const project = await Project.findById(req.params.id);
  await client.setex(cacheKey, 3600, JSON.stringify(project));
  res.json(project);
});
```

### 3. Gzip Compression
```bash
npm install compression
```

```javascript
const compression = require("compression");
app.use(compression());
```

### 4. Pagination for Large Results
```javascript
// Get projects with pagination
app.get("/projects", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const projects = await Project.find()
    .limit(limit)
    .skip((page - 1) * limit);

  res.json({ page, limit, data: projects });
});
```

---

## 🔧 Troubleshooting

### Issue: Connection Refused
```bash
# Check if server is running
lsof -i :5000

# Kill process on port
kill -9 <PID>
```

### Issue: MongoDB Connection Error
```javascript
// Check connection string format
mongodb+srv://user:password@host/database?retryWrites=true

// Whitelist IP in MongoDB Atlas
```

### Issue: Slow Queries
```javascript
// Add query profiling
db.setProfilingLevel(1, { slowms: 100 });

// Analyze slow queries
db.system.profile.find({ millis: { $gt: 100 } }).pretty();
```

### Issue: Memory Leaks
```bash
# Use clinic.js
npm install -g clinicjs
clinic doctor -- node server.js
```

---

## 📈 Scaling Strategy

### Horizontal Scaling (Multiple Servers)
1. Use load balancer (Nginx, HAProxy)
2. Store sessions in Redis
3. Use database replication

### Vertical Scaling (Single Server)
1. Increase server resources (CPU, RAM)
2. Optimize code and queries
3. Enable caching

### Load Balancing Example (Nginx)
```nginx
upstream teamsync {
    server 192.168.1.10:5000;
    server 192.168.1.11:5000;
    server 192.168.1.12:5000;
}

server {
    listen 80;
    location / {
        proxy_pass http://teamsync;
    }
}
```

---

## 🎯 Post-Deployment Checklist

- [ ] All endpoints working
- [ ] HTTPS enabled
- [ ] Error monitoring active
- [ ] Database backups configured
- [ ] Logs being collected
- [ ] Performance metrics stable
- [ ] Rate limiting active
- [ ] CORS properly configured
- [ ] Health checks passing
- [ ] Documentation updated

---

## 📞 Support & Resources

- **MongoDB Docs:** https://docs.mongodb.com
- **Express Docs:** https://expressjs.com
- **Heroku Docs:** https://devcenter.heroku.com
- **AWS Docs:** https://docs.aws.amazon.com
- **Docker Docs:** https://docs.docker.com

---

**Last Updated:** April 2026
**Status:** Production Ready ✅
