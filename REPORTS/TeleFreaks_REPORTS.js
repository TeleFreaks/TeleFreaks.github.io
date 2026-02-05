document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".live-image img").forEach(img => {

    function checkImage() {

      const w = img.naturalWidth;
      const h = img.naturalHeight;

      if (w > h * 1.2) {
        img.closest(".live-card")
          .classList.add("wide-image");
      }
    }

    // すでに読み込み済みなら即実行
    if (img.complete) {
      checkImage();
    } 
    // まだならload待ち
    else {
      img.addEventListener("load", checkImage);
    }

  });

});
