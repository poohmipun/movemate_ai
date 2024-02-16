import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
const Home = () => {
  return (
    <section className="w-full h-full flex-center flex-col">
      <Navbar />
      <div className="w-full h-96 rounded-lg flex-center flex-col bg-[url('/images/slogan_bg.png')] bg-cover p-10 shadow-2xl shadow-gray-600/50">
        <h1 className="head_text text-center text-white">
          Your virtual fitness companion<br></br>always by your side
          <br className="max-md:hidden" />
        </h1>
        <p className="desc text-center">
          Welcome to MoveMateAI, your ultimate fitness companion powered by
          artificial intelligence. With MoveMateAI.
        </p>
      </div>
      <div className="w-full h-full pt-12 flex flex-col pb-12">
        <h1 className="head_text text-left mb-12">How it works?</h1>
        <div className="video-container">
          <iframe
            className="video"
            src="https://www.youtube.com/embed/CN_RsGkRScM?autoplay=1&mute=1&loop=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <iframe
            className="video"
            src="https://www.youtube.com/embed/CN_RsGkRScM?autoplay=1&mute=1&loop=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="about flex flex-col w-full mb-20">
        <span className="mb-12">
          Overall, MoveMateAI is more than just a virtual fitness trainer—it's
          your dedicated companion for achieving your fitness goals with
          precision, efficiency, and confidence. With its intuitive interface,
          real-time feedback, and personalized guidance, MoveMateAI empowers you
          to unlock your full potential and elevate your fitness journey to new
          heights.
        </span>
        <span>
          Form Correction and Feedback: As you exercise, MoveMateAI constantly
          evaluates your form and technique. If it detects any deviations or
          mistakes, the app provides instant feedback to help you correct your
          posture and movement. This real-time guidance ensures that you
          maintain proper form throughout your workout, minimizing the risk of
          injury and maximizing the effectiveness of each exercise.
        </span>
      </div>

      <Footer />
    </section>
  );
};

export default Home;
