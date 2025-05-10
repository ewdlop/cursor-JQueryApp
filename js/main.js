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

    // 数字增长动画
    function animateNumbers() {
        $('.stat-item h3').each(function() {
            const $this = $(this);
            const countTo = parseInt($this.text());
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum) + '+');
                },
                complete: function() {
                    $this.text(this.countNum + '+');
                }
            });
        });
    }

    // 滚动动画
    function checkScroll() {
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();

        $('.service-card, .stat-item').each(function() {
            const elementTop = $(this).offset().top;
            if (elementTop < scrollTop + windowHeight - 100) {
                $(this).addClass('animate');
            }
        });

        // 检查是否到达统计数字部分
        if ($('.about-stats').length) {
            const statsTop = $('.about-stats').offset().top;
            if (statsTop < scrollTop + windowHeight - 100) {
                animateNumbers();
                // 移除滚动监听，避免重复触发
                $(window).off('scroll', checkScroll);
            }
        }
    }

    // 初始化滚动监听
    $(window).on('scroll', checkScroll);
    checkScroll(); // 初始检查

    // 平滑滚动到顶部按钮
    const $scrollTop = $('<button>', {
        class: 'scroll-top',
        html: '<i class="fas fa-arrow-up"></i>'
    }).appendTo('body');

    $scrollTop.click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    // 控制滚动到顶部按钮的显示/隐藏
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $scrollTop.fadeIn();
        } else {
            $scrollTop.fadeOut();
        }
    });

    // 服务卡片悬停效果
    $('.service-card').hover(
        function() {
            $(this).find('i').css('transform', 'scale(1.2)');
        },
        function() {
            $(this).find('i').css('transform', 'scale(1)');
        }
    );

    // 作品展示筛选功能
    $('.filter-btn').click(function() {
        const filter = $(this).data('filter');
        
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        if (filter === 'all') {
            $('.portfolio-item').fadeIn();
        } else {
            $('.portfolio-item').hide();
            $(`.portfolio-item[data-category="${filter}"]`).fadeIn();
        }
    });

    // 新闻卡片动画
    $('.news-card').hover(
        function() {
            $(this).find('.news-image img').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('.news-image img').css('transform', 'scale(1)');
        }
    );

    // 客户评价轮播
    let currentTestimonial = 0;
    const testimonials = $('.testimonial-item');
    const totalTestimonials = testimonials.length;

    // 创建轮播点
    for (let i = 0; i < totalTestimonials; i++) {
        $('.testimonial-dots').append('<div class="dot"></div>');
    }
    $('.dot').first().addClass('active');

    function showTestimonial(n) {
        testimonials.hide();
        currentTestimonial = (n + totalTestimonials) % totalTestimonials;
        testimonials.eq(currentTestimonial).fadeIn();
        
        $('.dot').removeClass('active');
        $('.dot').eq(currentTestimonial).addClass('active');
    }

    // 自动轮播
    let testimonialInterval = setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 5000);

    // 上一张/下一张按钮
    $('.prev-testimonial').click(function() {
        clearInterval(testimonialInterval);
        showTestimonial(currentTestimonial - 1);
        testimonialInterval = setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 5000);
    });

    $('.next-testimonial').click(function() {
        clearInterval(testimonialInterval);
        showTestimonial(currentTestimonial + 1);
        testimonialInterval = setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 5000);
    });

    // 点击轮播点切换
    $('.dot').click(function() {
        const index = $(this).index();
        clearInterval(testimonialInterval);
        showTestimonial(index);
        testimonialInterval = setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 5000);
    });

    // 初始化显示第一个评价
    showTestimonial(0);

    // 作品展示图片加载动画
    $('.portfolio-item').each(function(index) {
        $(this).css('animation-delay', `${index * 0.2}s`);
    });

    // 新闻卡片加载动画
    $('.news-card').each(function(index) {
        $(this).css('animation-delay', `${index * 0.2}s`);
    });

    // FAQ折叠功能
    $('.faq-question').click(function() {
        const $faqItem = $(this).parent();
        const $answer = $(this).next();
        
        if ($faqItem.hasClass('active')) {
            $faqItem.removeClass('active');
            $answer.css('max-height', '0');
        } else {
            $('.faq-item').removeClass('active');
            $('.faq-answer').css('max-height', '0');
            $faqItem.addClass('active');
            $answer.css('max-height', $answer[0].scrollHeight + 'px');
        }
    });

    // 价格方案按钮点击效果
    $('.pricing-btn').click(function() {
        const plan = $(this).closest('.pricing-card').find('h3').text();
        $('#contactForm').prepend(`
            <div class="form-group">
                <input type="text" value="咨询${plan}方案" readonly>
            </div>
        `);
        $('html, body').animate({
            scrollTop: $('#contact').offset().top - 60
        }, 1000);
    });

    // 团队成员社交链接悬停效果
    $('.member-social a').hover(
        function() {
            $(this).css('transform', 'scale(1.2)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );

    // 价格卡片悬停效果
    $('.pricing-card').hover(
        function() {
            $(this).find('.pricing-btn').css('background', '#555');
        },
        function() {
            $(this).find('.pricing-btn').css('background', '#333');
        }
    );

    // 初始化FAQ状态
    $('.faq-answer').css('max-height', '0');
}); 