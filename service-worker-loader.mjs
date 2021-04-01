window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(() => {
        console.log("service worker registered successfully");
      })
      .catch(console.error);
  }
});

let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

window.addEventListener("load", () => {
  const installButton = document.querySelector("#install-button");
  installButton.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      alert("user choice: " + outcome);
    } else {
      alert("no `beforeinstallprompt`");
    }
    deferredPrompt = null;
  });
});

window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  alert("PWA is installed");
});
