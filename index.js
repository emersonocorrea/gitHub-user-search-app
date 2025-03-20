

async function fetchUser() {
    const username = document.getElementById('username').value;
    const profileDiv = document.getElementById('profile');
    const avatarImg = document.getElementById('avatar');
    const nameEl = document.getElementById('name');
    const bioEl = document.getElementById('bio');
    const reposEl = document.getElementById('repos');
    const followersEl = document.getElementById('followers');

    if (!username) {
        alert('Por favor, insira um username!');
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error('Usuário não encontrado!');
        }

        const userData = await response.json();
        

        // Atualizar o DOM com os dados
        avatarImg.src = userData.avatar_url;
        avatarImg.classList.remove('hidden');
        nameEl.textContent = userData.name || userData.login;
        bioEl.textContent = userData.bio || 'Sem bio disponível';
        reposEl.textContent = `Repositórios públicos: ${userData.public_repos}`;
        followersEl.textContent = `Seguidores: ${userData.followers}`;
    } catch (error) {
        profileDiv.innerHTML = `<p class="text-red-500">${error.message}</p>`;
        avatarImg.classList.add('hidden');
    }
}

const searchBtn = document.getElementById('searchBtn')
searchBtn.addEventListener('click', () => {fetchUser()})