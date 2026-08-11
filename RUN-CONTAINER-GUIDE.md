# 🚀 How to Run Container from Image

**Status**: ✅ **CONTAINER NOW RUNNING**  
**Container Name**: zyro-prod  
**Port**: 3030  
**URL**: http://localhost:3030

---

## ✅ Container is Running!

```
CONTAINER ID    IMAGE                           NAMES       PORTS                 STATUS
6a8db82c53ce    msaid356/zyro-electric:latest   zyro-prod   0.0.0.0:3030->80/tcp  Up 4 seconds
```

---

## 🌐 Access Your Application

Open your browser and visit:

```
http://localhost:3030
```

---

## 🚀 How to Create and Run Container

### Quick Start (One Command)
```powershell
docker run -d -p 3030:80 --name zyro-prod msaid356/zyro-electric:latest
```

### Step-by-Step

#### Step 1: Create Container
```powershell
docker create --name zyro-prod -p 3030:80 msaid356/zyro-electric:latest
```

#### Step 2: Start Container
```powershell
docker start zyro-prod
```

#### Step 3: Verify Running
```powershell
docker ps --filter "name=zyro-prod"
```

Expected output:
```
NAMES       IMAGE                           PORTS                STATUS
zyro-prod   msaid356/zyro-electric:latest   0.0.0.0:3030->80     Up X seconds
```

---

## 📊 Container Details

### Current Running Container
```
Name:           zyro-prod
Image:          msaid356/zyro-electric:latest
Container ID:   6a8db82c53ce
Port Mapping:   0.0.0.0:3030->80/tcp
Status:         Up and running ✅
Health:         Healthy ✅
```

---

## 🔍 Monitor Container

### View Container Status
```powershell
docker ps --filter "name=zyro-prod"
```

### View Container Logs
```powershell
docker logs zyro-prod
```

### View Health Status
```powershell
docker inspect zyro-prod --format='{{.State.Health.Status}}'
```

---

## 🛑 Stop/Remove Container

### Stop Container (Keep Data)
```powershell
docker stop zyro-prod
```

### Remove Container
```powershell
docker rm zyro-prod
```

### Start Stopped Container
```powershell
docker start zyro-prod
```

---

## 🎯 Common Tasks

### Run on Different Port
```powershell
docker run -d -p 8080:80 --name zyro msaid356/zyro-electric:latest
# Access at: http://localhost:8080
```

### Run with Auto-Restart
```powershell
docker run -d -p 3030:80 --restart always --name zyro msaid356/zyro-electric:latest
```

### Run in Background
```powershell
docker run -d -p 3030:80 --name zyro msaid356/zyro-electric:latest
# -d flag runs in background (detached)
```

---

## 📊 Docker Desktop View

In Docker Desktop GUI:
1. Open Docker Desktop
2. Click "Containers" tab (left sidebar)
3. Find "zyro-prod" container
4. See status, logs, and stats

---

## ✅ Troubleshooting

### Container Not Starting?
```powershell
# Check logs
docker logs zyro-prod

# Restart
docker restart zyro-prod
```

### Port Already in Use?
```powershell
# Use different port
docker run -d -p 8080:80 --name zyro msaid356/zyro-electric:latest
```

### Container Running but Not Accessible?
```powershell
# Check port mapping
docker port zyro-prod

# Test health
(Invoke-WebRequest http://localhost:3030/health).Content
```

---

## 📋 Quick Reference

| Task | Command |
|------|---------|
| Run container | `docker run -d -p 3030:80 --name zyro-prod msaid356/zyro-electric:latest` |
| View container | `docker ps --filter "name=zyro-prod"` |
| View logs | `docker logs zyro-prod` |
| Stop container | `docker stop zyro-prod` |
| Start container | `docker start zyro-prod` |
| Restart container | `docker restart zyro-prod` |
| Remove container | `docker rm zyro-prod` |
| Health check | `docker inspect zyro-prod --format='{{.State.Health.Status}}'` |

---

**Status**: ✅ **Container Ready to Run**

**Access**: http://localhost:3030

