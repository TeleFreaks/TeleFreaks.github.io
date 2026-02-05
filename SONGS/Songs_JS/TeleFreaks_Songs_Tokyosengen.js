document.addEventListener("DOMContentLoaded", () => {

  /* =============================
     曲ごとの設定
  ============================= */
  const songId = "東京宣言"; // ← 曲ごとに変更
  const INSTANT_KEY = `songInstant_${songId}`;

  /* =============================
     手動キュレーションコメント
  ============================= */
  const curatedComments = [
    "イントロが神",
    "夜に聴くと沁みる",
    "ギターが泣いてる",
    "サビ前の溜めが好き",
    "歌詞が急に刺さる"
  ];

  /* =============================
     表示パラメータ
  ============================= */
  const DISPLAY_DURATION = 24 * 60 * 60 * 1000; // 24時間
  const baseRadius = 180;
  const angleGap = 0.4;
  const radiusGap = 15;
  const rotationInterval = 5000;
  let startAngle = Math.random() * Math.PI * 2;

  /* =============================
     DOM取得
  ============================= */
  const bubbles = document.querySelectorAll(".comment-bubble");
  const wrapper = document.querySelector(".album-wrapper");
    
    /* 即時コメント入力UI */
    const input = document.getElementById("instantCommentInput");
    const button = document.getElementById("sendInstantComment");
    const thanks = document.getElementById("commentThanks");
    
    button.addEventListener("click", () => {
        const text = input.value;

        if (!text.trim()) return;

        saveInstantComment(text);

        input.value = "";
        thanks.classList.add("show");

        setTimeout(() => {
          thanks.classList.remove("show");
        }, 2000);
      });
    
    


  /* =============================
     即時コメント保存
     （フォーム送信後に呼ぶ）
  ============================= */
    const GAS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwVwNvVLKsnHa6-IrJu2XZXAuMWPisJ1cXV6ilXK3uPXhIjeUIcMcz2P7sOWg56c_GS/exec";

window.saveInstantComment = function (text) {
  if (!text) return;

  const trimmed = text.trim();

  /* ① 即時表示用（localStorage） */
  const list = JSON.parse(localStorage.getItem(INSTANT_KEY)) || [];
  list.push({
    text: trimmed,
    time: Date.now()
  });
  localStorage.setItem(INSTANT_KEY, JSON.stringify(list));

  /* ② 記録用（GASへ送信） */
  fetch(GAS_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      songId: songId,
      comment: trimmed,
      ua: navigator.userAgent
    })
  }).catch(err => {
    console.warn("GAS送信失敗", err);
  });
};

  

  /* =============================
     24時間以内の即時コメント取得
  ============================= */
  function getInstantComments() {
    const list = JSON.parse(localStorage.getItem(INSTANT_KEY)) || [];
    const now = Date.now();

    return list
      .filter(c => now - c.time < DISPLAY_DURATION)
      .map(c => c.text);
  }

  /* =============================
     表示用コメント統合
  ============================= */
  function getDisplayComments() {
    const instant = getInstantComments();
    if (instant.length > 0) {
      return [...instant, ...curatedComments];
    }
    return curatedComments;
  }

  /* =============================
     ユーティリティ
  ============================= */
  function pickRandom(array, count) {
    return [...array]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  }

  /* =============================
     バブル描画
  ============================= */
  function renderBubbles(texts, instantList) {
    const centerX = wrapper.offsetWidth / 2;
    const centerY = wrapper.offsetHeight / 2;

    bubbles.forEach((bubble, index) => {
      const text = texts[index];
      if (!text) return;

      const angle = startAngle + index * angleGap;
      const radius = baseRadius + index * radiusGap;

      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      bubble.textContent = "🎧 " + text;
      bubble.style.left = `${x}px`;
      bubble.style.top = `${y}px`;
      bubble.style.zIndex = bubbles.length - index;

      // 即時コメント判定
      bubble.dataset.instant = instantList.includes(text);

      bubble.classList.remove("show");
      setTimeout(() => bubble.classList.add("show"), index * 300);
    });
  }

  /* =============================
     コメント回転
  ============================= */
  function rotateComments() {
    const instant = getInstantComments();
    const allComments = getDisplayComments();
    if (allComments.length === 0) return;

    startAngle = Math.random() * Math.PI * 2;
    const nextSet = pickRandom(allComments, bubbles.length);

    bubbles.forEach(b => b.classList.remove("show"));
    setTimeout(() => renderBubbles(nextSet, instant), 300);
  }

  /* =============================
     初期表示 & 自動ローテ
  ============================= */
  rotateComments();
  setInterval(rotateComments, rotationInterval);
});



document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById('lyricsToggle');
  const container = document.getElementById('lyrics');

  if (toggle && container) {
    toggle.addEventListener('click', () => {
      container.classList.toggle('open');
    });
  }
});
