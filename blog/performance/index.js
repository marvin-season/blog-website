document.querySelector('.toggle-btn').addEventListener('click', (e) => {
    const list = document.querySelector('.list');
    list.classList.toggle('active');
    e.stopPropagation()
});

// 点击外部区域收起列表（可选）
document.addEventListener('click', (e) => {
    if (!e.target.closest('.list-container')) {
        document.querySelector('.list').classList.remove('active');
    }
});