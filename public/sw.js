self.addEventListener('install', e => {
  console.log('installed!');
});

self.addEventListener('activate', e => {
  console.log('activated!');
});

self.addEventListener('message', e => {
  console.log(e.data);
  this.data = e.data.data;
  const fn = new Function(e.data.func);
  fn();
  e.ports[0].postMessage('from SW after fn');
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('punkapi')) {
    e.respondWith(
      fetch(e.request)
        .then(res => res.json())
        .then(data => [{ data: 'from SW' }, ...data])
        .then(
          data =>
            new Response(JSON.stringify(data), {
              status: 200,
              statusText: 'OK',
              headers: { 'Content-Type': 'text/plain' },
            }),
        ),
    );
  }
});
