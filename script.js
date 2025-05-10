// 数据统计动画
function animateStats() {
    $('.stat-number').each(function() {
        const $this = $(this);
        const countTo = $this.attr('data-count');
        
        $({ countNum: $this.text() }).animate({
            countNum: countTo
        }, {
            duration: 2000,
            easing: 'swing',
            step: function() {
                $this.text(Math.floor(this.countNum));
            },
            complete: function() {
                $this.text(this.countNum);
            }
        });
    });
}

// 检查元素是否在视口中
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 监听滚动事件
$(window).scroll(function() {
    // 数据统计动画
    if (isElementInViewport(document.querySelector('.stats-section'))) {
        animateStats();
        $(window).off('scroll');
    }
    
    // 返回顶部按钮
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').addClass('visible');
    } else {
        $('.back-to-top').removeClass('visible');
    }
});

// 合作伙伴轮播
let currentPosition = 0;
const slideWidth = 230; // 包含margin的宽度
const slideCount = $('.partner-item').length;
const totalWidth = slideWidth * slideCount;

function moveSlider() {
    currentPosition -= 1;
    if (currentPosition <= -slideWidth) {
        currentPosition = 0;
        $('.partner-item:first').appendTo('.partners-slider');
    }
    $('.partners-slider').css('transform', `translateX(${currentPosition}px)`);
}

// 自动轮播
setInterval(moveSlider, 30);

// 返回顶部按钮点击事件
$('.back-to-top').click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 800);
    return false;
}); 