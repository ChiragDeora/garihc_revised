# GARIHC - Changes to Implement

All changes to integrate into the existing garihc.com codebase.

---

## UI & Messaging Changes

### 1. Hero Section - Rewrite for Clarity

**Problem:** Current hero "Strategy · Technology · Taste" tells a cold visitor nothing. They don't know if this is a consulting firm, a tech startup, or a luxury brand.

**Change:** Replace the headline and subline so a stranger knows within 3 seconds what GARIHC does.

- **New headline:** "We understand your business and build the complete solution." (or similar - clear, direct, no abstraction)
- **New subline:** "Strategy, AI, development, and design - from one person who does it all."
- **Keep:** The "Inquire" button and the full-width image below

### 2. Move GARIHC Meaning Section Lower

**Problem:** Currently right after the hero. A cold visitor is decoding your name before they even know what you do. It's branding before trust.

**Change:** Move the GARIHC letter-by-letter reveal to AFTER the Services or Portfolio section. By that point visitors understand your work, and the name reveal becomes an interesting "about the brand" moment instead of a confusing barrier.

**New section order:**
1. Navbar
2. Hero (rewritten)
3. Services
4. AI Spotlight (with calculator CTA)
5. Selected Work
6. **GARIHC Meaning (moved here)**
7. About
8. Contact
9. Footer

### 3. Rewrite GARIHC Meaning Content

**Problem:** Current descriptions are abstract and poetic ("We start with your north star..."). Needs to explain GARIHC as one unified promise, not three separate things.

**New framing - one goal, not three pillars:**

At the top of the section, add a statement:
> "GARIHC stands for Guiding Ambitions, Realizing Innovations, Harnessing Creativity - it's not three services, it's one promise. We take your business problem from understanding to strategy to a fully built, beautifully designed solution. All under one roof."

Then the letter descriptions should be more practical:

- **G** - "Guiding" - "We sit with you, understand your business inside out - the problem, the market, the goal - and build a strategy before writing a single line of code."
- **A** - "Ambitions" - "We build strategies for visions that others dismiss as impossible. Scale doesn't intimidate us."
- **R** - "Realizing" - "We take that strategy and build it - AI automations, web platforms, dashboards, ERP systems, whatever the solution demands."
- **I** - "Innovations" - "From AI agents to product architecture - we bring what's next into what's now. End to end."
- **H** - "Harnessing" - "We take raw creativity, emerging technology, and sharp data - and make them work together."
- **C** - "Creativity" - "We make sure it doesn't just work - it looks right, feels right, and communicates the brand. Design baked into every build."

### 4. Add One Warm Accent Color

**Problem:** Brother's feedback - "the color scheme felt dull." All charcoal and ivory reads as lifeless for a freelance site that needs to earn attention. Bottega Veneta can do all-muted because everyone already knows Bottega.

**Change:** Introduce one warm accent for energy. Options (pick one):

- Warm terracotta: `#C4663A`
- Deep warm blue: `#2B4C7E`
- Refined sage: `#6B8F71`

Use it for:
- Primary CTA buttons (instead of charcoal fill)
- Hover states on service rows
- The "Inquire" button
- Calculator "See My Savings" and "Get a Free AI Audit" buttons
- Active state on the GARIHC progress indicator

Keep gold (`#B8A88A`) for display letters and numbers. The new accent replaces charcoal as the action/interaction color only.

### 5. Show Proof Faster

**Problem:** No credibility signals until you scroll past half the page.

**Change:** Add a small client/project logo strip directly below the hero image. Simple row of project names or logos in grey, muted:

```
SPCO · Foal & Pony · Stallion Eyewear · Deora Polyplast
```

Styled as: Outfit, 0.7rem, uppercase, letter-spacing 0.2em, light-grey color, centered, with thin top border. No hover effects, no links - just quiet social proof.

### 6. About Section - Tighten the Copy

**Current:** "A full-stack strategist and technologist who works at the intersection of business, AI, and design..."

**Change to something warmer and more specific:**
> "I started GARIHC because I kept seeing the same problem - businesses hiring a strategist, a developer, and a designer, and none of them talking to each other. I do all three. That's the entire edge."

---

## New Features to Add

### 1. AI Chatbot Widget

#### Files to add:

**`app/api/chat/route.ts`** - API route that proxies messages to Anthropic Claude API
- Uses Claude Haiku 4.5 (`claude-haiku-4-5-20251001`)
- System prompt contains all GARIHC services, past work, pricing policy, and brand tone
- Max 300 output tokens per response
- Keeps last 10 messages for conversation context
- Cost: ~$0.008 per conversation (~625 conversations for $5)

**`components/ChatWidget.tsx`** - Floating chat widget (client component)
- Charcoal button, bottom-right corner, 56x56px
- Opens a 380px wide, 520px tall chat window
- Welcome state with 3 clickable suggestions: "What does GARIHC do?", "How can AI help my business?", "Tell me about your past work"
- Typing indicator (3 bouncing dots)
- Tooltip on first visit: "Ask our AI anything about GARIHC"
- Error fallback directs to info@garihc.com
- Matches existing palette: charcoal bubbles for user, ivory bubbles for AI, gold status dot

#### Environment variable required:

```
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

Get from [console.anthropic.com](https://console.anthropic.com). Add to `.env.local` and to Vercel environment variables.

#### Integration:

Import and add `<ChatWidget />` at the bottom of your main page component, after Footer and before closing `</main>`.

---

### 2. AI Savings Calculator

#### Files to add:

**`app/calculator/page.tsx`** - Page wrapper with metadata

**`components/Calculator.tsx`** - Full calculator component (client component)

#### How it works:

5-step guided flow:

1. **Industry** - 8 options (Manufacturing, Retail/D2C, Distribution, SaaS/Tech, Professional Services, Healthcare, Real Estate, Other)
2. **Team size** - slider 1-100, plus annual salary input
3. **Manual hours** - slider 1-40 hrs/week per person, shows live team total
4. **Tasks** - multi-select from 8 tasks, each with automation % (data entry 85%, reporting 75%, customer support 65%, inventory 60%, scheduling 55%, content 50%, invoicing 70%, quality checks 45%)
5. **Results** - 3 big numbers (annual $ saved, hours saved, automation rate), monthly breakdown, and "Get a Free AI Audit" CTA

The CTA is a mailto link pre-filled with the visitor's industry, team size, and estimated savings.

#### Integration:

Lives at `/calculator`. Add a link to it from your AI section on the homepage:

```tsx
<a href="/calculator">Calculate Your AI Savings →</a>
```

#### Styling notes:

- Same palette: white/ivory backgrounds, charcoal text, gold for accent numbers and progress bar
- Same typography: Cormorant Garamond for headlines and display numbers, Outfit for body
- Selected options: charcoal fill with ivory text (or new accent color if added)
- Buttons: uppercase Outfit, letter-spacing 0.2em
- Progress bar: 5 segments - charcoal (completed), gold (current), border (upcoming)

---

## Quick Checklist

**UI changes:**
- [ ] Rewrite hero headline and subline for immediate clarity
- [ ] Move GARIHC meaning section after portfolio
- [ ] Rewrite GARIHC meaning with "one promise" framing
- [ ] Add one warm accent color for CTAs and interactions
- [ ] Add client/project logo strip below hero image
- [ ] Tighten About section copy

**New features:**
- [ ] Add `app/api/chat/route.ts`
- [ ] Add `components/ChatWidget.tsx`
- [ ] Add `components/Calculator.tsx`
- [ ] Add `app/calculator/page.tsx`
- [ ] Add `ANTHROPIC_API_KEY` to `.env.local`
- [ ] Add `ANTHROPIC_API_KEY` to Vercel environment variables
- [ ] Import `ChatWidget` into main page
- [ ] Add calculator link to AI section on homepage
- [ ] Deploy