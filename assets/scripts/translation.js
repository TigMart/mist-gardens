// JSON data embedded directly
const languageData = {
  "en": {
    "title": "Mist Gardens",
    "logo": ["Mist Gardens", "Museum & Botanical Garden"],
    "navList": ["Home", "Visit", "Exhibitions", "Programs & Events", "Store"],
    "navBtn": "Membership",
    "intro-heading": "A beautiful adventure awaits",
    "intro-desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt facilisis nunc",
    "intro-buttons": ["Buy Tickets", "Learn More"],
    "second-section-heading": "Discover yourself with nature",
    "second-section-desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt facilisis nuncLorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt facilisis nunc",
    "second-section-btn": "Learn More",
    "footer-desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt facilisis nuncLorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "footer-nav-titles": ["Sitemap", "Connect"],
    "copyright": "© 2024 Mist Gardens. All rights reserved."
  },
  "am":{
  "title": "Mist Gardens",
  "logo": ["Mist Gardens", "Museum & Botanical Garden"],
  "navList": ["Գլխավոր էջ", "Այցելեք", "Տեսականիներ", "Ծրագրեր և միջոցառումներ", "Խանութ"],
  "navBtn": "Անդամություն",
  "intro-heading": "Գեղեցիկ արկած է սպասվում",
  "intro-desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt facilisis nunc",
  "intro-buttons": ["Գնել տոմս", "Իմացի՛ր ավելին"],
  "second-section-heading": "Բացահայտեք ձեզ բնության հետ",
  "second-section-desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt facilisis nuncLorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt facilisis nunc",
  "second-section-btn": "Իմացի՛ր ավելին",
  "footer-desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt facilisis nuncLorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "footer-nav-titles": ["Կայքքի քարտեզ", "Կապը"],
  "copyright": "© 2024 Mist Gardens. All rights reserved."
}
};

// Function to fetch language data

// async function fetchLanguageData(lang) {
//   let json = JSON.parse(sessionStorage.getItem(`languages/${lang}`));

//   if (!json) {
//     try {
//       const response = await fetch(`languages/${lang}.json`);
//       if (!response.ok) {
//         throw new Error(`Failed to fetch language data for ${lang}`);
//       }

//       json = await response.json();
//       sessionStorage.setItem(`languages/${lang}`, JSON.stringify(json));
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }

//   return json;
// }


// when JSON data embedded directly
function fetchLanguageData(lang) {
  return languageData[lang]
}

// Function to set the language preference
function setLanguagePreference(lang) {
  localStorage.setItem("language", lang);
}

// Function to update content based on selected language
function updateContent(langData) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const keys = element.getAttribute("data-i18n").split("."); // Split keys by dot
    let value = langData;
    keys.forEach((key) => {
      value = value[key]; // Traverse through nested keys
    });
    element.textContent = value;
  });
  document.querySelectorAll("input[data-i18n]").forEach((input, index) => {
    const keys = input.getAttribute("data-i18n").split("."); // Split keys by dot
    let value = langData;
    keys.forEach((key) => {
      value = value[key]; // Traverse through nested keys
    });
    input.setAttribute("placeholder", value);
  });

  const html = document.documentElement;
  if (localStorage.getItem("language") === "am") {
    html.style.fontFamily =
      "'garden-font-am', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,'Open Sans', 'Helvetica Neue', sans-serif";
  } else {
    html.style.fontFamily =
      "'garden-font-en', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,'Open Sans', 'Helvetica Neue', sans-serif";
  }
  const lngBtn = document.querySelectorAll(".lng-btn");

  if (localStorage.getItem("language") === "en") {
    lngBtn[0].setAttribute("disabled", "true");
    lngBtn[1].removeAttribute("disabled");
  } else {
    lngBtn[1].setAttribute("disabled", "true");
    lngBtn[0].removeAttribute("disabled");
  }
}

// Function to change language
function changeLanguage(lang) {
  setLanguagePreference(lang);
  const langData = fetchLanguageData(lang);
  updateContent(langData);
}

// // Call updateContent() on page load
window.addEventListener("DOMContentLoaded",  () => {
  if (!localStorage.getItem("language")) localStorage.setItem("language", "en");
  const userPreferredLanguage = localStorage.getItem("language") || "en";
  const langData = fetchLanguageData(userPreferredLanguage);
  updateContent(langData);
});
