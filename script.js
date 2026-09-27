const MOTS = [
  "Je t'aime un peu, beaucoup, passionnément… à la folie.",
  "Merci d'être toi, tout simplement.",
  "Mon moment préféré, c'est quand je te retrouve.",
  "Je suis tellement fier de toi.",
  "Je t'aime plus qu'hier et bien moins que demain."
  "L'amour tient dans trois lettres : toi."
  "Tes baisers sont ma plus belle récompense après une longue journée."
  "Je t'aime jusqu'à la lune, aller et retour"
  "Plus je te connais et plus je t'aime."
  "Avec toi, je veux tout vivre."
  "Ton nom est mon mot préféré."
  "Tu es mon soleil, ma lune et toutes mes étoiles."
];

const NON = ["Non", "T'es sûr ?", "Vraiment ?", "Réfléchis bien", "Menteur 😏", "Essaie encore", "Impossible", "Allez…", "Petite patate que tu es va"];

const $ = id => document.getElementById(id);
const show = (a, b) => { $(a).classList.add('hidden'); $(b).classList.remove('hidden'); };

/* --- Bouton Non qui fuit --- */
let fuite = 0;
function fuir(e) {
  if (e) e.preventDefault();
  const n = $('non');
  n.classList.add('free');
  fuite++;
  n.textContent = NON[fuite % NON.length];
  const w = n.offsetWidth, h = n.offsetHeight;
  n.style.left = Math.random() * (innerWidth - w - 20) + 10 + 'px';
  n.style.top  = Math.random() * (innerHeight - h - 20) + 10 + 'px';
  $('oui').style.transform = `scale(${Math.min(1 + fuite * 0.12, 2)})`;
}
$('non').addEventListener('mouseover', fuir);
$('non').addEventListener('pointerdown', fuir);
$('non').addEventListener('click', fuir);

/* --- Oui : cœur qui bat puis bocal --- */
$('oui').addEventListener('click', () => {
  $('non').style.display = 'none';
  show('s1', 's2');
  setTimeout(() => show('s2', 's3'), 2800);
});

/* --- Remplir le bocal de cœurs --- */
const TEINTES = ["#F0475E", "#FF8FA3", "#FFB3C1", "#C9243F", "#FF6F91", "#FFFFFF"];
const coeurs = MOTS.map((_, i) => {
  const c = document.createElement('span');
  c.className = 'h';
  c.textContent = '♥';
  c.style.color = TEINTES[i % TEINTES.length];
  c.style.fontSize = (2 + Math.random() * 1.4) + 'rem';
  c.style.left = (4 + Math.random() * 66) + '%';
  c.style.bottom = (2 + Math.floor(i / 3) * 15 + Math.random() * 5) + '%';
  c.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
  $('jarBody').appendChild(c);
  return c;
});

let pile = [...MOTS].sort(() => Math.random() - .5);
let lus = 0;

/* --- Petits cœurs qui s'envolent --- */
function eclats(x, y) {
  for (let i = 0; i < 7; i++) {
    const s = document.createElement('span');
    s.className = 'pop';
    s.textContent = '♥';
    s.style.left = x + Math.random() * 90 - 45 + 'px';
    s.style.top = y + Math.random() * 30 + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1300);
  }
}

/* --- Piocher un mot --- */
function piocher(e) {
  if (!pile.length) {
    pile = [...MOTS].sort(() => Math.random() - .5);
    coeurs.forEach(c => c.classList.remove('gone'));
    lus = 0;
  }
  $('msg').textContent = pile.pop();
  const c = coeurs.filter(c => !c.classList.contains('gone')).pop();
  if (c) c.classList.add('gone');
  lus++;
  $('hint').textContent = lus < MOTS.length
    ? `${lus} cœur${lus > 1 ? 's' : ''} ouvert${lus > 1 ? 's' : ''} sur ${MOTS.length}`
    : "Tu les as tous ouverts… mai le bocal peut se remplir à nouveau ♡";
  $('overlay').classList.add('open');
  eclats(e && e.clientX ? e.clientX : innerWidth / 2, e && e.clientY ? e.clientY : innerHeight / 2);
  $('next').focus();
}

$('jar').addEventListener('click', piocher);
$('next').addEventListener('click', e => {
  $('overlay').classList.remove('open');
  setTimeout(() => piocher(e), 250);
});
$('close').addEventListener('click', () => {
  $('overlay').classList.remove('open');
  $('jar').focus();
});
$('overlay').addEventListener('click', e => {
  if (e.target === $('overlay')) $('overlay').classList.remove('open');
});
