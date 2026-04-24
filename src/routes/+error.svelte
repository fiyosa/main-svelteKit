<script lang="ts">
  import { page } from '$app/state'
  import { browser } from '$app/environment'

  // Using Svelte 5 page state
  const status = $derived(page.status)
  const message = $derived(page.error?.message || 'Something went wrong')

  function goHome() {
    if (browser) {
      window.location.href = '/'
    }
  }
</script>

<svelte:head>
  <title>{status} - Page Not Found</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet" />
</svelte:head>

<div class="error-container">
  <!-- Decorative background elements -->
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="blob blob-3"></div>

  <main class="content">
    <div class="glass-card">
      <h1 class="error-code">{status}</h1>
      <div class="divider"></div>
      <h2 class="error-title">
        {#if status === 404}
          Opps! Page Not Found
        {:else}
          An Error Occurred
        {/if}
      </h2>
      <p class="error-message">
        {message}
      </p>

      <div class="action-area">
        <button onclick={goHome} class="btn-primary"> Take Me Home </button>
        <button onclick={() => history.back()} class="btn-secondary"> Go Back </button>
      </div>
    </div>
  </main>

  <footer class="footer">
    <p>&copy; {new Date().getFullYear()} Your Awesome Project. All rights reserved.</p>
  </footer>
</div>

<style>
  .error-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%);
    color: #f8fafc;
    font-family: 'Outfit', sans-serif;
    z-index: 9999;
  }

  /* Animated Blobs */
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    z-index: 0;
    opacity: 0.5;
    animation: move 20s infinite alternate ease-in-out;
  }

  .blob-1 {
    width: 400px;
    height: 400px;
    background: #3b82f6;
    top: -100px;
    left: -100px;
    animation-delay: 0s;
  }

  .blob-2 {
    width: 350px;
    height: 350px;
    background: #8b5cf6;
    bottom: -50px;
    right: -50px;
    animation-delay: -5s;
  }

  .blob-3 {
    width: 300px;
    height: 300px;
    background: #ec4899;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: -10s;
  }

  @keyframes move {
    0% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0, 0) scale(1);
    }
  }

  .content {
    z-index: 10;
    width: 100%;
    max-width: 600px;
    padding: 20px;
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 32px;
    padding: 60px 40px;
    text-align: center;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .error-code {
    font-size: 120px;
    font-weight: 800;
    margin: 0;
    line-height: 1;
    background: linear-gradient(to bottom right, #fff, #94a3b8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -4px;
  }

  .divider {
    width: 60px;
    height: 4px;
    background: #3b82f6;
    margin: 24px auto;
    border-radius: 2px;
  }

  .error-title {
    font-size: 32px;
    font-weight: 600;
    margin: 0 0 16px 0;
    color: #fff;
  }

  .error-message {
    font-size: 18px;
    color: #94a3b8;
    margin-bottom: 40px;
    line-height: 1.6;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .action-area {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-primary {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 14px 28px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
  }

  .btn-primary:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 14px 28px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .footer {
    position: absolute;
    bottom: 30px;
    z-index: 10;
    font-size: 14px;
    color: #475569;
  }

  @media (max-width: 640px) {
    .error-code {
      font-size: 80px;
    }
    .error-title {
      font-size: 24px;
    }
    .glass-card {
      padding: 40px 24px;
    }
  }
</style>
