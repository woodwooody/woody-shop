import styles from './about.module.css';

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <section className={styles.aboutHero}>
        <h1>About Woody Shop</h1>
        <p className={styles.heroText}>
          <span>Minimal Fashion with Emotion</span>
          <span className={styles.koreanText}>감성이 담긴 미니멀 패션</span>
        </p>
      </section>
      
      <section className={styles.aboutContent}>
        <div className={styles.aboutSection}>
          <h2>Our Story</h2>
          <p className={styles.bilingualText}>
            <span>
              Founded in 2025, Woody Shop brings
              uniqueness to your everyday style.
            </span>
            <span className={styles.koreanText}>
              2025년 시작된 우디샵은
              일상에 특별함을 더합니다.
            </span>
          </p>
        </div>

        <div className={styles.aboutSection}>
          <h2>Our Philosophy</h2>
          <p className={styles.bilingualText}>
            <span>
              Minimal but unique,
              comfortable but stylish.
            </span>
            <span className={styles.koreanText}>
              미니멀하지만 유니크하게,
              편안하지만 스타일리시하게.
            </span>
          </p>
        </div>

        <div className={styles.aboutSection}>
          <h2>Sustainability</h2>
          <p className={styles.bilingualText}>
            <span>
              Eco-friendly fashion for
              a sustainable future.
            </span>
            <span className={styles.koreanText}>
              지속 가능한 미래를 위한
              친환경 패션을 만듭니다.
            </span>
          </p>
        </div>
      </section>
    </div>
  );
} 