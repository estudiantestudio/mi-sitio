/* ==========================
   INCENSOS - Recomendador PRO
   (NO cambia tu estilo, solo lógica)
========================== */

/* ✅ 29 aromas + clasificación completa (la que me pasaste) */
const INCENSES = [
  // RELAJACIÓN
  { id:"english-lavender", name:"English Lavender", uso:["Relajación","Dormir","Amor/armonía","Meditación"], familia:["Floral"], lugares:["Dormitorio","Baño","Sala","Hogar"], vibe:["calma","antiestres"], intensidad:"suave", price:7490, img:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80" },
  { id:"chamomile", name:"Chamomile", uso:["Relajación","Dormir"], familia:["Herbal"], lugares:["Dormitorio","Sala","Hogar"], vibe:["calma"], intensidad:"suave", price:7490, img:"https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&w=1400&q=80" },
  { id:"jasmine", name:"Jasmine", uso:["Relajación","Dormir","Amor/armonía","Hogar/ambiente"], familia:["Floral","Dulce"], lugares:["Dormitorio","Sala","Hogar"], vibe:["suave","romantico"], intensidad:"media", price:7990, img:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=80" },
  { id:"vanilla", name:"Vanilla", uso:["Relajación","Dormir","Hogar/ambiente"], familia:["Dulce"], lugares:["Dormitorio","Sala","Hogar","Oficina"], vibe:["acogedor"], intensidad:"media", price:7990, img:"https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1400&q=80" },
  { id:"vanilla-rose", name:"Vanilla Rose", uso:["Relajación","Amor/armonía","Hogar/ambiente"], familia:["Floral","Dulce"], lugares:["Dormitorio","Sala","Hogar"], vibe:["regalo","romantico"], intensidad:"media", price:8490, img:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80" },
  { id:"sandalwood", name:"Sandalwood", uso:["Relajación","Dormir","Meditación","Limpieza energética","Hogar/ambiente","Amor/armonía"], familia:["Amaderado"], lugares:["Dormitorio","Sala","Hogar","Oficina"], vibe:["equilibrio"], intensidad:"media", price:8490, img:"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1400&q=80" },
  { id:"casa-pura", name:"Casa Pura", uso:["Relajación","Limpieza energética","Hogar/ambiente"], familia:["Fresco"], lugares:["Sala","Hogar","Oficina"], vibe:["limpio"], intensidad:"suave", price:7490, img:"https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1400&q=80" },
  { id:"rose", name:"Rose", uso:["Relajación","Amor/armonía"], familia:["Floral"], lugares:["Dormitorio","Sala","Hogar"], vibe:["romantico"], intensidad:"media", price:7990, img:"https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1400&q=80" },
  { id:"myrrh", name:"Myrrh", uso:["Relajación","Meditación","Limpieza energética"], familia:["Amaderado","Especiado"], lugares:["Sala","Hogar","Meditación"], vibe:["profundo"], intensidad:"intenso", price:8990, img:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80" },

  // MEDITACIÓN
  { id:"nag-champa", name:"Nag Champa", uso:["Meditación"], familia:["Amaderado"], lugares:["Meditación","Sala","Hogar"], vibe:["yoga"], intensidad:"media", price:8990, img:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80" },
  { id:"oud-crystal", name:"Oud Crystal", uso:["Meditación","Amor/armonía","Dulce/cálido"], familia:["Amaderado"], lugares:["Sala","Hogar"], vibe:["lux"], intensidad:"intenso", price:9990, img:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80" },
  { id:"root", name:"Root", uso:["Meditación","Limpieza energética"], familia:["Amaderado"], lugares:["Meditación","Hogar"], vibe:["tierra"], intensidad:"intenso", price:8990, img:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80" },
  { id:"7-chakras", name:"7 Chakras", uso:["Meditación","Limpieza energética"], familia:["Amaderado"], lugares:["Meditación","Hogar"], vibe:["chakra"], intensidad:"media", price:9490, img:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80" },
  { id:"sahasrara-spirit", name:"Sahasrara – Spirit", uso:["Meditación"], familia:["Amaderado"], lugares:["Meditación"], vibe:["espiritual"], intensidad:"media", price:9490, img:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80" },
  { id:"ajna-insight", name:"Ajna – Insight", uso:["Meditación"], familia:["Amaderado"], lugares:["Meditación","Oficina"], vibe:["claridad"], intensidad:"media", price:9490, img:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80" },
  { id:"vishuddha-truth", name:"Vishuddha – Truth", uso:["Meditación"], familia:["Amaderado"], lugares:["Meditación"], vibe:["centro"], intensidad:"media", price:9490, img:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80" },

  // LIMPIEZA ENERGÉTICA
  { id:"white-sage", name:"White Sage", uso:["Limpieza energética"], familia:["Herbal","Fresco"], lugares:["Hogar","Sala"], vibe:["limpieza"], intensidad:"intenso", price:8990, img:"https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1400&q=80" },
  { id:"palo-santo", name:"Palo Santo", uso:["Limpieza energética","Meditación","Hogar/ambiente"], familia:["Amaderado"], lugares:["Hogar","Sala"], vibe:["purificar"], intensidad:"media", price:8990, img:"https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1400&q=80" },
  { id:"arruda", name:"Arruda", uso:["Limpieza energética"], familia:["Herbal"], lugares:["Hogar","Sala"], vibe:["proteccion"], intensidad:"intenso", price:8990, img:"https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1400&q=80" },
  { id:"citronella", name:"Citronella", uso:["Limpieza energética","Energía/motivación"], familia:["Cítrico","Fresco"], lugares:["Hogar","Terraza","Sala"], vibe:["fresco"], intensidad:"media", price:7490, img:"https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&w=1400&q=80" },

  // ENERGÍA / MOTIVACIÓN
  { id:"cinnamon", name:"Cinnamon", uso:["Energía/motivación","Hogar/ambiente"], familia:["Especiado","Dulce"], lugares:["Oficina","Sala","Hogar"], vibe:["activar"], intensidad:"intenso", price:7990, img:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80" },
  { id:"eucalyptus", name:"Eucalyptus", uso:["Energía/motivación"], familia:["Herbal","Cítrico","Fresco"], lugares:["Baño","Sala","Oficina"], vibe:["aire-limpio"], intensidad:"media", price:7490, img:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80" },
  { id:"rosemary", name:"Rosemary", uso:["Energía/motivación"], familia:["Herbal","Fresco"], lugares:["Oficina","Sala"], vibe:["enfoque"], intensidad:"media", price:7490, img:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80" },
  { id:"lemongrass", name:"Lemongrass", uso:["Energía/motivación"], familia:["Herbal","Cítrico"], lugares:["Oficina","Hogar","Sala"], vibe:["despejar"], intensidad:"media", price:7490, img:"https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&w=1400&q=80" },
  { id:"manipura-power", name:"Manipura – Power", uso:["Energía/motivación"], familia:["Especiado"], lugares:["Oficina","Hogar"], vibe:["poder"], intensidad:"intenso", price:9490, img:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80" },
  { id:"powers", name:"Powers", uso:["Energía/motivación"], familia:["Especiado"], lugares:["Oficina","Hogar"], vibe:["motivar"], intensidad:"intenso", price:9490, img:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80" },
  { id:"patchouli", name:"Patchouli", uso:["Energía/motivación","Hogar/ambiente"], familia:["Amaderado","Especiado"], lugares:["Sala","Hogar"], vibe:["personalidad"], intensidad:"intenso", price:8990, img:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80" },

  // AMOR / ARMONÍA (extra específico)
  { id:"anahata-love", name:"Anahata – Love", uso:["Amor/armonía"], familia:["Floral"], lugares:["Dormitorio","Sala"], vibe:["amor"], intensidad:"media", price:9490, img:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=80" }
];

/* ==========================
   CONFIG (textos como en tu UI)
========================== */
const USO_LABELS = [
  { key:"Relajación", label:"😌 Relajación" },
  { key:"Meditación", label:"🧘 Meditación" },
  { key:"Limpieza energética", label:"🔮 Limpieza energética" },
  { key:"Amor/armonía", label:"💗 Amor / armonía" },
  { key:"Energía/motivación", label:"🔥 Energía / motivación" },
  { key:"Dormir", label:"😴 Dormir" },
  { key:"Hogar/ambiente", label:"🏠 Hogar / ambiente" },
];

const FAMILIA_LABELS = [
  { key:"Floral", label:"🌸 Floral" },
  { key:"Herbal", label:"🌿 Herbal" },
  { key:"Amaderado", label:"🌲 Amaderado" },
  { key:"Cítrico", label:"🍋 Cítrico" },
  { key:"Especiado", label:"🌶 Especiado" },
  { key:"Dulce", label:"🍯 Dulce" },
  { key:"Fresco", label:"🌊 Fresco" },
];

const LUGARES = ["Oficina","Dormitorio","Baño","Sala","Hogar","Meditación","Terraza"];

/* ==========================
   ESTADO
========================== */
let state = {
  uso: null,
  familia: null,
  search: ""
};

/* ==========================
   HELPERS
========================== */
const $ = (id) => document.getElementById(id);

function normalize(s){
  return (s || "").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
}

function matchesFilter(item){
  const q = normalize(state.search);
  const okSearch = !q || normalize(item.name).includes(q);

  const okUso = !state.uso || (item.uso || []).includes(state.uso);
  const okFamilia = !state.familia || (item.familia || []).includes(state.familia);

  return okSearch && okUso && okFamilia;
}

function scoreForQuiz(item, quiz){
  // quiz: {uso, familia, lugar}
  let score = 0;
  if (quiz.uso && (item.uso || []).includes(quiz.uso)) score += 5;
  if (quiz.familia && (item.familia || []).includes(quiz.familia)) score += 4;
  if (quiz.lugar && (item.lugares || []).includes(quiz.lugar)) score += 3;

  // bonus: si busca "Relajación" y además es suave
  if (quiz.uso === "Relajación" && item.intensidad === "suave") score += 1;

  // bonus: oficina + enfoque vibes
  if (quiz.lugar === "Oficina" && (item.vibe || []).includes("enfoque")) score += 2;

  return score;
}

function productLink(item){
  // Si tienes PDP: producto.html?id=...
  // Si no, al menos te abre una página con query.
  return `producto.html?id=${encodeURIComponent(item.id)}`;
}

/* ==========================
   RENDER CHIPS (usa tus contenedores)
========================== */
function renderChips(){
  const usoWrap = $("usoChips");
  const famWrap = $("familiaChips");

  if (usoWrap){
    usoWrap.innerHTML = USO_LABELS.map(u => `
      <button class="chip ${state.uso===u.key ? "active" : ""}" data-uso="${u.key}">
        ${u.label}
      </button>
    `).join("");

    usoWrap.querySelectorAll("[data-uso]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const v = btn.getAttribute("data-uso");
        state.uso = (state.uso === v) ? null : v;
        renderChips();
        renderGrid();
      });
    });
  }

  if (famWrap){
    famWrap.innerHTML = FAMILIA_LABELS.map(f => `
      <button class="chip ${state.familia===f.key ? "active" : ""}" data-fam="${f.key}">
        ${f.label}
      </button>
    `).join("");

    famWrap.querySelectorAll("[data-fam]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const v = btn.getAttribute("data-fam");
        state.familia = (state.familia === v) ? null : v;
        renderChips();
        renderGrid();
      });
    });
  }
}

/* ==========================
   RENDER GRID (tarjetas)
========================== */
function renderGrid(highlightIds = []){
  const grid = $("inciensosGrid");
  if (!grid) return;

  const items = INCENSES.filter(matchesFilter);

  if (items.length === 0){
    grid.innerHTML = `<div class="muted">No hay resultados con esos filtros. Prueba “Limpiar filtros”.</div>`;
    return;
  }

  grid.innerHTML = items.map(it=>{
    const isHi = highlightIds.includes(it.id);
    return `
      <article class="card ${isHi ? "card-highlight" : ""}">
        <img src="${it.img}" alt="${it.name}">
        <div class="card-body">
          <div class="card-title">${it.name}</div>
          <div class="muted">${it.familia.join(" • ")} • ${it.uso.join(" • ")}</div>

          <div class="muted" style="margin-top:6px;">
            <strong>Ambiente:</strong> ${it.lugares.slice(0,3).join(", ")}
          </div>

          <div class="price" style="margin-top:10px;">
            <div class="now">$${it.price.toLocaleString("es-CL")}</div>
          </div>

          <div class="card-actions" style="margin-top:10px;">
            <a class="btn outline small" href="${productLink(it)}">Ver producto</a>
            <a class="btn primary small" href="${productLink(it)}">Comprar</a>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

/* ==========================
   LIMPIAR FILTROS
========================== */
function bindClear(){
  const btn = $("clearFiltersBtn");
  if (!btn) return;
  btn.addEventListener("click", ()=>{
    state.uso = null;
    state.familia = null;
    state.search = "";
    if ($("searchAroma")) $("searchAroma").value = "";
    renderChips();
    renderGrid();
  });
}

/* ==========================
   SEARCH INPUT
========================== */
function bindSearch(){
  const input = $("searchAroma");
  if (!input) return;
  input.addEventListener("input", ()=>{
    state.search = input.value || "";
    renderGrid();
  });
}

/* ==========================
   QUIZ 30 SEGUNDOS
========================== */
function renderQuizSelects(){
  const q1 = $("quizUso");
  const q2 = $("quizFamilia");
  const q3 = $("quizLugar");

  if (q1){
    q1.innerHTML = `<option value="">Selecciona</option>` + USO_LABELS.map(x=>`<option value="${x.key}">${x.label}</option>`).join("");
  }
  if (q2){
    q2.innerHTML = `<option value="">Selecciona</option>` + FAMILIA_LABELS.map(x=>`<option value="${x.key}">${x.label}</option>`).join("");
  }
  if (q3){
    q3.innerHTML = `<option value="">Selecciona</option>` + LUGARES.map(x=>`<option value="${x}">${x}</option>`).join("");
  }
}

function bindQuiz(){
  const btn = $("quizBtn");
  if (!btn) return;

  btn.addEventListener("click", ()=>{
    const quiz = {
      uso: $("quizUso") ? $("quizUso").value : "",
      familia: $("quizFamilia") ? $("quizFamilia").value : "",
      lugar: $("quizLugar") ? $("quizLugar").value : ""
    };

    // rank
    const ranked = INCENSES
      .map(it => ({ it, score: scoreForQuiz(it, quiz) }))
      .sort((a,b)=> b.score - a.score)
      .filter(x => x.score > 0)
      .slice(0, 6);

    const topIds = ranked.map(x=>x.it.id);

    // Muestra resultados
    const out = $("quizResults");
    if (out){
      if (ranked.length === 0){
        out.innerHTML = `<div class="muted">No encontré coincidencias exactas. Prueba cambiando “familia” o “lugar”.</div>`;
      } else {
        out.innerHTML = ranked.map(x=>`
          <div class="quiz-result">
            <div style="display:flex;gap:10px;align-items:center;">
              <img src="${x.it.img}" alt="${x.it.name}" style="width:58px;height:48px;object-fit:cover;border-radius:12px;">
              <div>
                <div style="font-weight:900;">${x.it.name}</div>
                <div class="muted">${x.it.familia.join(" • ")} • ${x.it.uso.join(" • ")}</div>
              </div>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <div class="now">$${x.it.price.toLocaleString("es-CL")}</div>
              <a class="btn primary small" href="${productLink(x.it)}">Ver</a>
            </div>
          </div>
        `).join("");
      }
    }

    // También destaca en la grilla
    renderGrid(topIds);

    // Scroll suave a la grilla (si existe)
    const anchor = $("inciensosSection");
    if (anchor) anchor.scrollIntoView({ behavior:"smooth", block:"start" });
  });
}

/* ==========================
   INIT
========================== */
(function init(){
  renderChips();
  renderGrid();
  bindClear();
  bindSearch();
  renderQuizSelects();
  bindQuiz();
})();
