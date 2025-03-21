// Função para alternar o tema
function toggleTheme() {
    const html = document.documentElement;
    const themeText = document.getElementById('themeText');
    const themeIcon = document.getElementById('themeIcon');
    const currentTheme = html.getAttribute('data-theme');
  
    if (currentTheme === 'light') {
      html.setAttribute('data-theme', 'dark');
      themeText.textContent = 'LIGHT';
      themeIcon.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
      themeText.textContent = 'DARK';
      themeIcon.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  }
  
  // Carregar o tema salvo no localStorage ao iniciar
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Padrão: dark
    const html = document.documentElement;
    const themeText = document.getElementById('themeText');
    const themeIcon = document.getElementById('themeIcon');
  
    html.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'light') {
      themeText.textContent = 'DARK';
      themeIcon.textContent = '🌙';
    } else {
      themeText.textContent = 'LIGHT';
      themeIcon.textContent = '☀️';
    }
  
    // Adicionar evento de clique ao botão de toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  });
  
  // Função para buscar usuário no GitHub
  async function searchUser() {
    const username = document.getElementById('searchInput').value.trim();
    const profileCard = document.getElementById('profileCard');
    const errorMessage = document.getElementById('errorMessage');
  
    // Limpar mensagens de erro e ocultar o card enquanto busca
    errorMessage.style.display = 'none';
    profileCard.style.display = 'none';
  
    if (!username) {
      errorMessage.textContent = 'Please enter a GitHub username.';
      errorMessage.style.display = 'block';
      return;
    }
  
    try {
      // Fazer a requisição à API do GitHub
      const response = await fetch(`https://api.github.com/users/${username}`);
      
      if (!response.ok) {
        throw new Error('User not found');
      }
  
      const userData = await response.json();
  
      // Atualizar o DOM com os dados do usuário
      document.getElementById('profileImage').src = userData.avatar_url || '';
      document.getElementById('profileName').textContent = userData.name || userData.login;
      document.getElementById('profileUsername').textContent = `@${userData.login}`;
      document.getElementById('joinDate').textContent = `Joined ${new Date(userData.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`;
      document.getElementById('profileBio').textContent = userData.bio || 'This profile has no bio.';
      document.getElementById('reposCount').textContent = userData.public_repos || 0;
      document.getElementById('followersCount').textContent = userData.followers || 0;
      document.getElementById('followingCount').textContent = userData.following || 0;
  
      // Informações adicionais
      const locationInfo = document.getElementById('locationInfo');
      const profileLocation = document.getElementById('profileLocation');
      profileLocation.textContent = userData.location || 'Not Available';
      if (!userData.location) {
        locationInfo.classList.add('unavailable');
      } else {
        locationInfo.classList.remove('unavailable');
      }
  
      const blogInfo = document.getElementById('blogInfo');
      const profileBlog = document.getElementById('profileBlog');
      profileBlog.textContent = userData.blog || 'Not Available';
      profileBlog.href = userData.blog || '#';
      if (!userData.blog) {
        blogInfo.classList.add('unavailable');
        profileBlog.removeAttribute('href');
      } else {
        blogInfo.classList.remove('unavailable');
      }
  
      const twitterInfo = document.getElementById('twitterInfo');
      const profileTwitter = document.getElementById('profileTwitter');
      profileTwitter.textContent = userData.twitter_username ? `@${userData.twitter_username}` : 'Not Available';
      if (!userData.twitter_username) {
        twitterInfo.classList.add('unavailable');
      } else {
        twitterInfo.classList.remove('unavailable');
      }
  
      const companyInfo = document.getElementById('companyInfo');
      const profileCompany = document.getElementById('profileCompany');
      profileCompany.textContent = userData.company || 'Not Available';
      if (!userData.company) {
        companyInfo.classList.add('unavailable');
      } else {
        companyInfo.classList.remove('unavailable');
      }
  
      // Exibir o card do perfil
      profileCard.style.display = 'flex';
  
    } catch (error) {
      errorMessage.textContent = 'User not found. Please try again.';
      errorMessage.style.display = 'block';
    }
  }
  
  // Adicionar evento para buscar ao pressionar Enter
  document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchUser();
    }
  });