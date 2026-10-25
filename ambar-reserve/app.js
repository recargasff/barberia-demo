const products = [
 {name:"Reserva de Roble",category:"Whisky",detail:"Notas cálidas · Edición clásica",price:48.90,tag:"SELECCIÓN",image:"https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=700&q=80"},
 {name:"Ron Gran Reserva",category:"Ron",detail:"Suave · Carácter caribeño",price:32.50,tag:"CLÁSICO",image:"https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=700&q=80"},
 {name:"Tinto de Autor",category:"Vino",detail:"Frutos oscuros · Final elegante",price:24.00,tag:"RECOMENDADO",image:"https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=700&q=80"},
 {name:"Vodka Signature",category:"Vodka",detail:"Perfil limpio · Estilo moderno",price:29.90,tag:"DESTACADO",image:"https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=700&q=80"},
 {name:"Whisky Single Malt",category:"Whisky",detail:"Complejo · Notas de madera",price:76.00,tag:"RESERVE",image:"https://images.unsplash.com/photo-1569529465841-dfecut4?auto=format&fit=crop&w=700&q=80"},
 {name:"Ron Añejo",category:"Ron",detail:"Dulce especiado · Gran cuerpo",price:39.50,tag:"FAVORITO",image:"https://images.unsplash.com/photo-1560508180-03f285f67ded?auto=format&fit=crop&w=700&q=80"},
 {name:"Vino Rosé",category:"Vino",detail:"Fresco · Aromas delicados",price:21.50,tag:"NOVEDAD",image:"https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&w=700&q=80"},
 {name:"Vodka Premium",category:"Vodka",detail:"Equilibrado · Presentación especial",price:34.00,tag:"SELECCIÓN",image:"https://images.unsplash.com/photo-1582819509237-d5b5f9b7?auto=format&fit=crop&w=700&q=80"}
];
let activeFilter = "Todos";
const grid = document.querySelector("#product-grid");
const search = document.querySelector("#search");
const money = value => new Intl.NumberFormat("es-VE",{style:"currency",currency:"USD"}).format(value);
function renderProducts(){
 const term = search.value.trim().toLocaleLowerCase("es");
 const shown = products.filter(p => (activeFilter==="Todos" || p.category===activeFilter) && (p.name+" "+p.category+" "+p.detail).toLocaleLowerCase("es").includes(term));
 if(!shown.length){grid.innerHTML='<div class="empty-state">No encontramos productos con esa búsqueda.</div>';return;}
 grid.innerHTML = shown.map(p=>'<article class="product-card"><div class="product-visual"><img loading="lazy" src="'+p.image+'" alt="'+p.name+'" onerror="this.style.display=\'none\'"><span class="product-tag">'+p.tag+'</span></div><div class="product-info"><span class="product-category">'+p.category+'</span><h3>'+p.name+'</h3><p>'+p.detail+'</p><div class="product-bottom"><span class="price">'+money(p.price)+'</span><button class="add-button" type="button" aria-label="Consultar '+p.name+'" data-product="'+p.name+'">+</button></div></div></article>').join("");
 grid.querySelectorAll(".add-button").forEach(button=>button.addEventListener("click",()=>{const p=products.find(item=>item.name===button.dataset.product);const message="Hola, quisiera consultar disponibilidad y precio de "+p.name+". Entiendo que este sitio es una demostración y deseo confirmar los datos reales.";window.open("https://wa.me/584126710899?text="+encodeURIComponent(message),"_blank","noopener,noreferrer");}));
}
document.querySelectorAll(".filter").forEach(button=>button.addEventListener("click",()=>{document.querySelector(".filter.active")?.classList.remove("active");button.classList.add("active");activeFilter=button.dataset.filter;renderProducts();}));
search.addEventListener("input",renderProducts);
const menuToggle=document.querySelector(".menu-toggle");
menuToggle.addEventListener("click",()=>{const nav=document.querySelector("#nav");const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.textContent=open?"×":"☰";});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>{document.querySelector("#nav").classList.remove("open");menuToggle.setAttribute("aria-expanded","false");menuToggle.textContent="☰";}));
const ageOverlay=document.querySelector("#age-overlay");
document.querySelector("#age-confirm").addEventListener("click",()=>ageOverlay.classList.add("hidden"));
document.querySelector("#year").textContent=new Date().getFullYear();
renderProducts();