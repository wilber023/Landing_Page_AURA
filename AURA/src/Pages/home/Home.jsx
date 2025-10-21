
import './home.css';
import Layout from '../../components/layout/Layout';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import HowItWorks from './components/HowItWorks';
import ContactForm from './components/ContactForm/ContactForm';
import { Impact, Inspiration, Privacy, CTA } from './components/RestSections';

const Home = () => {
  return (
    <Layout>
      <div className="home-page">
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Impact />
        <Inspiration />
        <ContactForm />
        <Privacy />
        <CTA />
      </div>
    </Layout>
  );
};

export default Home;
