
  const itemsPerPage = 10;
  const items = document.querySelectorAll('.music-item');
  const pagination = document.getElementById('pagination');

  let currentPage = 1;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  function showPage(page) {
    currentPage = page;
      
      // URLにページ番号を保存
      const url = new URL(window.location);
      url.searchParams.set('page', page);
      history.pushState({}, '', url);

        items.forEach((item, index) => {
          const start = (page - 1) * itemsPerPage;
          const end = page * itemsPerPage;
          item.style.display = index >= start && index < end ? 'flex' : 'none';
        });

        renderPagination();
  }

  function renderPagination() {
    pagination.innerHTML = '';

    // 前へ
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '←';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => showPage(currentPage - 1);
    pagination.appendChild(prevBtn);

    // ページ番号
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === currentPage) btn.classList.add('active');
      btn.onclick = () => showPage(i);
      pagination.appendChild(btn);
    }

    // 次へ
    const nextBtn = document.createElement('button');
    nextBtn.textContent = '→';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => showPage(currentPage + 1);
    pagination.appendChild(nextBtn);
  }

// 初期表示（URLから取得）
    const params = new URLSearchParams(window.location.search);
    const pageFromUrl = parseInt(params.get('page')) || 1;

    showPage(pageFromUrl);



// ===== 隠しトラック（複数対応）=====

    const secretItems = document.querySelectorAll(".secret-item");

    secretItems.forEach((item, index) => {

      let timer = null;

      const key = "secretUnlocked_" + index;

      // すでに解放済みなら表示
      if (localStorage.getItem(key)) {
        item.classList.add("revealed");
      }

      item.addEventListener("mouseenter", () => {

        timer = setTimeout(() => {
          item.classList.add("revealed");
          localStorage.setItem(key, "true");
        }, 5000);

      });

      item.addEventListener("mouseleave", () => {
        clearTimeout(timer);
      });

    });


