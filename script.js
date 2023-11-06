const repoList = document.getElementById("repoList");

// Replace 'YourUsername' with your GitHub username
const username = 'theyashjadhav';

fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(repositories => {
        // Separate SPPU-LAB repository
        const sppuLabRepo = repositories.find(repo => repo.name === 'Temper_C');
        const otherRepos = repositories.filter(repo => repo.name !== 'Temper_C');

        // Concatenate SPPU-LAB with other repositories
        const sortedRepositories = sppuLabRepo ? [sppuLabRepo, ...otherRepos] : repositories;

        sortedRepositories.forEach(repo => {
            const listItem = document.createElement("li");
            listItem.className = "repo-list-item";

            const repoCard = document.createElement("div");
            repoCard.className = "repo-card";

            const repoName = document.createElement("h3");
            repoName.className = "repo-name";
            const repoLink = document.createElement("a");
            repoLink.href = repo.html_url;
            repoLink.className = "repo-link";
            repoLink.textContent = repo.name;
            repoName.appendChild(repoLink);

            const repoDescription = document.createElement("p");
            repoDescription.className = "repo-description";
            repoDescription.textContent = repo.description;

            const repoLanguage = document.createElement("p");
            repoLanguage.textContent = `Language: ${repo.language || 'N/A'}`;

            repoCard.appendChild(repoName);
            repoCard.appendChild(repoDescription);
            repoCard.appendChild(repoLanguage);

            listItem.appendChild(repoCard);

            repoList.appendChild(listItem);
        });
    })
    .catch(error => console.error("Error fetching repositories:", error));
