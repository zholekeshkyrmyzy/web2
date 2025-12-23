function getUser() {
  fetch("/user")
    .then(res => res.json())
    .then(data => {
      const content = document.getElementById("content");

      content.innerHTML = `
        <div class="card">
          <img src="${data.user.photo}" alt="Profile">
          <p><b>Name:</b> ${data.user.firstName} ${data.user.lastName}</p>
          <p><b>Gender:</b> ${data.user.gender}</p>
          <p><b>Age:</b> ${data.user.age}</p>
          <p><b>DOB:</b> ${data.user.dob}</p>
          <p><b>Address:</b> ${data.user.address}, ${data.user.city}</p>
        </div>

        <div class="card">
          <h2>${data.country.name}</h2>
          ${data.country.flag ? `<img src="${data.country.flag}" width="100">` : ""}
          <p><b>Capital:</b> ${data.country.capital}</p>
          <p><b>Language:</b> ${data.country.language}</p>
          <p><b>Currency:</b> ${data.country.currency}</p>
          <p>1 ${data.country.currency} = ${data.exchange.usd} USD</p>
          <p>1 ${data.country.currency} = ${data.exchange.kzt} KZT</p>
        </div>

        <h2>News</h2>
        ${data.news.map(n => `
          <div class="card">
            <h3>${n.title}</h3>
            ${n.image ? `<img src="${n.image}" width="200">` : ""}
            <p>${n.description}</p>
            <a href="${n.url}" target="_blank">Read more</a>
          </div>
        `).join("")}
      `;
    })
    .catch(err => {
      console.error("Frontend error:", err);
      document.getElementById("content").innerHTML = "<p>Failed to load data. Try again.</p>";
    });
}
