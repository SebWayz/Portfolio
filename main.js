import "devicon/devicon.min.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const skills = [
  { slug: "html5", label: "HTML5", variant: "plain" },
  { slug: "css3", label: "CSS3", variant: "plain" },
  { slug: "javascript", label: "JavaScript", variant: "plain" },
  { slug: "typescript", label: "TypeScript", variant: "plain" },
  { slug: "vuejs", label: "Vue.js", variant: "plain" },
  { slug: "react", label: "React", variant: "plain" },
  { slug: "nodejs", label: "Node.js", variant: "plain" },
  { slug: "php", label: "PHP", variant: "plain" },
  { slug: "laravel", label: "Laravel", variant: "plain" },
  { slug: "quasar", label: "Quasar", variant: "plain" },
  { slug: "threejs", label: "Three.js", variant: "original" },
  { slug: "postgresql", label: "PostgreSQL", variant: "plain" },
  { slug: "dbeaver", label: "DBeaver", variant: "plain" },
  { slug: "postman", label: "Postman", variant: "plain" },
  { slug: "git", label: "Git", variant: "plain" },
  { slug: "docker", label: "Docker", variant: "plain" },
];

const skillsContainer = document.getElementById("skills");

skillsContainer.innerHTML = skills
  .map(
    ({ slug, label, variant }) => `
  <div class="skill-card">
    <i class="devicon-${slug}-${variant}"></i>
    <span>${label}</span>
  </div>
`,
  )
  .join("");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

window.addEventListener("resize", () => {
  onWindowResize();
});

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x3388d4 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//Lighting

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//Helpers

/* const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper) */

//const controls = new OrbitControls(camera, renderer.domElement);

//Stars in the background
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(120));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const backTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = backTexture;

//Profile cube

const sebTexture = new THREE.TextureLoader().load("logoSebway.jpg");

const seb = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: sebTexture }),
);

scene.add(seb);

//Moon sphere

const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  }),
);

scene.add(moon);

const moon2 = new THREE.Mesh(
  new THREE.CylinderGeometry(2, 2, 7, 10),
  new THREE.MeshStandardMaterial({
    map: sebTexture,
  }),
);

scene.add(moon2);

//Moon's base position
moon.position.z = 30;
moon.position.setX(-10);

//Moon2's base position
moon2.position.z = 40;
moon2.position.x = 10;

//Cube's base position
seb.position.z = -5;
seb.position.x = 2;

//Onscroll actions

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.02;

  moon2.rotation.z += 0.02;

  seb.rotation.x += 0.01;
  seb.rotation.y += 0.01;

  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  camera.position.z = t * -0.011;
}

let hasScrolled = false;

document.body.onscroll = function () {
  moveCamera();

  if (!hasScrolled) {
    hasScrolled = true;
    setTimeout(() => {
      document.getElementById("scroll").classList.add("hide");
    }, 1400);
  }
};

//Constant animation
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.y += 0.005;

  moon2.rotation.y -= 0.005;

  //controls.update;

  renderer.render(scene, camera);
}

animate();

const translations = {
  fr: {
    "nav.projets": "Projets",
    "nav.formations": "Formations",
    "nav.experiences": "Expériences",
    "nav.competences": "Compétences",
    "nav.contact": "Contact",
    "lang.toggle": "EN",
    "header.subtitle": "🚀 De l'imagination à la réalité",
    "header.contact": "Contact",
    "header.status": "Ouvert aux opportunités",
    "blockquote.intro":
      "Développeur fullstack de 24 ans <br /> Mes mots d'ordre sont l'honnêteté, la créativité et l'innovation.",
    "section.projets": "👨🏻‍🚀 Projets",
    "project.sixdip.desc":
      "Projet personnel réalisé dans le cadre du fonctionnement de l'équipe esport amateure \"SixDipHamster\". Cette nouvelle version du site web permet de montrer les dernières réalisations concernant les hamsters (vidéos, tweets...), les membres mais aussi de montrer un historique de l'équipe sous forme de tableau. Ce projet a été l'occasion pour moi de manipuler le langage CSS plus en profondeur, afin de créer des effets offrant une expérience utilisateur plus agréable.",
    "project.sixdip.link": 'Aller vers le site "SixDipHamster"',
    "project.eshdev.desc":
      "Refonte du site vitrine de la société ESHDEV lors d'un stage de 10 semaines. Cela a été ma première mission dans un cadre professionnel. Ce projet m'a également permis de découvrir et apprendre plusieurs technologies telles que le framework Laravel (PHP), plusieurs librairies construites pour ce framework et Bootstrap.",
    "project.eshdev.link": 'Aller vers le site "ESHDEV"',
    "section.formations": "🎓 Formations",
    "formation.dut.title": "DUT Informatique (2019-2021)",
    "formation.dut.desc":
      "Formation généraliste en informatique d'une durée de 2 ans. Durant celle-ci j'ai eu l'occasion de travailler d'effectuer de nombreux projets en équipes sur des technologies diverses. Cette formation a également été l'occasion pour moi d'apprendre l'algorithmie, certains concepts mathématiques, le droit, la gestion mais aussi de rencontrer d'autres personnes partageant une même passion. A la fin de la 2ème année j'ai effectué un stage de 10 semaines au sein de l'entreprise de développement web <a href=\"https://esh-dev.fr/\"><strong>ESHDEV</strong></a> afin d'acquérir une première expérience professionnelle.",
    "formation.lp.title": "Licence Professionnelle DQL (2021-2022)",
    "formation.lp.desc":
      "Licence spécialisée dans le développement, la qualité logiciel et les méthodes agiles. Celle-ci m'a permis de parfaire mes connaissances concernant les méthodes de développement et de les mettre en oeuvre lors d'un stage de fin d'année de 4 mois au sein de la société <a href=\"https://www.iologo.io/\"><strong>iologo</strong></a> développant une application web à destination des orthophonistes.",
    "formation.ing.title": "Diplôme d'ingénieur AISL - CNAM (2022-2025)",
    "formation.ing.desc":
      "Formation d'ingénieur spécialisé en intégration des systèmes et des logiciels en alternance. Grâce à un rythme de 3 semaines en entreprise et 1 semaine à l'école par mois. Celle-ci m'a permis d'accumuler de l'expérience professionnelle de nombreux domaines dont le développement web.",
    "section.experiences": "💼 Expériences professionnelles",
    "experience.desc":
      "Ma première année d'alternance a eu lieu au sein de la société <a href=\"https://www.iologo.io/\"><strong>iologo</strong></a> en tant que développeur frontend. Première expérience passionnante dans le domaine de l'orthophonie en lien direct avec les utilisateurs, qu'ils soient orthophonistes ou patients. <br /><br /> Ensuite j'ai intégré le service web de la <a href=\"https://laregion.fr/\"><strong>Région Occitanie</strong></a> en tant que développeur web. Ce poste m'a permis de découvrir le fonctionnement d'une grande entreprise et de travailler sur des projets d'envergure, utilisés par de nombreux utilisateurs. <br /><br /> Enfin, dans le cadre de ma 3ème année d'alternance, j'ai intégré l'équipe de développement de la startup aéronautique <a href=\"https://hinfact.com/\"><strong>Hinfact</strong></a>. Cette expérience m'a permis de travailler sur des projets innovants et de découvrir un secteur très dynamique. Cela a été l'occasion pour moi de parfaire mes compétences backend ainsi que de collaborer avec de nombreuses personnes dont des UX/UI designers afin de créer une meilleure expérience utilisateur et des Product Owners.",
    "section.competences": "🛠️ Compétences",
    "blockquote.thanks": "Merci de votre attention !",
    "section.contact": "Contact",
    "contact.cv": "Mon CV",
  },
  en: {
    "nav.projets": "Projects",
    "nav.formations": "Education",
    "nav.experiences": "Experience",
    "nav.competences": "Skills",
    "nav.contact": "Contact",
    "lang.toggle": "FR",
    "header.subtitle": "🚀 From imagination to reality",
    "header.contact": "Contact",
    "header.status": "Open to opportunities",
    "blockquote.intro":
      "Fullstack developer, 24 years old <br /> My guiding principles are honesty, creativity and innovation.",
    "section.projets": "👨🏻‍🚀 Projects",
    "project.sixdip.desc":
      'Personal project built around the operation of the amateur esports team "SixDipHamster". This new version of the website showcases the latest hamster-related content (videos, tweets...), team members, and a history of the team as a table. This project was an opportunity for me to dig deeper into CSS to create effects that deliver a more pleasant user experience.',
    "project.sixdip.link": 'Go to the "SixDipHamster" website',
    "project.eshdev.desc":
      "Redesign of the ESHDEV company's showcase website during a 10-week internship. This was my first mission in a professional setting. The project also let me discover and learn several technologies such as the Laravel framework (PHP), various libraries built for it, and Bootstrap.",
    "project.eshdev.link": 'Go to the "ESHDEV" website',
    "section.formations": "🎓 Education",
    "formation.dut.title": "DUT in Computer Science (2019-2021)",
    "formation.dut.desc":
      'A 2-year general computer science program. During this time I had the opportunity to work on numerous team projects across various technologies. This program also gave me the chance to learn algorithmics, certain mathematical concepts, law, management, and to meet other people sharing the same passion. At the end of the second year I completed a 10-week internship at the web development company <a href="https://esh-dev.fr/"><strong>ESHDEV</strong></a> to gain my first professional experience.',
    "formation.lp.title": "Professional Bachelor's DQL (2021-2022)",
    "formation.lp.desc":
      'Bachelor\'s specialized in software development, quality and agile methods. It allowed me to refine my knowledge of development methods and apply them during a 4-month end-of-year internship at <a href="https://www.iologo.io/"><strong>iologo</strong></a>, developing a web application for speech therapists.',
    "formation.ing.title": "Engineering Degree AISL - CNAM (2022-2025)",
    "formation.ing.desc":
      "Engineering program specialized in systems and software integration, completed via a work-study program. With a rhythm of 3 weeks at the company and 1 week at school per month, it allowed me to accumulate professional experience across many fields including web development.",
    "section.experiences": "💼 Professional experience",
    "experience.desc":
      'My first work-study year took place at <a href="https://www.iologo.io/"><strong>iologo</strong></a> as a frontend developer. An exciting first experience in the speech therapy field, working directly with users — both speech therapists and patients. <br /><br /> Then I joined the web team at <a href="https://laregion.fr/"><strong>Région Occitanie</strong></a> as a web developer. This position let me discover how a large organization operates and work on large-scale projects used by many users. <br /><br /> Finally, for my third work-study year, I joined the development team at the aerospace startup <a href="https://hinfact.com/"><strong>Hinfact</strong></a>. This experience gave me the opportunity to work on innovative projects and discover a very dynamic sector. It was a chance to refine my backend skills and to collaborate with many people including UX/UI designers — to craft a better user experience — and Product Owners.',
    "section.competences": "🛠️ Skills",
    "blockquote.thanks": "Thank you for your attention!",
    "section.contact": "Contact",
    "contact.cv": "My CV",
  },
};

function applyTranslations(lang) {
  const dict = translations[lang];
  if (!dict) return;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = dict[el.dataset.i18n];
    if (value !== undefined) el.textContent = value;
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const value = dict[el.dataset.i18nHtml];
    if (value !== undefined) el.innerHTML = value;
  });
}

let currentLang = localStorage.getItem("lang") === "en" ? "en" : "fr";
if (currentLang !== "fr") applyTranslations(currentLang);

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  applyTranslations(lang);
  document.querySelectorAll(".animated-text").forEach((el) => {
    el.classList.remove("animated-text");
  });
  if (window.feather) window.feather.replace();
}

document.querySelectorAll(".lang-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    setLanguage(currentLang === "fr" ? "en" : "fr");
  });
});

function splitTextForAnimation(element, startMs) {
  if (!element) return 0;
  const chars = Array.from(element.textContent.trim());
  element.textContent = "";
  chars.forEach((char, i) => {
    const span = document.createElement("span");
    span.className = "letter";
    span.textContent = char;
    span.style.setProperty("--i", i);
    span.style.setProperty("--start", `${startMs}ms`);
    element.appendChild(span);
  });
  return chars.length;
}

const headerH1 = document.querySelector("header h1.animated-text");
const headerP = document.querySelector("header p.animated-text");
const headerActions = document.querySelector(".header-actions");

const LETTER_DELAY_MS = 0.5;
const H1_START_MS = 300;

const h1Count = splitTextForAnimation(headerH1, H1_START_MS);
const pStart = H1_START_MS + h1Count * LETTER_DELAY_MS;
const pCount = splitTextForAnimation(headerP, pStart);

if (headerActions) {
  const actionsDelay = pStart + pCount * LETTER_DELAY_MS + 200;
  headerActions.style.setProperty("--actions-delay", `${actionsDelay}ms`);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView();
    }
  });
});
