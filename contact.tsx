import Footer from "../components/Footer";
import Header from "../components/Header";
import MessageForm from "../components/MessageForm";

const contact = () => {
  return (
    <div className="font-mono flex flex-col min-h-screen">
      <Header />
      <div className="ml-4 mt-24 sm:ml-10 lg:ml-20 flex-grow">
        <div className="text-6xl mb-6">
          <p>Contact</p>
        </div>
        <div className="text-lg">
          <p className="mt-4">I'd love to hear from you.</p>
          <p>You can fill the form below.</p>
          <p>
            Or connect through my{" "}
            <a href="https://www.linkedin.com/in/plengnakdee/" target="_blank">
              LinkedIn
            </a>
          </p>
        </div>
        <MessageForm />
      </div>
      <Footer />
    </div>
  );
};

export default contact;
