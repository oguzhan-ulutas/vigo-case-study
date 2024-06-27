# vigo-case-study

# [Live Preview](https://odin-blog-api.vercel.app/blog-api/v1/)

## Setup

### Step 1: Environment File Setup

Create .env file in backend folder:

- clientUrl = "http://localhost:5173" If your client url different, make changes accordingly.

Also create .env file inside the frontend folder:

- VITE_baseUrl = "http://localhost:5001"

After creating those environment variables continue to dependency installation.

### Step 2: Dependency Installation

Execute inside the both frontend and backend folders after cloning the repo:

```sh
npm install
```

### Step 3: Launching the Development Server

Execute:

```sh
npm start
```

Or to start the server continuously with nodemon:

```sh
npm run devstart
```

### Step 4: Launching the Client

Inside the frontend folder execute:

```sh
npm run dev
```