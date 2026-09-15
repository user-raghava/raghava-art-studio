import React, { useEffect, useState } from 'react';
import { artworks } from './data/artworks';

const mediums = ['Color Pencil', 'Charcoal', 'Acrylic', 'Watercolor', 'Oil', 'Soft Pastel'];
const sizes = ['A5', 'A4', 'A3', 'A2', 'A1'];

const phone = '919705140840';

function App() {
  const [paintingType, setPaintingType] = useState('Portrait');
  const [medium, setMedium] = useState('Color Pencil');
  const [size, setSize] = useState('A4');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('All');
  const [price, setPrice] = useState(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceError, setPriceError] = useState('');
  const visible = category === 'All' ? artworks : artworks.filter(a => a.category === category);

  useEffect(() => {
    let cancelled = false;

    async function calculatePrice() {
      setPriceLoading(true);
      setPriceError('');

      try {
        const response = await fetch('/api/paintings/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ medium, size })
        });

        if (!response.ok) {
          throw new Error(`Pricing API returned ${response.status}`);
        }

        const data = await response.json();
        if (!cancelled) setPrice(data.estimatedPrice);
      } catch (error) {
        if (!cancelled) {
          setPrice(null);
          setPriceError('Unable to calculate the price. Please check that the backend is running.');
        }
      } finally {
        if (!cancelled) setPriceLoading(false);
      }
    }

    calculatePrice();
    return () => { cancelled = true; };
  }, [medium, size]);

  const whatsappText = encodeURIComponent(
    `Hello Raghava Art Studio,

I would like to request a custom painting.

Painting Type: ${paintingType}
Medium: ${medium}
Size: ${size}
Estimated Painting Price: ${price == null ? 'Not available yet' : `₹${price.toLocaleString('en-IN')}`}

Description: ${description || 'Not provided'}

Delivery charges are additional and can be confirmed based on my location.

Thank you.`
  );

  return (
    <div>
      <header className="nav">
        <a className="brand" href="#home">Raghava <span>Art Studio</span></a>
        <nav>
          <a href="#gallery">Gallery</a>
          <a href="#mediums">Mediums</a>
          <a href="#commission">Commission</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="nav-whatsapp" href={`https://wa.me/${phone}?text=${whatsappText}`}>WhatsApp</a>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">HANDCRAFTED • PERSONAL • ORIGINAL</p>
            <h1>Art that turns your <em>story</em> into something timeless.</h1>
            <p className="lead">Portraits, landscapes, traditional Indian art and custom paintings created by hand in the medium you love.</p>
            <div className="hero-actions">
              <a className="button primary" href="#commission">Create Your Painting</a>
              <a className="button ghost" href="#gallery">Explore My Work</a>
            </div>
            <div className="signature">Raghava Art Studio · India</div>
          </div>
          <div className="hero-art">
            <div className="hero-frame"><img src="/artworks/artwork-1.png" alt="Featured portrait artwork" /></div>
            <div className="paint-note">Hand painted<br/>with care</div>
          </div>
        </section>

        <section className="intro">
          <p className="eyebrow">THE STUDIO</p>
          <h2>From a photograph, a memory, or simply an idea — <em>let's make it art.</em></h2>
          <p>Choose your subject, medium and size. Get an estimated painting price instantly, then contact the studio to discuss your commission.</p>
        </section>

        <section id="gallery" className="section">
          <div className="section-heading">
            <div><p className="eyebrow">PORTFOLIO</p><h2>Selected works</h2></div>
            <div className="filters">{['All','Portraits','Landscapes','Traditional','Studies'].map(c =>
              <button key={c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>{c}</button>
            )}</div>
          </div>
          <div className="gallery">{visible.map((art, i) =>
            <article className={`card card-${i % 3}`} key={art.id}>
              <div className="image-wrap"><img src={art.image} alt={art.title} /></div>
              <p>{art.category} · {art.medium}</p>
              <h3>{art.title}</h3>
            </article>
          )}</div>
        </section>

        <section id="mediums" className="medium-section">
          <div className="section-heading"><div><p className="eyebrow">MATERIAL & TEXTURE</p><h2>Choose your medium</h2></div></div>
          <div className="medium-grid">
            {mediums.map((m, i) => <button key={m} onClick={() => {setMedium(m); document.querySelector('#commission').scrollIntoView({behavior:'smooth'});}}>
              <span>0{i+1}</span><strong>{m}</strong><small>View pricing & commission</small>
            </button>)}
          </div>
        </section>

        <section id="commission" className="commission">
          <div className="commission-copy">
            <p className="eyebrow">CUSTOM COMMISSION</p>
            <h2>Bring your idea to life.</h2>
            <p>Tell us what you would like painted. The calculator gives an estimated artwork price. Delivery is quoted separately according to destination.</p>
            <div className="contact-mini"><span>📞 +91 9705140840</span><span>✉ raghava.artstudio@gmail.com</span></div>
          </div>
          <div className="calculator">
            <label>Painting type
              <select value={paintingType} onChange={e => setPaintingType(e.target.value)}>
                <option>Portrait</option><option>Landscape / Scenery</option><option>Traditional / Native Art</option><option>Custom</option>
              </select>
            </label>
            <label>Medium
              <select value={medium} onChange={e => setMedium(e.target.value)}>{mediums.map(m => <option key={m}>{m}</option>)}</select>
            </label>
            <label>Size
              <select value={size} onChange={e => setSize(e.target.value)}>{sizes.map(s => <option key={s}>{s}</option>)}</select>
            </label>
            <label>Describe your painting
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Example: cottage with sheep in a mountain landscape..." />
            </label>
            <div className="price"><span>Estimated artwork price</span><strong>{priceLoading ? 'Calculating…' : price == null ? '—' : `₹${price.toLocaleString('en-IN')}`}</strong></div>
            {priceError && <p className="api-error">{priceError}</p>}
            <p className="delivery">🚚 Delivery charges are additional and depend on your delivery location.</p>
            <a className="button whatsapp" href={`https://wa.me/${phone}?text=${whatsappText}`}>💬 Send Request on WhatsApp</a>
          </div>
        </section>

        <section id="contact" className="contact">
          <p className="eyebrow">LET'S CREATE</p>
          <h2>Have an idea for a painting?</h2>
          <p>Send a photograph or describe what you imagine. We can discuss the medium, size, artwork price and delivery.</p>
          <div className="contact-actions">
            <a href={`tel:+919705140840`}>Call +91 9705140840</a>
            <a href="mailto:raghava.artstudio@gmail.com">raghava.artstudio@gmail.com</a>
          </div>
        </section>
      </main>

      <footer><strong>Raghava Art Studio</strong><span>Handcrafted art · India</span><span>© 2026 Raghava Art Studio</span></footer>
    </div>
  );
}
export default App;