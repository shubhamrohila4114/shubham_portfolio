import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Menu, Phone, X, Download, Code2, Layers3, Sparkles, Check, MoveUpRight } from 'lucide-react';
import { certifications, education, experience, processSteps, profile, projects, skills } from './data/portfolio.js';

const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: .7, ease: [.16, 1, .3, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: .09 } } };

function ResumeButton({ className = '' }) {
  const [busy, setBusy] = useState(false);
  const download = async () => {
    setBusy(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const left = 48, width = 500; let y = 54;
      doc.setFillColor(18, 19, 17); doc.rect(0, 0, 595, 185, 'F');
      doc.setTextColor(240, 239, 229); doc.setFont('helvetica', 'bold'); doc.setFontSize(28); doc.text(profile.name, left, y + 14);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(12); doc.text(profile.role, left, y + 39);
      doc.setFontSize(9); doc.text(`${profile.phone}   •   ${profile.email}   •   github.com/shubhamrohila4114`, left, y + 64);
      y = 220; doc.setTextColor(32, 35, 31);
      const heading = (text) => { doc.setFont('helvetica', 'bold'); doc.setFontSize(12); doc.text(text.toUpperCase(), left, y); y += 11; doc.setDrawColor(193, 202, 175); doc.line(left, y, left + width, y); y += 17; };
      const paragraph = (text, size = 10) => { doc.setFont('helvetica', 'normal'); doc.setFontSize(size); const lines = doc.splitTextToSize(text, width); doc.text(lines, left, y); y += lines.length * (size + 3) + 10; };
      heading('Profile'); paragraph(`${profile.introduction} ${profile.objective}`);
      heading('Experience');
      experience.forEach((item) => { doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.text(`${item.role} — ${item.company}`, left, y); y += 14; doc.setFont('helvetica', 'italic'); doc.text(item.date, left, y); y += 13; item.points.slice(0, 3).forEach((point) => paragraph(`• ${point}`, 9)); });
      if (y > 690) { doc.addPage(); y = 56; }
      heading('Selected projects'); projects.forEach((item) => { doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.text(item.name, left, y); y += 14; paragraph(item.summary, 9); item.contribution.slice(0, 2).forEach((point) => paragraph(`• ${point}`, 9)); });
      if (y > 680) { doc.addPage(); y = 56; }
      heading('Skills'); skills.forEach((group) => paragraph(`${group.title}: ${group.items.join(', ')}`, 9));
      heading('Education & certifications'); paragraph(`${education.degree}, ${education.institution} (${education.date})`, 9); certifications.forEach((item) => paragraph(`${item.name} — ${item.provider} | ${item.date}`, 9));
      doc.save('Shubham-Rohila-Resume.pdf');
    } finally { setBusy(false); }
  };
  return <button className={className} onClick={download} type="button" aria-label="Download resume as PDF">{busy ? 'Preparing…' : <>Resume <Download size={14} /></>}</button>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['Work', '#work'], ['About', '#about'], ['Journey', '#journey'], ['Contact', '#contact']];
  return <header className="site-header"><a className="wordmark" href="#top" aria-label="Shubham Rohila, home">SR<span>®</span></a>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
    <a href={`mailto:${profile.email}`} className="header-hello">Let’s talk <ArrowUpRight size={14}/></a>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X/> : <Menu/>}</button>
    <AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} aria-label="Mobile navigation">{links.map(([label, href])=><a key={href} href={href} onClick={()=>setOpen(false)}>{label}<ArrowUpRight size={16}/></a>)}</motion.nav>}</AnimatePresence>
  </header>;
}

function Eyebrow({ children }) { return <div className="eyebrow"><span className="eyebrow-dot"/>{children}</div>; }
function SectionHeading({ index, eyebrow, title, note }) { return <motion.div className="section-heading" variants={reveal}><div><Eyebrow>{index} / {eyebrow}</Eyebrow><h2>{title}</h2></div>{note && <p>{note}</p>}</motion.div>; }

function Hero() {
  const reduce = useReducedMotion();
  return <section className="hero" id="top">
    <div className="hero-grain" aria-hidden="true"/><div className="hero-orbit" aria-hidden="true"><span/><span/><span/><div className="orbit-core"><Code2 size={30}/></div><i className="orbit-node node-one"/><i className="orbit-node node-two"/><i className="orbit-node node-three"/></div>
    <div className="hero-copy"><motion.div initial="hidden" animate="show" variants={stagger}>
      <motion.div variants={reveal}><Eyebrow>Developer · India · Available for opportunities</Eyebrow></motion.div>
      <motion.h1 variants={reveal}>Building<br/><em>for people.</em></motion.h1>
      <motion.p className="hero-intro" variants={reveal}>I’m Shubham Rohila — a <strong>Full Stack Developer</strong> shaping thoughtful, user-focused web experiences from first idea to final detail.</motion.p>
      <motion.div className="hero-actions" variants={reveal}><a className="button button-light" href="#work">View projects <ArrowRight size={16}/></a><a className="button button-outline" href="#contact">Contact me <MoveUpRight size={15}/></a></motion.div>
    </motion.div></div>
    <motion.div className="hero-side-note" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}>DESIGN-MINDED ENGINEERING <span>✳</span></motion.div>
    <a href="#about" className="scroll-cue"><span>Scroll to explore</span><ArrowDown size={14}/></a><div className="hero-index">01 — 08</div>
  </section>;
}

function About() { return <section className="section about-section" id="about"><div className="section-wrap"><SectionHeading index="01" eyebrow="A little about me" title={<>Code with care.<br/><span>Built for humans.</span></>} note="Curiosity in the details. Clarity in the experience."/><div className="about-grid"><motion.div className="about-mark" variants={reveal} aria-hidden="true"><span>SR</span><i>FULL STACK<br/>DEVELOPER</i><div className="mark-ring"/></motion.div><motion.div className="about-copy" variants={reveal}><p className="lead-copy">{profile.introduction}</p><p>{profile.objective}</p><div className="about-signoff"><span>Curious by nature</span><span className="signoff-line"/><span>Focused on the details</span></div></motion.div></div></div></section>; }

function ProjectVisual({ project, index }) {
  return <div className={`project-art art-${project.tone}`} aria-label={`${project.name} visual placeholder`} role="img"><div className="art-noise"/><div className={`art-shape shape-${index}`}><div className="shape-orbit"/><div className="shape-window"><span/><span/><span/><b>{project.visualLabel}</b><div className="shape-lines"><i/><i/><i/></div></div></div><div className="art-bottom"><span>CONCEPTUAL VISUAL</span><span>0{index+1}</span></div><div className="art-stamp">{index===0?<Sparkles size={18}/>:index===1?<Layers3 size={18}/>:<Code2 size={18}/>}</div></div>;
}
function Projects() { return <section className="section work-section" id="work"><div className="section-wrap"><SectionHeading index="02" eyebrow="Selected work" title={<>Made to work.<br/><span>Made to matter.</span></>} note="Real projects, careful iteration, and thoughtful delivery."/><div className="project-list">{projects.map((project,index)=><motion.article className={`project-card ${index%2?'reverse':''}`} key={project.name} variants={reveal}><ProjectVisual project={project} index={index}/><div className="project-info"><div className="project-meta"><span>{project.number} / SELECTED PROJECT</span><span>{project.category}</span></div><h3>{project.name}<sup>↗</sup></h3><p className="project-summary">{project.summary}</p><div className="contribution-label">CONTRIBUTION</div><ul>{project.contribution.map((point)=><li key={point}><Check size={14}/>{point}</li>)}</ul><span className="no-link-note">Project details from experience</span></div></motion.article>)}</div></div></section>; }

function Arsenal() { return <section className="section arsenal-section"><div className="section-wrap"><SectionHeading index="03" eyebrow="Technical arsenal" title={<>Tools for the<br/><span>next idea.</span></>} note="A growing toolkit across code, products, and collaboration."/><div className="skill-grid">{skills.map((group)=><motion.div className="skill-group" key={group.title} variants={reveal}><div className="skill-head"><span>{group.number}</span><h3>{group.title}</h3><ArrowUpRight size={15}/></div><div className="skill-tags">{group.items.map((item)=><span key={item}>{item}</span>)}</div></motion.div>)}</div></div></section>; }

function Experience() { return <section className="section journey-section" id="journey"><div className="section-wrap"><SectionHeading index="04" eyebrow="Experience" title={<>Learning by<br/><span>doing the work.</span></>} note="Hands-on development, real requirements, and collaborative delivery."/><div className="timeline">{experience.map((item,index)=><motion.article className="timeline-entry" key={item.company} variants={reveal}><div className="timeline-marker"><span>0{index+1}</span><i/></div><div className="timeline-content"><div className="timeline-top"><div><h3>{item.company}</h3><p>{item.role}</p></div><time>{item.date}</time></div><ul>{item.points.map((point)=><li key={point}>{point}</li>)}</ul></div></motion.article>)}</div></div></section>; }

function Process() { return <section className="section process-section"><div className="section-wrap"><SectionHeading index="05" eyebrow="Development process" title={<>Thought through.<br/><span>Tested with intent.</span></>} note="A practical loop for moving from a clear brief to a more dependable experience."/><div className="process-track">{processSteps.map((step)=><motion.article className="process-step" key={step.number} variants={reveal}><div className="process-number">{step.number}<span>✳</span></div><h3>{step.title}</h3><p>{step.detail}</p></motion.article>)}</div></div></section>; }

function Education() { return <section className="section education-section"><div className="section-wrap"><SectionHeading index="06" eyebrow="Education & certifications" title={<>Always in<br/><span>the making.</span></>} note="Formal foundations and focused software development training."/><div className="education-grid"><motion.article className="education-card" variants={reveal}><Eyebrow>Education</Eyebrow><h3>{education.degree}</h3><p>{education.institution}</p><time>{education.date}</time><div className="edu-icon"><Code2 size={22}/></div></motion.article><div className="cert-list">{certifications.map((item,index)=><motion.article className="cert-card" key={item.name} variants={reveal}><span className="cert-number">0{index+1}</span><div><Eyebrow>Certification</Eyebrow><h3>{item.name}</h3><p>{item.provider}</p><time>{item.date}</time></div><ArrowUpRight size={18}/></motion.article>)}</div></div></div></section>; }

function Contact() { return <section className="contact-section" id="contact"><div className="contact-glow"/><div className="section-wrap contact-wrap"><Eyebrow>07 / Start a conversation</Eyebrow><motion.h2 initial="hidden" whileInView="show" viewport={{once:true,amount:.25}} variants={reveal}>Let’s build<br/><em>what’s next.</em></motion.h2><p className="contact-intro">Open to opportunities and conversations around thoughtful web experiences.</p><a className="button button-light contact-cta" href={`mailto:${profile.email}`}>Get in touch <ArrowUpRight size={16}/></a><div className="contact-details"><a href={`mailto:${profile.email}`}><Mail size={15}/>{profile.email}<ArrowUpRight size={13}/></a><a href={`tel:${profile.phone.replaceAll(' ','')}`}><Phone size={15}/>{profile.phone}<ArrowUpRight size={13}/></a><a href={profile.github} target="_blank" rel="noreferrer"><Github size={15}/>GitHub<ArrowUpRight size={13}/></a><a href="https://www.linkedin.com/in/shubhamrohila4114" target="_blank" rel="noreferrer"><Linkedin size={15}/>LinkedIn<ArrowUpRight size={13}/></a><ResumeButton className="resume-link"/></div></div><footer className="site-footer"><a className="wordmark" href="#top">SR<span>®</span></a><span>Thoughtfully built by Shubham Rohila</span><a href="#top">Back to top ↑</a><span>© {new Date().getFullYear()}</span></footer></section>; }

export default function App() {
  useEffect(()=>{ document.documentElement.classList.add('js-ready'); return ()=>document.documentElement.classList.remove('js-ready'); },[]);
  return <><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main"><Hero/><motion.div initial="hidden" whileInView="show" viewport={{once:true,amount:.08}} variants={stagger}><About/><Projects/><Arsenal/><Experience/><Process/><Education/></motion.div><Contact/></main></>;
}
