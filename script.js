// Lấy danh sách các phần tử
const pages = document.querySelectorAll('.book-page.page-right');
const coverRight = document.querySelector('.cover-right');
const pageLeft = document.querySelector('.book-page.page-left');

// Hàm khởi tạo trạng thái ban đầu
function setInitialState() {
    // 1. CHỈNH SỬA BÌA: Đưa bìa sang phải (add 'turn') để làm nền cho các trang bên phải
    // và hạ z-index xuống thấp nhất (-1) để không che nội dung.
    coverRight.classList.add('turn'); 
    coverRight.style.zIndex = -1;
    
    // 2. CHỈNH SỬA TRANG: Đưa tất cả sang trái (add 'turn')
    pages.forEach((page, index) => {
        page.classList.add('turn');
        page.style.zIndex = 20 + index; 
    });
}

// Gọi hàm khởi tạo
setInitialState();

// Hiệu ứng lật ngược (Opening Animation)
setTimeout(() => {
    pages.forEach((page, index) => {
        let reverseIndex = pages.length - 1 - index;
        
        // Tốc độ lật: Nhanh (250ms mỗi trang)
        setTimeout(() => {
            page.classList.remove('turn');
            
            // Đặt lại z-index sau khi lật xong
            setTimeout(() => {
                page.style.zIndex = 10 - index; 
            }, 600);
            
        }, (reverseIndex + 1) * 250 + 100); 
    });
    
}, 2100); // Giữ nguyên thời gian chờ intro xoay sách

// --- Logic các nút bấm (ĐÃ SỬA LỖI) ---

const pageTurnBtn = document.querySelectorAll('.nextprev-btn');

pageTurnBtn.forEach((el) => {
    el.onclick = () => {
        // Lấy ID trang từ nút bấm (ví dụ: "turn-1", "turn-2")
        const pageTurnId = el.getAttribute('data-page');
        const pageTurn = document.getElementById(pageTurnId);
        
        // Tìm số thứ tự thực sự của trang này trong danh sách pages
        // Thay vì dùng index của nút bấm (gây lỗi z-index)
        const pageIndex = Array.from(pages).indexOf(pageTurn);

        if (pageTurn.classList.contains('turn')) {
            // HÀNH ĐỘNG: LẬT NGƯỢC (BACK)
            pageTurn.classList.remove('turn');
            
            // Giữ z-index cao trong quá trình lật để nó nằm trên các trang bên phải
            // Chỉ hạ z-index xuống sau khi animation hoàn tất (600ms)
            setTimeout(() => {
                pageTurn.style.zIndex = 10 - pageIndex;
            }, 600); 
        } else {
            // HÀNH ĐỘNG: LẬT TIẾP (NEXT)
            pageTurn.classList.add('turn');
            
            // Tăng z-index NGAY LẬP TỨC để trang đang lật đè lên trang bên trái
            // Nếu chờ 600ms mới tăng, nó sẽ bị cắt xuyên qua trang bên trái
            pageTurn.style.zIndex = 20 + pageIndex;
        }
    }
});

// Nút Contact Me
const contactMeBtn = document.querySelector('.contact-me');
if (contactMeBtn) {
    contactMeBtn.onclick = (e) => {
        e.preventDefault(); 
        pages.forEach((page, index) => {
            // Lật 2 tờ đầu tiên (index 0 và 1)
            if (index < 2) { 
                setTimeout(() => {
                    page.classList.add('turn');
                    page.style.zIndex = 20 + index;
                }, (index + 1) * 200 + 100);
            }
        });
    }
}

// Nút Back to Profile
const backProfileBtn = document.querySelector('.back-profile');
if (backProfileBtn) {
    backProfileBtn.onclick = (e) => {
        e.preventDefault();
        pages.forEach((page, index) => {
            setTimeout(() => {
                page.classList.remove('turn');
                page.style.zIndex = 10 - index; 
            }, (pages.length - index) * 200 + 100); 
        });
    }
}