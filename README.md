# OneEye

**OneEye** is a modern movie search application built with performance and user experience in mind. It allows users to instantly search for movies by name, view detailed descriptions, and check ratings to decide what to watch next.

## 🚀 Why?

The goal of OneEye is to provide a seamless way to discover movie content. By leveraging **Server-Side Rendering (SSR)** with Angular, the application ensures:
* **Fast First Contentful Paint (FCP):** Content reaches the user's screen faster.
* **SEO Optimization:** Movie details are fully indexable by search engines.
* **Modern Reactivity:** Using Angular Signals for fine-grained performance.

## 🛠️ Tech Stack

* **Framework:** Angular v21 (Latest)
* **Rendering:** Server-Side Rendering (SSR) / Hydration
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [daisyUI](https://daisyui.com/)
* **State Management:** Angular Signals & Services
* **Runtime:** Node.js (v24 recommended, v20+ supported)
* **Data Source:** TMDB API

## 🔴 Live Demo

[View Live Preview](https://your-live-link-here.com) _(Coming Soon)_

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
* **Node.js:** v20 or higher (v24 is used in development).
* **Package Manager:** `pnpm` (recommended), `npm`, or `yarn`.
* **API Key:** You will need an API key from [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api).

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ErickFCS/OneEye.git](https://github.com/ErickFCS/OneEye.git)
    cd OneEye
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    # or
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your TMDB API key:
    ```env
    TMDB_API_KEY="your_tmdb_api_key_here"
    ```

## 💻 Usage

### Development Server
Run the application in development mode with SSR support:

```bash
pnpm start
# or
ng serve

```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Production Build

Build the project for production (optimizes bundles and prepares the server):

```bash
pnpm build
# or
ng build

```

The build artifacts will be stored in the `dist/oneEye` directory.

### Serving Production

To test the production build locally (simulating a real server environment):

```bash
pnpm serve:ssr:oneEye
# or directly with Node
node dist/oneEye/server/server.mjs

```

## 🤝 Contributing

We welcome contributions! If you'd like to improve OneEye, please follow these steps:

1. **Fork** the repository.
2. Create a new **branch** for your feature or bug fix (`git checkout -b feature/amazing-feature`).
3. Make your changes and **commit** them with a clear message.
4. **Push** your changes to your fork.
5. Create a **Pull Request**.

## 📄 License

This project is licensed under the **BSD 3-Clause License**. See the [LICENSE](https://github.com/ErickFCS/OneEye/blob/main/LICENSE) file for details.

---

## 🆘 Support

If you encounter any issues or have questions, please file an issue on the [GitHub Issue Tracker](https://github.com/ErickFCS/OneEye/issues).


