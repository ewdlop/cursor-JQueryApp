$(document).ready(function() {
    // 导航栏汉堡菜单
    $('.burger').click(function() {
        $('.nav-links').toggleClass('active');
        $(this).toggleClass('active');
    });

    // 轮播图功能
    let currentSlide = 0;
    const slides = $('.slide');
    const totalSlides = slides.length;

    function showSlide(n) {
        slides.removeClass('active');
        currentSlide = (n + totalSlides) % totalSlides;
        slides.eq(currentSlide).addClass('active');
    }

    // 自动轮播
    let slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // 上一张/下一张按钮
    $('.prev').click(function() {
        clearInterval(slideInterval);
        showSlide(currentSlide - 1);
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    });

    $('.next').click(function() {
        clearInterval(slideInterval);
        showSlide(currentSlide + 1);
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    });

    // 平滑滚动
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 60
            }, 1000);
        }
    });

    // 表单提交
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            message: $('#message').val()
        };

        // 这里可以添加 AJAX 请求来发送表单数据
        console.log('表单数据：', formData);
        
        // 显示提交成功消息
        alert('感谢您的留言！我们会尽快回复您。');
        
        // 清空表单
        this.reset();
    });

    // 滚动时导航栏效果
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').css('background', 'rgba(51, 51, 51, 0.9)');
        } else {
            $('.navbar').css('background', '#333');
        }
    });
}); 