$(window).load(function(){
	$('#preloader').fadeOut('slow',function(){$(this).remove();});
});



/* Menu */ 
(function() {

	var bodyEl = document.body,
		//content = document.querySelector( '.content-wrap' ),
		openbtn = document.getElementById( 'open-button' ),
		closebtn = document.getElementById( 'close-button' ),
		isOpen = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		openbtn.addEventListener( 'click', toggleMenu );
		if( closebtn ) {
			closebtn.addEventListener( 'click', toggleMenu );
		}
	}

	function toggleMenu() {
		if( isOpen ) {
			classie.remove( bodyEl, 'show-menu' );
		}
		else {
			classie.add( bodyEl, 'show-menu' );
		}
		isOpen = !isOpen;
	}

	init();

})();
/* smooth scrolling */
$(document).ready(function(){
	$("a").on('click', function(event) {
	  if (this.hash !== "") {
		
		event.preventDefault();
  		var hash = this.hash;
  		$('html, body').animate({
		  scrollTop: $(hash).offset().top
		}, 800, function(){
  
		  window.location.hash = hash;
		});
	  }
	});
});

(function() {
	"use strict";
  
	/**
	 * Easy selector helper function
	 */
	const select = (el, all = false) => {
	  el = el.trim()
	  if (all) {
		return [...document.querySelectorAll(el)]
	  } else {
		return document.querySelector(el)
	  }
	}
  
	/**
	 * Easy event listener function
	 */
	const on = (type, el, listener, all = false) => {
	  let selectEl = select(el, all)
	  if (selectEl) {
		if (all) {
		  selectEl.forEach(e => e.addEventListener(type, listener))
		} else {
		  selectEl.addEventListener(type, listener)
		}
	  }
	}
  
	/**
	 * Easy on scroll event listener 
	 */
	const onscroll = (el, listener) => {
	  el.addEventListener('scroll', listener)
	}
  
	/**
	 * Scrolls to an element with header offset
	 */
	const scrollto = (el) => {
	  let header = select('#header')
	  let offset = header.offsetHeight
  
	  let elementPos = select(el).offsetTop
	  window.scrollTo({
		top: elementPos - offset,
		behavior: 'smooth'
	  })
	}
  
	/**
	 * Back to top button
	 */
	let backtotop = select('.back-to-top')
	if (backtotop) {
	  const toggleBacktotop = () => {
		if (window.scrollY > 100) {
		  backtotop.classList.add('active')
		} else {
		  backtotop.classList.remove('active')
		}
	  }
	  window.addEventListener('load', toggleBacktotop)
	  onscroll(document, toggleBacktotop)
	}
  
	/**
	 * Mobile nav toggle
	 */
	on('click', '.mobile-nav-toggle', function(e) {
	  select('#navbar').classList.toggle('navbar-mobile')
	  this.classList.toggle('bi-list')
	  this.classList.toggle('bi-x')
	})
  
	/**
	 * Mobile nav dropdowns activate
	 */
	on('click', '.navbar .dropdown > a', function(e) {
	  if (select('#navbar').classList.contains('navbar-mobile')) {
		e.preventDefault()
		this.nextElementSibling.classList.toggle('dropdown-active')
	  }
	}, true)
  
	/**
	 * Scrool with ofset on links with a class name .scrollto
	 */
	on('click', '.scrollto', function(e) {
	  if (select(this.hash)) {
		e.preventDefault()
  
		let navbar = select('#navbar')
		if (navbar.classList.contains('navbar-mobile')) {
		  navbar.classList.remove('navbar-mobile')
		  let navbarToggle = select('.mobile-nav-toggle')
		  navbarToggle.classList.toggle('bi-list')
		  navbarToggle.classList.toggle('bi-x')
		}
		scrollto(this.hash)
	  }
	}, true)
  
	/**
	 * Scroll with ofset on page load with hash links in the url
	 */
	
  
	/**
	 * Preloader
	 */
	let preloader = select('#preloader');
	if (preloader) {
	  window.addEventListener('load', () => {
		preloader.remove()
	  });
	}
  
	
  
	/**
	 * Initiate portfolio lightbox 
	 */
	const portfolioLightbox = GLightbox({
	  selector: '.portfolio-lightbox'
	});
  
	/**
	 * Initiate portfolio details lightbox 
	 */
	const portfolioDetailsLightbox = GLightbox({
	  selector: '.portfolio-details-lightbox',
	  width: '90%',
	  height: '90vh'
	});
  
	/**
	 * Portfolio details slider
	 */
	new Swiper('.portfolio-details-slider', {
	  speed: 400,
	  loop: true,
	  autoplay: {
		delay: 5000,
		disableOnInteraction: false
	  },
	  pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true
	  }
	});
  
	/**
	 * Skills animation
	 */
	let skilsContent = select('.skills-content');
	if (skilsContent) {
	  new Waypoint({
		element: skilsContent,
		offset: '80%',
		handler: function(direction) {
		  let progress = select('.progress .progress-bar', true);
		  progress.forEach((el) => {
			el.style.width = el.getAttribute('aria-valuenow') + '%'
		  });
		}
	  })
	}
    
  })()