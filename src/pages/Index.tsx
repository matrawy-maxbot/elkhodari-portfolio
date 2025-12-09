import { Hero } from "@/components/Hero";
import { CornerIcons } from "@/components/CornerIcons";
import { ProjectsMarquee } from "@/components/ProjectsMarquee";
import { useEffect } from "react";

function setIconsStartLocation() {
  const titleText = document.querySelector('.title-text');
  const sectionContainer = document.querySelector('.section-container');
  const originalCircle = document.querySelector('.title-text .circle') as HTMLElement;
  const titleTextStyles = window.getComputedStyle(titleText);
  const sectionContainerStyles = window.getComputedStyle(sectionContainer);
  const circleLeft = parseInt(sectionContainerStyles.paddingLeft) + parseInt(titleTextStyles.left) + parseInt(titleTextStyles.marginLeft) + originalCircle.offsetLeft;
  const circleTop = parseInt(sectionContainerStyles.paddingTop) + parseInt(titleTextStyles.top) + parseInt(titleTextStyles.marginTop) + originalCircle.offsetTop;
  console.log(parseInt(sectionContainerStyles.paddingLeft), parseInt(sectionContainerStyles.paddingTop), parseInt(titleTextStyles.left), parseInt(titleTextStyles.top), parseInt(titleTextStyles.marginLeft), parseInt(titleTextStyles.marginTop), originalCircle.offsetLeft, originalCircle.offsetTop);
  const circleWidth = titleTextStyles.width;
  const circleHeight = titleTextStyles.height;
  const circleRadius = titleTextStyles.borderRadius;
  const circleColor = window.getComputedStyle(document.querySelector('section')).backgroundColor;
  const circleBorder = window.getComputedStyle(document.querySelector('section')).border;
  const circleShadow = window.getComputedStyle(document.querySelector('section')).boxShadow;

  const whatsappIcon = document.querySelector('.whatsapp-icon') as HTMLElement;
  const githubIcon = document.querySelector('.github-icon') as HTMLElement;
  const linkedinIcon = document.querySelector('.linkedin-icon') as HTMLElement;
  const iconsCover = document.querySelector('.icons-cover') as HTMLElement;

  whatsappIcon.style.left = `0}px`;
  whatsappIcon.style.top = `0px`;
  whatsappIcon.style.width = `${circleWidth}px`;
  whatsappIcon.style.height = `${circleHeight}px`;
  whatsappIcon.style.opacity = `1`;
  whatsappIcon.style.borderRadius = `${circleRadius}px`;
  whatsappIcon.style.backgroundColor = `${circleColor}px`;
  whatsappIcon.style.border = `${circleBorder}px`;
  whatsappIcon.style.boxShadow = `${circleShadow}px`;
  whatsappIcon.style.setProperty('--left-position', `${circleLeft}px`);
  whatsappIcon.style.setProperty('--top-position', `${circleTop}px`);

  githubIcon.style.left = `0px`;
  githubIcon.style.top = `0px`;
  githubIcon.style.width = `${circleWidth}px`;
  githubIcon.style.height = `${circleHeight}px`;
  githubIcon.style.opacity = `1`;
  githubIcon.style.borderRadius = `${circleRadius}px`;
  githubIcon.style.backgroundColor = `${circleColor}px`;
  githubIcon.style.border = `${circleBorder}px`;
  githubIcon.style.boxShadow = `${circleShadow}px`;
  githubIcon.style.setProperty('--left-position', `${circleLeft}px`);
  githubIcon.style.setProperty('--top-position', `${circleTop}px`);

  linkedinIcon.style.left = `0px`;
  linkedinIcon.style.top = `0px`;
  linkedinIcon.style.width = `${circleWidth}px`;
  linkedinIcon.style.height = `${circleHeight}px`;
  linkedinIcon.style.opacity = `1`;
  linkedinIcon.style.borderRadius = `${circleRadius}px`;
  linkedinIcon.style.backgroundColor = `${circleColor}px`;
  linkedinIcon.style.border = `${circleBorder}px`;
  linkedinIcon.style.boxShadow = `${circleShadow}px`;
  linkedinIcon.style.setProperty('--left-position', `${circleLeft}px`);
  linkedinIcon.style.setProperty('--top-position', `${circleTop}px`);

  iconsCover.style.left = `0px`;
  iconsCover.style.top = `0px`;
  iconsCover.style.width = `${circleWidth}px`;
  iconsCover.style.height = `${circleHeight}px`;
  iconsCover.style.opacity = `1`;
  iconsCover.style.borderRadius = `${circleRadius}px`;
  iconsCover.style.backgroundColor = `${circleColor}px`;
  iconsCover.style.border = `${circleBorder}px`;
  iconsCover.style.boxShadow = `${circleShadow}px`;

  whatsappIcon.style.transform = `translate(${circleLeft}px, ${circleTop}px)`;
  githubIcon.style.transform = `translate(${circleLeft}px, ${circleTop}px)`;
  linkedinIcon.style.transform = `translate(${circleLeft}px, ${circleTop}px)`;
  iconsCover.style.transform = `translate(${circleLeft}px, ${circleTop}px)`;
}

const Index = () => {
  useEffect(() => {
    setTimeout(() => {
      setIconsStartLocation();
    }, 1500);
  }, []);

  return (
    <div className="section-container bg-gray-800 pt-8 flex items-center justify-center">
      <img src="1.png" alt="inner-curve" className="avatar absolute top-0 left-0 w-full h-full object-cover object-top" />
      <div className="filter-shadow">
        <div className="inner-curve bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-[1400px] relative">
          <img src="download.jpeg" alt="background" className="fixed top-0 left-0 w-full h-full object-cover object-top" />
          <div className="background-cover absolute top-0 left-0 w-full h-full bg-gray-200 opacity-[97%]"></div>
          <Hero />
          <CornerIcons />
        </div>
      </div>
      <a href="https://wa.me/1552913217" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
        <div data-icon="whatsapp" id="whatsapp-icon" style={{ '--animation-delay': '4s', '--animation2-delay': '4s' } as React.CSSProperties} className="whatsapp-icon community-icon w-[12px] h-[12px] bg-green-600 rounded-full absolute top-0 left-0 shadow-md opacity-0">
          <svg className="w-[.35rem] absolute top-1/2 left-1/2 fill-[#eafff2] -translate-x-[54%] -translate-y-[55%]" viewBox="0 0 24 24">
            <path d="M20.463,3.488C18.217,1.24,15.231,0.001,12.05,0    C5.495,0,0.16,5.334,0.157,11.892c-0.001,2.096,0.547,4.142,1.588,5.946L0.057,24l6.304-1.654    c1.737,0.948,3.693,1.447,5.683,1.448h0.005c6.554,0,11.89-5.335,11.893-11.893C23.944,8.724,22.708,5.735,20.463,3.488z     M12.05,21.785h-0.004c-1.774,0-3.513-0.477-5.031-1.378l-0.361-0.214l-3.741,0.981l0.999-3.648l-0.235-0.374    c-0.99-1.574-1.512-3.393-1.511-5.26c0.002-5.45,4.437-9.884,9.889-9.884c2.64,0,5.122,1.03,6.988,2.898    c1.866,1.869,2.893,4.352,2.892,6.993C21.932,17.351,17.498,21.785,12.05,21.785z M17.472,14.382    c-0.297-0.149-1.758-0.868-2.031-0.967c-0.272-0.099-0.47-0.149-0.669,0.148s-0.767,0.967-0.941,1.166    c-0.173,0.198-0.347,0.223-0.644,0.074c-0.297-0.149-1.255-0.462-2.39-1.475c-0.883-0.788-1.48-1.761-1.653-2.059    s-0.018-0.458,0.13-0.606c0.134-0.133,0.297-0.347,0.446-0.521C9.87,9.97,9.919,9.846,10.019,9.647    c0.099-0.198,0.05-0.372-0.025-0.521C9.919,8.978,9.325,7.515,9.078,6.92c-0.241-0.58-0.486-0.501-0.669-0.51    C8.236,6.401,8.038,6.4,7.839,6.4c-0.198,0-0.52,0.074-0.792,0.372c-0.272,0.298-1.04,1.017-1.04,2.479    c0,1.463,1.065,2.876,1.213,3.074c0.148,0.198,2.095,3.2,5.076,4.487c0.709,0.306,1.263,0.489,1.694,0.626    c0.712,0.226,1.36,0.194,1.872,0.118c0.571-0.085,1.758-0.719,2.006-1.413c0.248-0.694,0.248-1.29,0.173-1.413    C17.967,14.605,17.769,14.531,17.472,14.382z"/>
          </svg>
        </div>
      </a>
      <a href="https://github.com/matrawy-maxbot" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
        <div data-icon="github" id="github-icon" style={{ '--animation-delay': '4.2s', '--animation2-delay': '4.2s' } as React.CSSProperties} className="github-icon community-icon w-[12px] h-[12px] bg-[#766d7f] rounded-full absolute top-0 left-0 shadow-md opacity-0">
          <svg className="w-[.4rem] absolute top-1/2 left-1/2 fill-[#eafff2] -translate-x-[56%] -translate-y-[56%]" viewBox="0 0 24 24">
            <g>
              <path d="M12,0.296c-6.627,0-12,5.372-12,12c0,5.302,3.438,9.8,8.206,11.387   c0.6,0.111,0.82-0.26,0.82-0.577c0-0.286-0.011-1.231-0.016-2.234c-3.338,0.726-4.043-1.416-4.043-1.416   C4.421,18.069,3.635,17.7,3.635,17.7c-1.089-0.745,0.082-0.729,0.082-0.729c1.205,0.085,1.839,1.237,1.839,1.237   c1.07,1.834,2.807,1.304,3.492,0.997C9.156,18.429,9.467,17.9,9.81,17.6c-2.665-0.303-5.467-1.332-5.467-5.93   c0-1.31,0.469-2.381,1.237-3.221C5.455,8.146,5.044,6.926,5.696,5.273c0,0,1.008-0.322,3.301,1.23   C9.954,6.237,10.98,6.104,12,6.099c1.02,0.005,2.047,0.138,3.006,0.404c2.29-1.553,3.297-1.23,3.297-1.23   c0.653,1.653,0.242,2.873,0.118,3.176c0.769,0.84,1.235,1.911,1.235,3.221c0,4.609-2.807,5.624-5.479,5.921   c0.43,0.372,0.814,1.103,0.814,2.222c0,1.606-0.014,2.898-0.014,3.293c0,0.319,0.216,0.694,0.824,0.576   c4.766-1.589,8.2-6.085,8.2-11.385C24,5.669,18.627,0.296,12,0.296z"/>
              <path d="M4.545,17.526c-0.026,0.06-0.12,0.078-0.206,0.037c-0.087-0.039-0.136-0.121-0.108-0.18   c0.026-0.061,0.12-0.078,0.207-0.037C4.525,17.384,4.575,17.466,4.545,17.526L4.545,17.526z"/>
              <path d="M5.031,18.068c-0.057,0.053-0.169,0.028-0.245-0.055c-0.079-0.084-0.093-0.196-0.035-0.249   c0.059-0.053,0.167-0.028,0.246,0.056C5.076,17.903,5.091,18.014,5.031,18.068L5.031,18.068z"/>
              <path d="M5.504,18.759c-0.074,0.051-0.194,0.003-0.268-0.103c-0.074-0.107-0.074-0.235,0.002-0.286   c0.074-0.051,0.193-0.005,0.268,0.101C5.579,18.579,5.579,18.707,5.504,18.759L5.504,18.759z"/>
              <path d="M6.152,19.427c-0.066,0.073-0.206,0.053-0.308-0.046c-0.105-0.097-0.134-0.234-0.068-0.307   c0.067-0.073,0.208-0.052,0.311,0.046C6.191,19.217,6.222,19.355,6.152,19.427L6.152,19.427z"/>
              <path d="M7.047,19.814c-0.029,0.094-0.164,0.137-0.3,0.097C6.611,19.87,6.522,19.76,6.55,19.665   c0.028-0.095,0.164-0.139,0.301-0.096C6.986,19.609,7.075,19.719,7.047,19.814L7.047,19.814z"/>
              <path d="M8.029,19.886c0.003,0.099-0.112,0.181-0.255,0.183c-0.143,0.003-0.26-0.077-0.261-0.174c0-0.1,0.113-0.181,0.256-0.184   C7.912,19.708,8.029,19.788,8.029,19.886L8.029,19.886z"/>
              <path d="M8.943,19.731c0.017,0.096-0.082,0.196-0.224,0.222c-0.139,0.026-0.268-0.034-0.286-0.13   c-0.017-0.099,0.084-0.198,0.223-0.224C8.797,19.574,8.925,19.632,8.943,19.731L8.943,19.731z"/>
            </g>
          </svg>
        </div>
      </a>
      <a href="https://linkedin.com/in/mohammed-saeed-710b03250" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
        <div data-icon="linkedin" id="linkedin-icon" style={{ '--animation-delay': '4.4s', '--animation2-delay': '4.4s' } as React.CSSProperties} className="linkedin-icon community-icon w-[12px] h-[12px] bg-blue-500 rounded-full absolute top-0 left-0 shadow-md opacity-0">
          <svg className="w-[.35rem] absolute top-1/2 left-1/2 fill-[#eafff2] -translate-x-[50%] -translate-y-[55%]" viewBox="0 0 24 24">
            <g>
              <path id="Path_2525" d="M23.002,21.584h0.227l-0.435-0.658l0,0c0.266,0,0.407-0.169,0.409-0.376c0-0.008,0-0.017-0.001-0.025   c0-0.282-0.17-0.417-0.519-0.417h-0.564v1.476h0.212v-0.643h0.261L23.002,21.584z M22.577,20.774h-0.246v-0.499h0.312   c0.161,0,0.345,0.026,0.345,0.237c0,0.242-0.186,0.262-0.412,0.262"/>
              <path id="Path_2520" d="M17.291,19.073h-3.007v-4.709c0-1.123-0.02-2.568-1.564-2.568c-1.566,0-1.806,1.223-1.806,2.487v4.79H7.908   V9.389h2.887v1.323h0.04c0.589-1.006,1.683-1.607,2.848-1.564c3.048,0,3.609,2.005,3.609,4.612L17.291,19.073z M4.515,8.065   c-0.964,0-1.745-0.781-1.745-1.745c0-0.964,0.781-1.745,1.745-1.745c0.964,0,1.745,0.781,1.745,1.745   C6.26,7.284,5.479,8.065,4.515,8.065L4.515,8.065 M6.018,19.073h-3.01V9.389h3.01V19.073z M18.79,1.783H1.497   C0.68,1.774,0.01,2.429,0,3.246V20.61c0.01,0.818,0.68,1.473,1.497,1.464H18.79c0.819,0.01,1.492-0.645,1.503-1.464V3.245   c-0.012-0.819-0.685-1.474-1.503-1.463"/>
              <path id="Path_2526" d="M22.603,19.451c-0.764,0.007-1.378,0.633-1.37,1.397c0.007,0.764,0.633,1.378,1.397,1.37   c0.764-0.007,1.378-0.633,1.37-1.397c-0.007-0.754-0.617-1.363-1.37-1.37H22.603 M22.635,22.059   c-0.67,0.011-1.254-0.522-1.265-1.192c-0.011-0.67,0.523-1.222,1.193-1.233c0.67-0.011,1.222,0.523,1.233,1.193   c0,0.007,0,0.013,0,0.02C23.81,21.502,23.29,22.045,22.635,22.059h-0.031"/>
            </g>
          </svg>
        </div>
      </a>
      <div data-icon="icons-cover" className="icons-cover community-icon w-[12px] h-[12px] bg-black rounded-full absolute top-0 left-0 shadow-lg opacity-0 animate-[changeColor_3s_ease-in-out_1s_forwards]"></div>
      
      <ProjectsMarquee />
    </div>
  );
};

export default Index;
