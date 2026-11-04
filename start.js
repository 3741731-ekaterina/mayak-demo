try {
  await navigator.serviceWorker.register('./sw.js');
  await navigator.serviceWorker.ready;
  if (!navigator.serviceWorker.controller) {
    await new Promise(resolve => navigator.serviceWorker.addEventListener('controllerchange', resolve, {once:true}));
  }
  await import('./app.js');
} catch (error) {
  document.querySelector('#app').textContent = 'Не удалось открыть учебный табель. Разрешите хранение данных сайта и обновите страницу.';
  console.error(error);
}
