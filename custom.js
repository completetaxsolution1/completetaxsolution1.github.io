$(document).ready(function () {
    // ===== HEADER STATE =====
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.header-section').addClass('scrolled');
        } else {
            $('.header-section').removeClass('scrolled');
        }
    });

    // ===== MOBILE MENU =====
    $('#mobile-menu-show').click(function () {
        $('#nav-links').toggleClass('active');
        $(this).toggleClass('open');
    });

    // ===== REVEAL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    $('.reveal').each(function() {
        revealObserver.observe(this);
    });

    // ===== STATS ANIMATION =====
    let animated = false;
    const statsSection = document.querySelector('.stats');

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                animated = true;
                $('.stat-number').each(function () {
                    let $this = $(this);
                    let targetStr = $this.attr('data-target');
                    let target = parseInt(targetStr);
                    let suffix = targetStr.includes('+') ? '+' : '';

                    $({ count: 0 }).animate({ count: target }, {
                        duration: 2500,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.floor(this.count) + suffix);
                        },
                        complete: function () {
                            $this.text(target + suffix);
                        }
                    });
                });
            }
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // ===== MODAL =====
    $("#mybtn, .view-profile-btn").click(function (e) {
        e.preventDefault();
        $("#profileModal").fadeIn();
    });

    $(".close-btn").click(function () {
        $("#profileModal").fadeOut();
    });

    $(window).click(function (e) {
        if ($(e.target).is("#profileModal")) {
            $("#profileModal").fadeOut();
        }
    });

    // ===== CONTACT FORM HANDLING =====
    $('#contact-form').on('submit', function (e) {
        e.preventDefault();
        const $form = $(this);
        const $btn = $('#submit-btn');
        const $successMsg = $('#success-msg');
        const formData = $form.serialize();

        // Visual feedback
        $btn.html('<i class="fas fa-spinner fa-spin"></i> Sending Message...');
        $btn.prop('disabled', true);

        // Real Submission to FormSubmit.co via AJAX
        $.ajax({
            url: "https://formsubmit.co/ajax/Rajeshjain0083@gmail.com",
            method: "POST",
            data: formData,
            dataType: "json",
            success: function(data) {
                $form.addClass('submitted');
                $successMsg.addClass('show');
            },
            error: function(err) {
                alert("Something went wrong. Please try again or call us directly.");
                $btn.html('Submit Inquiry');
                $btn.prop('disabled', false);
            }
        });
    });

    // ===== SMOOTH SCROLL =====
    $('a[href^="#"]').click(function (e) {
        let targetId = $(this).attr("href");
        if (targetId === "#") return;
        
        e.preventDefault();
        let target = $(targetId);

        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }

        $('#nav-links').removeClass('active');
    });
});
