$(function () {
    $('body').on('click', '.page-scroll a', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 70
        }, 600);
        event.preventDefault();
    });
    if ($(window).width() < 768) {
        $(".navbar-light .nav-link").on('click', function () {
            $(".navbar-toggler").click();
        })
    }
    $(".btn_top").on('click', function () {
        $('html, body').animate({
            scrollTop: $('#header').offset().top - 80
        }, 600);
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() >= window.innerHeight) {
            $(".btn_top").fadeIn();
        }
        else $(".btn_top").fadeOut();
    })

    $("#cloud_flatform").owlCarousel({
        nav: true,
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        navText: ["<img src='./assets/images/arrorw_left.png' >", "<img src='./assets/images/arrorw_right.png' >"],
        mouseDrag: true,
        touchDrag: true
    });
    $("#ip_flatform").owlCarousel({
        nav: true,
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        navText: ["<img src='./assets/images/arrorw_left.png' >", "<img src='./assets/images/arrorw_right.png' >"],
        mouseDrag: true,
        touchDrag: true
    });
})

function isValidEmail(emailText) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailText);
};

function checkPhoneNumber() {
    var flag = false;
    var phone = $('#phone').val().trim(); // ID của trường Số điện thoại
    phone = phone.replace('(+84)', '0');
    phone = phone.replace('+84', '0');
    phone = phone.replace('0084', '0');
    phone = phone.replace(/ /g, '');
    if (phone != '') {
        var firstNumber = phone.substring(0, 2);
        if ((firstNumber == '09' || firstNumber == '08' || firstNumber == '03' || firstNumber == '05' || firstNumber == '07') && phone.length == 10) {
            if (phone.match(/^\d{10}/)) {
                flag = true;
            }
        }
    }
    return flag;
}


function kiemtra() {
    if ($('#fullname').val() == "") {
        alert("Vui lòng nhập Họ tên!");
        $('#fullname').focus();
    }
    else if (!checkPhoneNumber()) {
        alert("Số điện thoại bạn điền không hợp lệ !");
        $('#phone').focus();
        return false;
    }
    else if (!isValidEmail($('#email').val())) {
        alert("Email bạn điền không hợp lệ !");
        $('#email').focus();
        return false;
    }
    else if ($('#company').val() == "") {
        alert("Vui lòng nhập Họ tên!");
        $('#company').focus();
    }
    else {
        const phone = $('#phone').val();
        const fullname = $('#fullname').val();
        const email = $('#email').val();
        const company = $('#company').val();
        $.ajax({
            type: "POST",
            url: "api/register.php",
            data: { fullname: fullname, email: email, phone: phone, company: company },
            success: function (data) {
                data = JSON.parse(data);
                if (data.result === "0") {
                    alert("Bạn đã đăng ký rồi");
                }
                else {
                    window.location.href = "thanks.html";
                }
            }
        });
    }

}

