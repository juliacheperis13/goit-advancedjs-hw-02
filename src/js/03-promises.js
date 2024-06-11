import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const delay = Number(formData.get('delay'));
  const step = Number(formData.get('step'));
  const amount = Number(formData.get('amount'));

  console.log(formData)
  form.reset();

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay + step * (i - 1));
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  console.log(shouldResolve)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
    .then(({ position, delay }) => {
      iziToast.success({
        title: `Promise ${position}`,
        message: `✅ Fulfilled promise ${position} in ${delay}ms`,
        color: 'green',
        position: 'center',
      });
    })
    .catch(({ position, delay }) => {
      iziToast.error({
        title: `Promise ${position}`,
        message: `❌ Rejected promise ${position} in ${delay}ms`,
        color: 'red',
        position: 'center',
      });
    });
}
