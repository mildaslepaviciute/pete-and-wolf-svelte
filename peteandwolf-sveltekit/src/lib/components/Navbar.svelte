<script>
    import { page } from '$app/stores';
  </script>
  
  <nav class="navbar navbar-expand position-absolute w-100 bg-white" style="z-index: 0!important;">
    <div class="container pb-2">
      <a href="/" class="navbar-brand">
        <img src="/img/logo.svg" alt="Pete & Wolf">
      </a>
      <button 
        type="button" 
        class="navbar-toggler button-style-none ms-auto" 
        data-bs-toggle="modal" 
        data-bs-target="#exampleModal"
        aria-label="Open mobile menu"
      >
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a href="/advertising" class="nav-link">Advertising</a>
          </li>
          <li class="nav-item">
            <a href="/cases/sonic-id" class="nav-link">Cases</a>
          </li>
          <li class="nav-item">
            <a href="/about" class="nav-link">About</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>