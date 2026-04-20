import sys

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add useEffect import
content = content.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';")

# Add state and useEffect inside Home component
state_hook_injection = '''
  const [currentReviewIdx, setCurrentReviewIdx] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [dbReviews, setDbReviews] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/frontpage')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (data.products && data.products.length > 0) setDbProducts(data.products);
          if (data.reviews && data.reviews.length > 0) setDbReviews(data.reviews);
        }
      })
      .catch(err => console.error("DB Fetch Error:", err));
  }, []);

  const displayReviews = dbReviews.length > 0 ? dbReviews : REVIEWS;
  const currentReview = displayReviews[currentReviewIdx] || displayReviews[0];
'''
content = content.replace(
'''  const [currentReviewIdx, setCurrentReviewIdx] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);''',
state_hook_injection
)

# Replace REVIEWS.length with displayReviews.length in handlers
content = content.replace('REVIEWS.length', 'displayReviews.length')
content = content.replace('REVIEWS[currentReviewIdx]', 'currentReview')

# Replace Product Mappings
search_bundles = '''            {[
              { id: 1, name: "Love Hair 3 Bundles 9A Grade Brazilian Human Hair Water Wave", price: "$86.00", oldPrice: "$120.00", img: "https://images.unsplash.com/photo-1595424564881-81f19c9918bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 124 },
              { id: 2, name: "Queen Hair 10A Brazilian Hair Straight 3 Bundles Virgin Human Hair", price: "$75.00", oldPrice: "$95.00", img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 89 },
              { id: 3, name: "Love Hair Body Wave 3 Bundles With Closure Brazilian Human Hair", price: "$98.50", oldPrice: "$140.00", img: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 312 },
              { id: 4, name: "Loose Deep Wave 3 Bundles With Frontal 100% Unprocessed Virgin Hair", price: "$112.00", oldPrice: "$160.00", img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 67 },
               { id: 5, name: "Peruvian Straight Hair 4 Bundles Deal Virgin Human Hair Weave", price: "$105.00", oldPrice: "$150.00", img: "https://images.unsplash.com/photo-1560963683-162e24d35eef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 45 },
               { id: 6, name: "Malaysian Curly Hair 3 Bundles Kinky Curly Virgin Human Hair", price: "$92.00", oldPrice: "$130.00", img: "https://images.unsplash.com/photo-1616428789366-a3d5e21fb2b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 290 },
               { id: 7, name: "Indian Deep Wave 3 Bundles With 4x4 Lace Closure Human Hair", price: "$118.00", oldPrice: "$170.00", img: "https://images.unsplash.com/photo-1586521995874-ce6cf16eb512?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 156 },
               { id: 8, name: "Brazilian Water Wave 4 Bundles Wet and Wavy Human Hair", price: "$125.00", oldPrice: "$180.00", img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 88 }
            ].map((product) => ('''

replace_bundles = '''            {(dbProducts.length > 0 ? dbProducts.filter(p => p.category === 'Bundle') : [
              { id: 1, name: "Love Hair 3 Bundles 9A Grade Brazilian Human Hair Water Wave", price: "$86.00", oldPrice: "$120.00", img: "https://images.unsplash.com/photo-1595424564881-81f19c9918bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 124 },
              { id: 2, name: "Queen Hair 10A Brazilian Hair Straight 3 Bundles Virgin Human Hair", price: "$75.00", oldPrice: "$95.00", img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 89 },
              { id: 3, name: "Love Hair Body Wave 3 Bundles With Closure Brazilian Human Hair", price: "$98.50", oldPrice: "$140.00", img: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 312 },
              { id: 4, name: "Loose Deep Wave 3 Bundles With Frontal 100% Unprocessed Virgin Hair", price: "$112.00", oldPrice: "$160.00", img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 67 },
               { id: 5, name: "Peruvian Straight Hair 4 Bundles Deal Virgin Human Hair Weave", price: "$105.00", oldPrice: "$150.00", img: "https://images.unsplash.com/photo-1560963683-162e24d35eef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 45 },
               { id: 6, name: "Malaysian Curly Hair 3 Bundles Kinky Curly Virgin Human Hair", price: "$92.00", oldPrice: "$130.00", img: "https://images.unsplash.com/photo-1616428789366-a3d5e21fb2b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 290 },
               { id: 7, name: "Indian Deep Wave 3 Bundles With 4x4 Lace Closure Human Hair", price: "$118.00", oldPrice: "$170.00", img: "https://images.unsplash.com/photo-1586521995874-ce6cf16eb512?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 156 },
               { id: 8, name: "Brazilian Water Wave 4 Bundles Wet and Wavy Human Hair", price: "$125.00", oldPrice: "$180.00", img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 88 }
            ]).map((product) => ('''

search_wigs = '''            {[
              { id: 1, name: "Loose Deep Wave wig 13x4 Lace Front Human Hair Wigs", price: "$120.00", oldPrice: "$180.00", img: "https://images.unsplash.com/photo-1562086254-20b16260bd7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 215 },
              { id: 2, name: "Body Wave Lace Front Wigs Human Hair 180% Density", price: "$135.00", oldPrice: "$195.00", img: "https://images.unsplash.com/photo-1542452255191-c85a98f2cb59?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 84 },
              { id: 3, name: "Water Wave Headband Wig Human Hair Glueless Wigs", price: "$85.00", oldPrice: "$115.00", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 49 },
              { id: 4, name: "Highlight Lace Front Wigs Human Hair Ombre Straight Wig", price: "$145.00", oldPrice: "$210.00", img: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 132 },
               { id: 5, name: "Bone Straight 13x6 HD Lace Front Wig Free Part", price: "$155.00", oldPrice: "$230.00", img: "https://images.unsplash.com/photo-1583001809873-c12ebba3152f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 93 },
               { id: 6, name: "Kinky Straight Headband Wig for Black Women", price: "$75.00", oldPrice: "$99.00", img: "https://images.unsplash.com/photo-1601055904031-645391d84a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 110 },
               { id: 7, name: "Short Bob Wig Lace Front Human Hair Wigs", price: "$68.00", oldPrice: "$85.00", img: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 420 },
               { id: 8, name: "Blonde 613 Lace Front Wig Body Wave Transparent Lace", price: "$140.00", oldPrice: "$200.00", img: "https://images.unsplash.com/photo-1552697611-bba65123d4ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 315 },
               { id: 9, name: "Deep Wave Lace Closure Wig 4x4 Pre Plucked With Baby Hair", price: "$110.00", oldPrice: "$150.00", img: "https://images.unsplash.com/photo-1531685250784-523c9213197f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 75 }
            ].map((product) => ('''

replace_wigs = '''            {(dbProducts.length > 0 ? dbProducts.filter(p => p.category === 'Wig') : [
              { id: 1, name: "Loose Deep Wave wig 13x4 Lace Front Human Hair Wigs", price: "$120.00", oldPrice: "$180.00", img: "https://images.unsplash.com/photo-1562086254-20b16260bd7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 215 },
              { id: 2, name: "Body Wave Lace Front Wigs Human Hair 180% Density", price: "$135.00", oldPrice: "$195.00", img: "https://images.unsplash.com/photo-1542452255191-c85a98f2cb59?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 84 },
              { id: 3, name: "Water Wave Headband Wig Human Hair Glueless Wigs", price: "$85.00", oldPrice: "$115.00", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 49 },
              { id: 4, name: "Highlight Lace Front Wigs Human Hair Ombre Straight Wig", price: "$145.00", oldPrice: "$210.00", img: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 132 },
               { id: 5, name: "Bone Straight 13x6 HD Lace Front Wig Free Part", price: "$155.00", oldPrice: "$230.00", img: "https://images.unsplash.com/photo-1583001809873-c12ebba3152f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 93 },
               { id: 6, name: "Kinky Straight Headband Wig for Black Women", price: "$75.00", oldPrice: "$99.00", img: "https://images.unsplash.com/photo-1601055904031-645391d84a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 110 },
               { id: 7, name: "Short Bob Wig Lace Front Human Hair Wigs", price: "$68.00", oldPrice: "$85.00", img: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 420 },
               { id: 8, name: "Blonde 613 Lace Front Wig Body Wave Transparent Lace", price: "$140.00", oldPrice: "$200.00", img: "https://images.unsplash.com/photo-1552697611-bba65123d4ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 315 },
               { id: 9, name: "Deep Wave Lace Closure Wig 4x4 Pre Plucked With Baby Hair", price: "$110.00", oldPrice: "$150.00", img: "https://images.unsplash.com/photo-1531685250784-523c9213197f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 75 }
            ]).map((product) => ('''

search_trending = '''            {[
              { id: 1, name: "Loose Deep Wave wig", price: "$120.00", img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 400 },
              { id: 2, name: "Love Hair Body Wave", price: "$135.00", img: "https://images.unsplash.com/photo-1616428789366-a3d5e21fb2b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 200 },
              { id: 3, name: "Straight Lace Front wig", price: "$145.00", img: "https://images.unsplash.com/photo-1595424564881-81f19c9918bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 150 },
              { id: 4, name: "Curly Bob wig", price: "$85.00", img: "https://images.unsplash.com/photo-1512401777085-c49195e340fa?auto=format&fit=crop&q=80&w=400", reviews: 80 }
            ].map((product) => ('''

replace_trending = '''            {(dbProducts.length > 0 ? dbProducts.slice(0, 4) : [
              { id: 1, name: "Loose Deep Wave wig", price: "$120.00", img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 400 },
              { id: 2, name: "Love Hair Body Wave", price: "$135.00", img: "https://images.unsplash.com/photo-1616428789366-a3d5e21fb2b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 200 },
              { id: 3, name: "Straight Lace Front wig", price: "$145.00", img: "https://images.unsplash.com/photo-1595424564881-81f19c9918bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 150 },
              { id: 4, name: "Curly Bob wig", price: "$85.00", img: "https://images.unsplash.com/photo-1512401777085-c49195e340fa?auto=format&fit=crop&q=80&w=400", reviews: 80 }
            ]).map((product) => ('''

content = content.replace(search_bundles, replace_bundles)
content = content.replace(search_wigs, replace_wigs)
content = content.replace(search_trending, replace_trending)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
