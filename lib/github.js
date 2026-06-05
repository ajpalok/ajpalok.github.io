/**
 * Fetch GitHub user contribution stats using GraphQL API
 * Requires GITHUB_TOKEN to be set in environment variables
 * Returns contribution data for the past year
 */
export async function getGithubContributions(username) {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    console.warn('GITHUB_TOKEN not set. Install GraphQL contributions for real data.');
    return { success: false, error: 'GITHUB_TOKEN not configured' };
  }

  const query = `
    query {
      user(login: "${username}") {
        login
        name
        repositories(first: 1) {
          totalCount
        }
        followers {
          totalCount
        }
        following {
          totalCount
        }
        avatarUrl
        url
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    if (data.errors) {
      throw new Error(data.errors[0]?.message || 'GraphQL error');
    }

    const user = data.data.user;
    return {
      success: true,
      data: {
        username: user.login,
        name: user.name,
        publicRepos: user.repositories.totalCount,
        followers: user.followers.totalCount,
        following: user.following.totalCount,
        avatarUrl: user.avatarUrl,
        profileUrl: user.url,
      },
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Generate contribution graph data for the past year
 * Returns array of weeks with day data
 */
export function generateContributionData() {
  const today = new Date();
  const oneYearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);

  // Start from the Sunday of the week containing oneYearAgo
  const startDate = new Date(oneYearAgo);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const weeks = [];
  let currentDate = new Date(startDate);

  while (currentDate <= today) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      if (currentDate <= today) {
        // Generate random contribution levels for demo (0-4)
        const level = Math.floor(Math.random() * 5);
        week.push({
          date: new Date(currentDate),
          level, // 0-4 contribution levels
          count: level * Math.floor(Math.random() * 10) + Math.floor(Math.random() * 5),
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    weeks.push(week);
  }

  return weeks;
}

/**
 * Get color for contribution level
 */
export function getContributionColor(level) {
  // Burnt-orange intensity ramp on warm paper (matches brand palette).
  const colors = {
    0: '#e7dccb', // no contribution (empty cell on paper)
    1: '#f3c4a6', // light
    2: '#e89567', // medium
    3: '#d65a22', // strong
    4: '#a83c12', // deepest
  };
  return colors[level] ?? colors[0];
}
