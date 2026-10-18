import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Search, ShoppingBag, Menu, X, Plus, Minus, ArrowUpRight, Check, SlidersHorizontal } from "lucide-react";
import "./styles.css";

const products = [
  { id: 1, name: "Everyday Tote", category: "Accessories", price: 24, color: "sand", tag: "Bestseller", description: "A roomy carryall for your everyday essentials." },
  { id: 2, name: "Ceramic Mug", category: "Home", price: 18, color: "clay", tag: "New", description: "A simple, tactile mug for slow mornings." },
  { id: 3, name: "Soft Cotton Tee", category: "Clothing", price: 29, color: "sage", tag: "", description: "An easy-fit cotton tee made for repeat wear." },
  { id: 4, name: "Desk Notebook", category: "Stationery", price: 12, color: "blue", tag: "", description: "A clean page for your next big idea." },
  { id: 5, name: "Weekend Bottle", category: "Accessories", price: 32, color: "stone", tag: "Popular", description: "A reusable bottle with a considered, minimal shape." },
  { id: 6, name: "Linen Cushion", category: "Home", price: 36, color: "rose", tag: "", description: "Soft texture that makes a space feel like home." },
  { id: 7, name: "Daily Cap", category: "Clothing", price: 22, color: "olive", tag: "", description: "A low-profile cap for sunny days and easy outfits." },
  { id: 8, name: "Pocket Journal", category: "Stationery", price: 10, color: "lilac", tag: "", description: "A pocket-sized place for notes and little plans." }
];

const categories = ["All", "Accessories", "Home", "Clothing", "Stationery"];

function ProductArt({ product }) {
  const art = {
    sand: <><path d="M84 80h132l-12 144H96L84 80Z" fill="#C7A77D"/><path d="M117 86V62c0-37 66-37 66 0v24" fill="none" stroke="#8C6B48" strokeWidth="9" strokeLinecap="round"/><path d="M103 107h94" stroke="#E4D1B7" strokeWidth="3"/></>,
    clay: <><ellipse cx="150" cy="219" rx="66" ry="11" fill="#D8C8B7"/><path d="M100 83h94v92c0 27-21 48-47 48s-47-21-47-48V83Z" fill="#B86F50"/><path d="M194 105h20c32 0 32 58 0 58h-20" fill="none" stroke="#B86F50" strokeWidth="13"/><ellipse cx="147" cy="84" rx="47" ry="9" fill="#D49A7E"/></>,
    sage: <><path d="M95 73c0-9 8-16 17-16h76c9 0 17 7 17 16l10 145H85L95 73Z" fill="#9CA995"/><path d="M108 70h84" stroke="#D6DDD1" strokeWidth="4"/><path d="M119 105h62" stroke="#D6DDD1" strokeWidth="3" opacity=".8"/></>,
    blue: <><rect x="88" y="59" width="124" height="171" rx="5" fill="#D7E1E4"/><rect x="99" y="69" width="124" height="171" rx="5" fill="#8EAAB4"/><path d="M118 94h84M118 109h84M118 124h62M118 151h84M118 166h84M118 181h62" stroke="#DCE7E9" strokeWidth="3" opacity=".9"/><path d="M100 69h22" stroke="#5F7D87" strokeWidth="3"/></>,
    stone: <><rect x="119" y="55" width="63" height="174" rx="25" fill="#A3A59B"/><rect x="128" y="39" width="45" height="27" rx="7" fill="#74776F"/><rect x="130" y="91" width="41" height="58" rx="4" fill="#D6D3C8"/><path d="M139 111h23M139 120h23M139 129h16" stroke="#85877F" strokeWidth="2"/></>,
    rose: <><rect x="79" y="94" width="143" height="115" rx="9" fill="#CFA6A0" transform="rotate(-8 150 150)"/><path d="M88 124c27-13 52-18 79-17 17 1 33 5 48 13" stroke="#E8C9C4" strokeWidth="3" fill="none"/><path d="M93 171c35-12 74-13 112-1" stroke="#E8C9C4" strokeWidth="3" fill="none"/></>,
    olive: <><path d="M91 106c0-35 26-58 59-58s59 23 59 58v25H91v-25Z" fill="#92947A"/><path d="M91 123h118v18c0 12-9 21-21 21h-76c-12 0-21-9-21-21v-18Z" fill="#7D8066"/><path d="M150 48v84" stroke="#B7B9A4" strokeWidth="2"/><path d="M208 124c21 0 34 12 34 27" stroke="#7D8066" strokeWidth="10" fill="none" strokeLinecap="round"/></>,
    lilac: <><rect x="91" y="59" width="118" height="171" rx="6" fill="#B5A9C8"/><rect x="104" y="72" width="118" height="171" rx="6" fill="#D3C8E0"/><path d="M124 105h77M124 120h77M124 135h51M124 165h77M124 180h77M124 195h51" stroke="#A79AB9" strokeWidth="3"/></>
  };
  return <div className={`product-art art-${product.color}`} aria-label={`${product.name} illustration`}>
    <svg viewBox="0 0 300 280" role="img" aria-hidden="true">{art[product.color]}<ellipse cx="150" cy="245" rx="91" ry="8" fill="#000" opacity=".06"/></svg>
  </div>;
}

function App() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [bag, setBag] = useState({});
  const [bagOpen, setBagOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const [checkoutDone, setCheckoutDone] = useState(false);

  const shown = useMemo(() => products.filter(p =>
    (category === "All" || p.category === category) &&
    `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(search.toLowerCase())
  ), [category, search]);

  const bagItems = products.filter(p => bag[p.id]).map(p => ({ ...p, quantity: bag[p.id] }));
  const itemCount = bagItems.reduce((sum, p) => sum + p.quantity, 0);
  const subtotal = bagItems.reduce((sum, p) => sum + p.price * p.quantity, 0);

  function addToBag(product) {
    setBag(old => ({ ...old, [product.id]: (old[product.id] || 0) + 1 }));
    setNotice(`${product.name} added to your bag`);
    window.setTimeout(() => setNotice(""), 2200);
  }
  function updateQuantity(id, delta) {
    setBag(old => {
      const next = { ...old, [id]: (old[id] || 0) + delta };
      if (next[id] <= 0) delete next[id];
      return next;
    });
  }

  return <div className="site-shell">
    <div className="announcement">A little something for your everyday <span>✳</span> Free shipping on orders over $50</div>
    <header className="header">
      <button className="icon-button mobile-menu-button" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
      <a href="#home" className="brand">my<span>.</span>website</a>
      <nav className={mobileMenu ? "nav nav-open" : "nav"} aria-label="Main navigation">
        <a href="#shop" onClick={() => setMobileMenu(false)}>Shop all</a>
        <a href="#story" onClick={() => setMobileMenu(false)}>Our story</a>
        <a href="#footer" onClick={() => setMobileMenu(false)}>Contact</a>
      </nav>
      <div className="header-actions">
        <label className="search-box"><Search size={17}/><input value={search} onChange={e => {setSearch(e.target.value); document.getElementById("shop")?.scrollIntoView({behavior:"smooth"});}} placeholder="Search" aria-label="Search products"/></label>
        <button className="bag-button" onClick={() => setBagOpen(true)} aria-label={`Open shopping bag, ${itemCount} items`}><ShoppingBag size={19}/><span>Bag</span><span className="bag-count">{itemCount}</span></button>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot"></span> GOOD THINGS, MADE SIMPLE</p>
          <h1>Everyday things.<br/><em>Thoughtfully</em> chosen.</h1>
          <p className="hero-description">Useful little things for your home, your routine, and everywhere in between.</p>
          <a className="primary-button" href="#shop">Explore the collection <ArrowUpRight size={17}/></a>
          <div className="hero-footnote"><span>01 — 08</span><span>Everyday essentials, elevated.</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-sun"></div><div className="hero-plant plant-one"></div><div className="hero-plant plant-two"></div>
          <div className="hero-shelf"></div>
          <div className="hero-product hero-bag"><ProductArt product={products[0]}/></div>
          <div className="hero-product hero-mug"><ProductArt product={products[1]}/></div>
          <div className="hero-note">Made for the<br/>little moments <span>↗</span></div>
          <span className="visual-index">OBJECTS FOR EVERY DAY / 2026</span>
        </div>
      </section>

      <section className="trust-strip" aria-label="Store benefits">
        <div><span>✳</span> Thoughtfully selected</div><div><span>↗</span> Easy everyday design</div><div><span>♡</span> Made to be used</div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div><p className="eyebrow">THE COLLECTION</p><h2>Little things, <em>big difference.</em></h2></div>
          <p>Simple pieces you'll reach for<br className="desktop-only"/> again and again.</p>
        </div>
        <div className="shop-toolbar">
          <div className="category-list" aria-label="Filter by category">
            {categories.map(c => <button key={c} onClick={() => setCategory(c)} className={category === c ? "category active" : "category"}>{c}</button>)}
          </div>
          <span className="result-count"><SlidersHorizontal size={14}/> {shown.length} items</span>
        </div>
        <div className="product-grid">
          {shown.map((p, i) => <article className="product-card" key={p.id}>
            <div className="product-image-wrap">
              {p.tag && <span className="product-tag">{p.tag}</span>}
              <ProductArt product={p}/>
              <button className="quick-add" onClick={() => addToBag(p)} aria-label={`Add ${p.name} to bag`}><Plus size={19}/></button>
            </div>
            <div className="product-info"><div><h3>{p.name}</h3><p>{p.category}</p></div><span className="price">${p.price.toFixed(2)}</span></div>
            <p className="product-description">{p.description}</p>
          </article>)}
        </div>
        {shown.length === 0 && <div className="empty-search"><Search size={25}/><h3>No products found</h3><p>Try another search or choose a different category.</p><button className="text-button" onClick={() => {setSearch("");setCategory("All");}}>Clear filters</button></div>}
      </section>

      <section className="story-section" id="story">
        <div className="story-art"><div className="story-circle"></div><div className="story-stamp">LESS, BUT<br/>BETTER <span>✳</span></div><div className="story-line"></div></div>
        <div className="story-copy"><p className="eyebrow">A NOTE FROM US</p><h2>Make room for<br/><em>what matters.</em></h2><p>We believe the things you use every day should feel good to use. That's why we keep our collection considered, useful, and uncomplicated.</p><a href="#shop" className="text-link">Find your everyday favorite <ArrowUpRight size={16}/></a></div>
      </section>

      <section className="newsletter"><div><p className="eyebrow">A GOOD THING IN YOUR INBOX</p><h2>Stay in the <em>loop.</em></h2><p>New finds, thoughtful notes, and a little inspiration.</p></div><form onSubmit={e => {e.preventDefault();setNotice("Thanks for joining our demo newsletter!");e.currentTarget.reset();window.setTimeout(() => setNotice(""),2600);}}><label className="sr-only" htmlFor="email">Your email address</label><input id="email" type="email" placeholder="Your email address" required/><button type="submit" aria-label="Subscribe"><ArrowUpRight/></button></form></section>
    </main>

    <footer id="footer"><a href="#home" className="brand">my<span>.</span>website</a><p>Thoughtful everyday essentials.</p><div className="footer-links"><a href="#shop">Shop</a><a href="#story">Our story</a><a href="mailto:hello@example.com">Email us</a></div><span className="copyright">© 2026 My Website. Demo storefront.</span></footer>

    {notice && <div className="toast" role="status"><Check size={17}/>{notice}</div>}

    {bagOpen && <div className="drawer-backdrop" onMouseDown={e => {if(e.target === e.currentTarget)setBagOpen(false);}}>
      <aside className="bag-drawer" aria-label="Shopping bag">
        <div className="drawer-header"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({itemCount})</span></h2></div><button className="icon-button" onClick={() => setBagOpen(false)} aria-label="Close bag"><X/></button></div>
        {checkoutDone ? <div className="bag-empty"><div className="empty-icon"><Check size={26}/></div><h3>Demo checkout complete</h3><p>No payment was taken and no order was created. Connect a backend and payment provider to accept real orders.</p><button className="primary-button" onClick={() => {setCheckoutDone(false);setBagOpen(false);}}>Continue shopping <ArrowUpRight size={17}/></button></div> : bagItems.length === 0 ? <div className="bag-empty"><div className="empty-icon"><ShoppingBag size={25}/></div><h3>Your bag is looking light.</h3><p>Good things are waiting to be found.</p><button className="primary-button" onClick={() => {setBagOpen(false);document.getElementById("shop")?.scrollIntoView({behavior:"smooth"});}}>Explore the shop <ArrowUpRight size={17}/></button></div> : <>
          <div className="bag-items">{bagItems.map(p => <div className="bag-item" key={p.id}><div className="bag-thumb"><ProductArt product={p}/></div><div className="bag-item-info"><h3>{p.name}</h3><p>${p.price.toFixed(2)}</p><div className="quantity-control"><button onClick={() => updateQuantity(p.id,-1)} aria-label={`Remove one ${p.name}`}><Minus size={13}/></button><span>{p.quantity}</span><button onClick={() => updateQuantity(p.id,1)} aria-label={`Add one ${p.name}`}><Plus size={13}/></button></div></div><strong>${(p.price*p.quantity).toFixed(2)}</strong></div>)}</div>
          <div className="bag-summary"><div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><p>Shipping and taxes calculated at checkout.</p><button className="primary-button checkout-button" onClick={() => {setCheckoutDone(true);setBag({});}}>Continue to checkout <ArrowUpRight size={17}/></button><p className="demo-note">Demo only — no real payment will be processed.</p></div>
        </>}
      </aside>
    </div>}
  </div>;
}

createRoot(document.getElementById("root")).render(<App />);
