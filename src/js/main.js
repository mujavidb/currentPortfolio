//For debugging
function p(x) {
    console.log(x)
}

//Object literal
const mysite = {

    // Initialise all modules
    init: () => {

        mysite.welcome.init()

        mysite.mainFade.init()

        mysite.iphoneFloat.init()

        mysite.imageSlider.init()

        mysite.scrollEffects.init()

        mysite.linkTracking.init()

    },
    util: {

        //modified from: http://stackoverflow.com/a/7557433/3197684 by adding offset
        isInRange: (el, offset = 0) => {
            const rect = el.getBoundingClientRect()
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight * (1 + offset) || document.documentElement.clientHeight * (1 + offset)) &&
                rect.right <= (window.innerWidth * (1 + offset) || document.documentElement.clientWidth * (1 + offset))
            )
        }
    },
    welcome: {
        init: () => {
            if (navigator.userAgent.indexOf("Firefox") != -1) {
                const welcome_message = "%c\n" +
                    "Peaking under the hood? \n" +
                    "You can see the full source\n" +
                    "code for this site on GitHub:\n" +
                    "%chttps://github.com/mujavidb/portfolio/" +
                    "%c\nI plan on making improvements to this site,\n" +
                    "you can check them out with a simple curl\n\n" +
                    "%c$ curl mujavidb.com\n\n"

                const styles = "font-family: Lato, sans-seriffont-size: 16px line-height: 1.4background-color: black display:block margin: 0 autowidth: calc(100vw - 300px) text-align: centertext-rendering: optimizelegibility -moz-osx-font-smoothing: grayscalefont-feature-settings: \"liga\"background: linear-gradient(to left, #e96443 , #904e95)"
                console.log(
                    welcome_message,
                    styles + "color: rgba(255, 255, 255, 0.75)",
                    styles + "color: white",
                    styles + "color: rgba(255, 255, 255, 0.75)",
                    styles + "color: white"
                )
            } else {
                const welcome_message = "\n" +
                    "***************************************************************\n" +
                    "******************* Peaking under the hood? *******************\n" +
                    "********* This site is written in SASS and JavaScript *********\n" +
                    "******** You can see the full source code on my GitHub ********\n" +
                    "************* https://github.com/mujavidb/mysite/ *************\n" +
                    "***************************************************************\n" +
                    "******************** To see future features *******************\n" +
                    "********************* $ curl mujavidb.com *********************\n" +
                    "***************************************************************\n"
                console.log(welcome_message)
            }
        }
    },
    mainFade: {
        init: () => {

        }
    },
    iphoneFloat: {
        init: () => {
            const container = document.querySelector('.scoodle .left_block')
            const phone = document.getElementById('scoodle_svg')

            function floatDown() {
                if (mysite.util.isInRange(container, 0.3)) {
                    container.classList.add('floatNow')
                    phone.classList.add('fadeUp')
                    document.removeEventListener('scroll', floatDown)
                }
            }
            document.addEventListener('scroll', floatDown, false)
        }
    },
    scrollEffects: {
        init: () => {
            function adjustColor() {
            	let bg_rect = panel.getBoundingClientRect()
            	let proportion = (bg_rect.top / panel.offsetHeight) * 100
                if (proportion < 20) {
                    document.body.classList.add("darken")
                    document.documentElement.classList.add("darken")
                    panel_container.style.boxShadow = "none"
                } else {
                    document.body.classList.remove("darken")
                    document.documentElement.classList.remove("darken")
                    panel_container.style.boxShadow = shadow_color
                }
            }
            function adjustHeader(){
            	const header_rect = header.getBoundingClientRect()
            	const relative_header = (header_rect.top / header.offsetHeight) * -1
            	const scaledHeight = 4 * relative_header * 100
            	const scaledOpacity = relative_header > 0.2 ? 1.15 - relative_header * 1.8
    														: 1.15 - relative_header
            	header.style.transform = `translate(0, ${scaledHeight}px)`
            	header.style.opacity = scaledOpacity
            }

            //variables for about container fade
            const panel = document.getElementById('backgroundDark')
            const panel_start = panel.style.backgroundColor
            const panel_container = document.querySelector('.experience')
            const shadow_color = panel_container.style.boxShadow

            //variables for header fade out
            const header = document.querySelector(".intro")
            
            adjustColor()
            adjustHeader()
            document.addEventListener('scroll', () => {
                adjustColor()
                adjustHeader()
            }, false)
        }
    },
    imageSlider: {
        init: () => {

            //should be declared nextSlide(x, y = false), but not compatible with Safari
            function nextSlide(x, y = false) {
                if (!y) {
                    x != 2 ? x += 1 : x = 0
                } else {
                    x == 0 ? x = 2 : (x == 1 ? x = 0 : x = 1)
                }
                return x
            }

            function prevSlide(x, y = false) {
                if (!y) {
                    x != 0 ? x -= 1 : x = 2
                } else {
                    x == 0 ? x = 1 : (x == 1 ? x = 2 : x = 0)
                }
                return x
            }

            function loadNextSlide() {
                ga('send', 'event', 'Slider', 'Codecademy', 'Next')

                //Translate first slide upwards
                slides[current].classList.add('go_next')
                slides[current].classList.remove('from_next')

                setTimeout(() => {

                    //Reorder all slides
                    var next_item

                    slides[current].classList.remove('go_next')
                    slides[current].style.order = 2

                    //Animate in next slide
                    next_item = nextSlide(current)
                    slides[next_item].classList.add('from_next')
                    slides[next_item].style.order = 0

                    next_item = nextSlide(current, true)
                    slides[next_item].style.order = 1

                    current != 2 ? current += 1 : current = 0
                    wrapper.style.backgroundColor = bgcolors[current]

                }, 250)
            }

            function loadPrevSlide() {
                ga('send', 'event', 'Slider', 'Codecademy', 'Previous')

                slides[current].classList.remove('from_next')
                prev_item = prevSlide(current)
                slides[prev_item].classList.add('go_next')

                setTimeout(() => {
                    var prev_item

                    slides[current].style.order = 1

                    prev_item = prevSlide(current)
                    slides[prev_item].classList.add('from_next')
                    slides[prev_item].classList.remove('go_next')
                    slides[prev_item].style.order = 0

                    prev_item = prevSlide(current, true)
                    slides[prev_item].style.order = 2

                    current != 0 ? current -= 1 : current = 2
                    wrapper.style.backgroundColor = bgcolors[current]

                }, 250)
            }

            const wrapper = document.getElementById('sliderWrap')
            const slides = document.querySelectorAll('#mySlider .slide')
            const next_control = document.querySelectorAll('.slider_controls .next')[0]
            const prev_control = document.querySelectorAll('.slider_controls .prev')[0]
            const bgcolors = ["#5A7282", "#F1F1F1", "#F1F1F1"]
            let current = 0

            next_control.addEventListener('click', loadNextSlide, false)
            prev_control.addEventListener('click', loadPrevSlide, false)

            document.addEventListener('keydown', e => {
                if (mysite.util.isInRange(next_control, 0.5)) {

                    //Right key
                    if (e.keyCode == 39) {
                        loadNextSlide()
                    } else if (e.keyCode == 37) {
                        loadPrevSlide()
                    }
                }
            })
        }
    },
    linkTracking: {
        init: () => {
            Array.prototype.forEach.call(document.getElementsByTagName("a"), link => {
                if (link.hasAttribute("target") && link.getAttribute("target") == "_blank") {
                    link.addEventListener("click", () => {
                        ga('send', 'event', {
                            eventCategory: 'Outbound Link',
                            eventAction: 'Click',
                            eventLabel: link.href
                        })
                    }, false)
                }
            })
        }
    }
}

document.addEventListener('DOMContentLoaded', mysite.init)