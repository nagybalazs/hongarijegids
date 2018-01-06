var lightbox = GLightbox({'selector': 'glightbox-demo'});
var currentTripType = undefined;

$('#dropdown .dropdown-menu a').on('click', function(){
    $('#dropdown input').val($(this).html());
});

$('.section .section-right-box a.btn.btn-primary').on('click', function(){
    $('#dropdown input').val($(this).attr('data-tourtype'));
});

// Smooth scrolling using jQuery easing
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
	  var target = $(this.hash);
	  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	  if (target.length) {
		$('html, body').animate({
		  scrollTop: (target.offset().top - 54)
		}, 1000, "easeInOutExpo");
		return false;
	  }
	}
});

$('.nav-link').click(function() {
	$('.nav-link').each(function() {
		$(this).removeClass('active');
	});
	$(this).addClass('active');
});

$('.dropdown-menu a').click(function() {
	currentTripType = $(this).attr('off-id');
});

$('#offer-submit').click(function() {
	
	var err = false;
	$('.err').css('display', 'none');
	
	var userName = $('#inputUserName').val();
	var userMail = $('#inputUserMail').val();
	var dateTime = $('#inputDateTime').val();
	var content = $('#inputMessage').val();
	var type = currentTripType;
	
	if(!userName) {
		err = true;
		$('#name-required-err').css('display', 'block');
	}
	
	if(!userMail) {
		err = true;
		$('#email-required-err').css('display', 'block');
	}
	else {
		if(!/^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$/.test(userMail)) { 
			err = true;
			$('#email-format-err').css('display', 'block');
		}
	}
	
	if(!dateTime) {
		err = true;
		$('#date-required-err').css('display', 'block');
	}
	else {
		var parsed = moment.utc(dateTime, "DD-MM-YYYY", true);
		if(!parsed.isValid()) {
			err = true;
			$('#date-format-err').css('display', 'block');
		}
		else {
			dateTime = parsed.format();
		}
	}
	
	if(!content) {
		err = true;
		$('#content-required-err').css('display', 'block');
	}
	
	if(!type) {
		err = true;
		$('#type-required-err').css('display', 'block');
	}
	
	if(err) {
		return;
	}
	
	var data = {
		name: userName,
		email: userMail,
		prefdate: dateTime,
		content: content,
		type: type
	};
	
	var up = JSON.stringify(data);
	console.log(up);
	
	$.ajax({
		method: 'POST',
		url: '/offers',
		data: up,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		success: function(data) {
			$('#formOffer').hide(500);
		},
		error: function(err) {
			$('#formOffer').hide(500)
		}
	});
});

$('#offer-link').click(function() {
	$('#formOffer').show();
});