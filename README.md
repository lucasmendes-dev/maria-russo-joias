# 💍Maria Russo Joias

This project is a custom sales and inventory management system developed for my girlfriend’s silver jewelry store (https://www.instagram.com/mariarusso.joias/). It was built to help organize and track products, categories, stock levels, and customer orders in a simple and efficient way.

# 🚀 Tech Stack

- Backend: Laravel 12

- Frontend: React + Inertia.js

- Styling: Tailwind CSS + Shadcn UI

- Database: MySQL

- Infrastructure: Docker (for local development)

# ✅ Features
- Product management (CRUD)

- Graphic reports to follow profit/costs

- Stock control

- Responsive and user-friendly UI

- Authentication and protected routes

- Modern and clean design

# 🎯 Purpose
The goal of this system is to help a small business run more smoothly by replacing manual tracking with a digital system that is tailored to its needs. It also served as a personal learning experience to improve my skills in full-stack development using modern web technologies.




#
Below is a step-by-step guide to run the project on your machine (Docker required).

### Step by Step
Clone Repository
```sh
git clone https://github.com/lucasmendes-dev/maria-russo-joias.git
```

```sh
cd maria-russo-joias/
```

Create the .env File
```sh
cp .env.example .env
```


Check if your .env file has at least those information
```dosini
APP_NAME="Laravel"
APP_DEBUG=true
APP_KEY=
APP_URL=http://localhost:8787

APP_LOCALE=pt_BR
APP_FALLBACK_LOCALE=pt_BR
APP_FAKER_LOCALE=pt_BR

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=root

CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis

REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379

FILESYSTEM_DISK=public

```

Install the JS dependencies, and build the application
```sh
npm install --legacy-peer-deps
npm run build
```

Start the project containers
```sh
docker compose up -d
```

Access the container app
```sh
docker compose exec app bash
```

Inside the container, install the dependencies
```sh
composer install
```

Generate the Laravel project key
```sh
php artisan key:generate
```

Run migrations
```sh
php artisan migrate --seed
```

Set the storage folder
```sh
php artisan storage:link
```

Access the project at:
[http://localhost:8787](http://localhost:8787)
