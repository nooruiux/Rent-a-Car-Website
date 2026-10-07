import { hero } from "@/data/site";

export default function Home() {
  return (
    <main id="main" className="container-site py-section">
      <p className="text-h5 font-medium text-ink">
        {hero.eyebrow} {hero.city}
      </p>
      <h1 className="text-h1 font-bold text-ink">{hero.title}</h1>
    </main>
  );
}
