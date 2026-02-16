import Hero from "@/components/home/Hero";
import Capabilities from "@/components/home/Capabilities";
import ProblemStatements from "@/components/home/ProblemStatements";
import AIInAction from "@/components/home/AIInAction";
import Products from "@/components/home/Products";
import Impact from "@/components/home/Impact";
import Culture from "@/components/home/Culture";
import CTA from "@/components/home/CTA";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Capabilities />
      <Impact />
      <ProblemStatements />
      <AIInAction />
      <Products />
      <Culture />
      <CTA />
    </main>
  );
}
