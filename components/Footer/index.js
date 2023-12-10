import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/sotblad/e-mood"
        target="_blank"
        rel="noopener noreferrer"
      >
        With ❤️ by sotblad.
      </a>
    </footer>
  );
}
