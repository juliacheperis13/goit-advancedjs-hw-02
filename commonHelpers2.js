import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as S,i as g}from"./assets/vendor-77e16229.js";const k=1e3,I=2e3,u=document.querySelector("body"),d=document.querySelector(".fireworks"),o=document.querySelector("button[data-start]"),m=document.querySelector("#datetime-picker"),b=document.querySelector("span[data-days]"),D=document.querySelector("span[data-hours]"),q=document.querySelector("span[data-minutes]"),v=document.querySelector("span[data-seconds]"),x={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose:M};let l=null;const C=S(m,x);n(o,!0);o.addEventListener("click",L);function n(t,e){e?t.disabled=!0:t.disabled=!1}function M(t){console.log(t[0]),n(o,!1),t[0]<new Date&&(g.error({title:"Error",message:"Please choose a date in the future",position:"center",timeout:I,closeOnClick:!0,color:"red"}),t[0]=new Date,n(o,!0)),this.config.clickOpens=!1}function L(){n(o,!0),n(m,!0),E(),l=setInterval(()=>{if(s()<=0){clearInterval(l),O(!0);return}f(s())},k)}function w(t){const y=Math.floor(t/864e5),h=Math.floor(t%864e5/36e5),p=Math.floor(t%864e5%36e5/6e4),T=Math.floor(t%864e5%36e5%6e4/1e3);return{days:y,hours:h,minutes:p,seconds:T}}function s(){const t=new Date;return C.selectedDates[0]-t}function E(){s()<=0||f(s())}function f(t){const{days:e,hours:a,minutes:c,seconds:i}=w(t);b.textContent=r(e),D.textContent=r(a),q.textContent=r(c),v.textContent=r(i)}function r(t){return String(t).padStart(2,"0")}function O(t){t?(u.classList.add("dark"),d.classList.add("visible")):(u.classList.remove("dark"),d.classList.remove("visible"))}
//# sourceMappingURL=commonHelpers2.js.map