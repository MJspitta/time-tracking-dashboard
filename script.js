const getTrackingData = async () => {
  try {
    const res = await fetch('./data.json');
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const trackingSection = document.querySelector('.tracking-section');

const displayTrackingData = async (period) => {
  const cardsData = await getTrackingData();
  trackingSection.innerHTML = "";


  cardsData.map((card) => {
    const currDir = card.timeframes[period].current;
    const prevDir = card.timeframes[period].previous;

    trackingSection.innerHTML += `
    <div class="timetrack-card ${card.title.toLowerCase().split(" ").join("-")}">
      <div class="card-content">
        <div class="card-title">
          <h2>${card.title}</h2>
          <a href="#">
            <img src="./images/icon-ellipsis.svg" alt="options icon" />
          </a>
        </div>
        <div class="card-time">
          <p class="current-time">${currDir}hrs</p>
          <p class="previous-time">Last Week - ${prevDir}hrs</p>
        </div>
      </div>
    </div>
    `;
  });
}

const trackingPeriods = document.querySelectorAll('input[name="track-periods"]');

for (const p of trackingPeriods) {
  if (p.checked) {
    displayTrackingData(p.id);
    break;
  }
}

trackingPeriods.forEach((period) => {
  period.addEventListener('change', () => {
    displayTrackingData(period.id);
  })
});

