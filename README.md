# CloudCart Deployment Guide

## Project Overview

CloudCart is a containerized e-commerce application deployed using Docker and Docker Compose on an AWS EC2 instance. The deployment demonstrates core DevOps concepts including containerization, service orchestration, networking, and application troubleshooting.

---
### View Application

```text
http://13.53.172.109:3001/
```
---

## Tech Stack

* AWS EC2 (Ubuntu)
* Docker
* Docker Compose
* Node.js (Backend)
* React.js (Frontend)
* MySQL 8

---

## Deployment Steps

### 1. Launch EC2 Instance

* Create Ubuntu EC2 instance on AWS
* Configure Security Groups:

  * Port 22 (SSH)
  * Port 3001 (Frontend)
  * Port 5001 (Backend)
  * Port 3306 (MySQL)

### 2. Install Docker & Docker Compose

```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker

sudo apt install docker-compose-plugin -y
```

### 3. Clone Repository

```bash
git clone <repository-url>
cd CloudCart
```

### 4. Configure Docker Compose

Services deployed:

* Frontend → Port 3001
* Backend → Port 5001
* MySQL → Port 3306

```yaml
services:
  backend:
    build: ./backend
    ports:
      - "5001:5000"

  frontend:
    build: ./frontend
    ports:
      - "3001:80"

  mysql:
    image: mysql:8
    ports:
      - "3306:3306"
```

### 5. Build and Deploy Containers

```bash
docker compose up -d --build
```

### 6. Verify Running Containers

```bash
docker compose ps
```

Expected:

```bash
cloudcart-frontend
cloudcart-backend
cloudcart-mysql
```

## Troubleshooting Performed

### Issue 1: Backend Container Crash

**Error**

```text
SyntaxError: Unexpected token '}'
```

**Resolution**

* Inspected backend logs
* Fixed syntax error in `server.js`
* Rebuilt Docker image

---

### Issue 2: MySQL Connection Refused

**Error**

```text
ECONNREFUSED 172.x.x.x:3306
```

**Resolution**

* Verified MySQL container health
* Checked Docker networking
* Restarted backend after database initialization

---

### Issue 3: Database Table Missing

**Error**

```text
Table 'cloudcart.users' doesn't exist
```

**Resolution**

Created required table manually:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);
```

---

## Useful Docker Commands

```bash
docker compose up -d --build

docker compose ps

docker compose logs backend

docker compose logs mysql

docker compose restart backend

docker compose down
```

---

## Deployment Outcome

Successfully deployed CloudCart on AWS EC2 using Docker Compose with:

* Frontend running on Port 3001
* Backend running on Port 5001
* MySQL database running on Port 3306
* End-to-end user registration and login functionality operational

**Deployment Type:** Containerized Application Deployment
**Platform:** AWS EC2 Ubuntu Server
**Tools Used:** Docker, Docker Compose, MySQL, Node.js, React.js, AWS EC2
