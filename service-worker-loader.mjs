window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
  }
});

let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  alert("app is installable");
  e.preventDefault();
  deferredPrompt = e;
  alert("app is installable");
});

window.addEventListener("load", () => {
  alert("window loaded event");
  const installButton = document.querySelector("#install-button");
  installButton.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      alert("user choice: " + outcome);
    } else {
      alert ('no `beforeinstallprompt`')
    }
    deferredPrompt = null;
  });
});

window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  alert("PWA is installed");
});