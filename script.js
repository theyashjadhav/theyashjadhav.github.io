const repoList = document.getElementById("repoList");

// Replace 'YourUsername' with your GitHub username
const username = 'theyashjadhav';

fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(repositories => {
        repositories.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        repositories.forEach(repo => {
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
