# Admin Pages - Extracted Components

These 4 admin pages were extracted from the Hair Extensions Website project and are ready to drop into any Next.js App Router project.

## Pages Included

| Page | Path | Description |
|------|------|-------------|
| Payments | `payments/page.tsx` | Transaction history, revenue stats, payment status |
| Shipping | `shipping/page.tsx` | Shipping methods, costs, rules configuration |
| Categories | `categories/page.tsx` | Product category management |
| Reports | `reports/page.tsx` | Analytics, sales chart, top products |

## How to Use

1. Copy the desired folder(s) into your project's `src/app/admin/` directory.
2. Each page uses:
   - **`pool` from `../../../lib/db`** — replace with your own DB connection or remove the DB query.
   - **`lucide-react`** — install if not already: `npm install lucide-react`
   - **Tailwind CSS** — make sure Tailwind is configured.

3. Each page gracefully falls back to **dummy data** if the DB query fails, so they render fine even without a database connected.

## Dependencies

```bash
npm install lucide-react
```

## Notes

- All pages are Next.js **Server Components** (async by default).
- Styling uses Tailwind utility classes with a dark theme (`bg-[#16181d]`, etc.).
- Replace the `pool.query(...)` calls with your own data fetching logic as needed.
