import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="font-mono flex flex-col min-h-screen">
      <Head>
        <title>Portfolio-Pleng-Nakdee</title>
      </Head>
      <Header />
      <div className="ml-4 mt-24 sm:ml-10 lg:ml-20 flex-grow">
        <div>
          <p className="text-9xl">Hi,</p>
          <p className="text-4xl mt-4 mr-6">I'm a Software Engineer...</p>
          <p></p>
        </div>
        <div className="text-lg mt-4 mr-6">
          <p>
            with focus on cloud computing. I work with the full stack of cloud
            solutions: from infrastructure as code, to backend, to frontend. I’m
            also an Ai enthusiast with some experience in deep learning. You can
            go to my portfolio to see some of my works.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
