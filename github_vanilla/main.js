// bloqueia o acesso e manuseio das variaveis no console.
(function(){
    const search = document.getElementById("search");
    const profile = document.getElementById("profile");
    const url = "https://api.github.com/users";
    const clientID = "111910";
    const clientSecret = "6b5b4278a4fdf5e03af447789f2663e4a3bed541Iv1.d542c2435be62e01";
    const count = 7;
    const sort = "created:asc";

    async function getUser(user){
        const profileResponse = await fetch(`${url}/${user}?clientID=${clientID}&clientSecret=${clientSecret}`);

        const reposResponse = await fetch(`${url}/${user}/repos?per_page=${count}&sort=${sort}&clientID=${clientID}&clientSecret=${clientSecret}`);

        //transforma o arquivo que buscou em json
        const profile = await profileResponse.json();
        const repos = await reposResponse.json();

        return {profile, repos} ;
    }

    //Detalhes da consulta
    function showProfile(user){
        profile.innerHTML = `
            <div class="row mt-3">
                <div class="col-md-4">
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="${user.avatar_url}"/>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Repositórios: <span class="badge badge-success">${user.public_repos}</span></li>
                            <li class="list-group-item">Seguidores: <span class="badge badge-primary">${user.followers}</span></li>
                            <li class="list-group-item">Seguindo: <span class="badge badge-info">${user.following}</span></li>
                        </ul>

                        <div class="card-body">
                            <a href="${user.html_url}" target="_blank" class="btn btn-warning btn-block">Ver Perfil</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div id="repos"></div>
                </div>
            </div>`;
    }

    //Repositorios, máximo 7
    function showRepositorio(repos){
        let saida = '';

        repos.forEach(e => {
            saida += `<div class="card card-body mb-2">
                <div class="row">
                    <div class="col-md-6"><a href="${e.html_url}" target="_black">${e.name}</a></div>
                    <div class="col-md-6">
                        <span class="badge badge-primary">Starts: ${e.stargazers_count}</span>
                        <span class="badge badge-success">Watch: ${e.watchers_count}</span>
                        <span class="badge badge-warning">Forks: ${e.forks_count}</span>
                    </div>
                </div>
            </div>`;
            //console.log(saida);
        });
        document.getElementById("repos").innerHTML = saida;
    }   

    search.addEventListener("keyup", e => {
        const user = e.target.value;
        
        if(user.length > 0) {
            getUser(user).then(res => {
                showProfile(res.profile),
                showRepositorio(res.repos)
            });
        }
    });
})();