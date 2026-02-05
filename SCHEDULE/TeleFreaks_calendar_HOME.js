const calendar = document.querySelector(".calendar");
const monthTitle = document.getElementById("monthTitle");

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth(); // 0始まり

// タイトル表示
monthTitle.textContent = `${year}年 ${month + 1}月`;

// ここを変更して予定を追加
const schedules = {
    /* "yyyy-mm-dd": ["予定X"], ...*/
    "2026-02-07": ["蟲＠新潟LOTS"],
    "2026-02-14": ["蟲 @仙台GIGS"],
    "2026-02-15": ["蟲 @仙台GIGS"],
    "2026-02-23": ["蟲 @Zepp Sapporo"],
    "2026-02-28": ["蟲 @高松festhalle"],
    "2026-03-01": ["蟲 @岡山CRAZYMAMA KINGDOM"],
    "2026-03-06": ["蟲 @Zepp Nagoya"],
    "2026-03-07": ["蟲 @Zepp Nagoya"],
    "2026-03-13": ["蟲 @Zepp Fukuoka"],
    "2026-03-14": ["蟲 @Zepp Fukuoka"],
    "2026-03-19": ["蟲 @Zepp Osaka Bayside"],
    "2026-03-20": ["蟲ツアーファイナル @Zepp Osaka Bayside"],
    "2026-03-22": ["ツタロックフェス @幕張メッセ"],
    "2026-05-04": ["VIVA LA ROCK @埼玉スタジアム2002"]
};

// 月初・月末
const firstDay = new Date(year, month, 1);
const lastDay = new Date(year, month + 1, 0);

// 曜日ズレ調整（1日が何曜日か）
for (let i = 0; i < firstDay.getDay(); i++) {
  calendar.appendChild(document.createElement("div"));
}

// 日付生成
for (let day = 1; day <= lastDay.getDate(); day++) {
  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const dayEl = document.createElement("div");
  dayEl.className = "day";

  dayEl.innerHTML = `<div class="day-number">${day}</div>`;

  // 予定があれば追加
  if (schedules[dateStr]) {
    schedules[dateStr].forEach(text => {
      const item = document.createElement("div");
      item.className = "schedule-item";
      item.textContent = text;
      dayEl.appendChild(item);
    });
  }

  calendar.appendChild(dayEl);
}
