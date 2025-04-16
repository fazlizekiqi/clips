import './style.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Background color setup
// gsap.set(".slides div", {
//     backgroundColor: (index, target, targets) => {
//         let hue = (index / targets.length) * 360;
//         return `hsl(${hue}, 75%, 75%, 0.8)`; // fixed typo: 750% -> 75%
//     }
// });

const html = document.querySelector("html");
const animation = gsap.to(".slides", {
    xPercent: -80,
    duration: 5,
    ease: "none"
});

ScrollTrigger.create({
    trigger: ".slidesPin",
    start: "top 0%",
    endTrigger: ".end",
    end: "bottom 100%",
    pin: true,
    animation: animation,
    scrub: 1.5,
    markers: false
});

ScrollTrigger.create({
    trigger: ".flick",
    start: "top -75px",
    endTrigger: ".end",
    end: "bottom 110%",
    onEnter: () => html.classList.add("snap"),
    onEnterBack: () => html.classList.add("snap"),
    onLeaveBack: () => html.classList.remove("snap"),
    onLeave: () => html.classList.remove("snap"),
    onRefresh: (self) => {
        if (self.isActive) {
            html.classList.add("snap");
        }
    }
});
// Number of particles
const particleCount = 250;

function createParticles() {
    const container = document.querySelector('.particles-container');

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('span');
        particle.classList.add('particle');
        container.appendChild(particle);

        // Set random position and animation delay
        const x = Math.random() * 100;  // Horizontal position
        const y = Math.random() * 100;  // Vertical position
        const size = Math.random() * 10 + 2; // Random size between 2 and 7px
        const animationDuration = Math.random() * 3 + 3; // Animation duration between 3 and 6 seconds

        // Style the particle
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // GSAP animation for particle movement
        gsap.to(particle, {
            duration: animationDuration,
            x: Math.random() * 100 - 100,  // Random horizontal movement
            y: Math.random() * 200 - 100,  // Random vertical movement
            ease: "power2.inOut", // Smooth easing function
            repeat: -1,  // Infinite loop
            yoyo: true   // Make the animation go back and forth
        });
    }
}

// Initialize particles when the page is loaded
// window.addEventListener('load', createParticles);


window.addEventListener("resize", () => {
    html.classList.remove("snap");
    ScrollTrigger.refresh()
    setTimeout(()=> {
        ScrollTrigger.refresh()
    }, 500)
});


