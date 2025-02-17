import React, { useState } from 'react';
    import './FAQ.css';
    import Sidebar from './Sidebar';

    function FAQ() {
      const [openAnswer, setOpenAnswer] = useState(null);
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);

      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

      const faqItems = [
        {
          question: "How can I get better at Brazilian Jiu-Jitsu (BJJ)?",
          answer: `Improving at BJJ requires consistent training, a growth mindset, and a focus on fundamentals. Here are some tips:
          <ul>
            <li><b>Train regularly:</b> Aim for at least 3-4 sessions per week to build muscle memory and conditioning.</li>
            <li><b>Drill techniques:</b> Repetition is key to mastering Brazilian Jiu-Jitsu moves. Focus on perfecting the basics before advancing.</li>
            <li><b>Spar with purpose:</b> Use rolling sessions to test BJJ moves and identify weaknesses.</li>
            <li><b>Study footage:</b> Watch matches from top competitors to learn new strategies and the best Brazilian Jiu-Jitsu moves.</li>
            <li><b>Ask questions:</b> Don’t hesitate to ask your coach or training partners for feedback.</li>
            <li><b>Use free resources:</b> Websites like BJJ Horizons offer tutorials, tips, and guides to help you master jiu-jitsu moves and improve your game.</li>
          </ul>`,
        },
        {
          question: "What are the best ways to improve at BJJ by yourself?",
          answer: `Even without a training partner, you can make progress in BJJ:
          <ul>
            <li><b>Visualization:</b> Mentally rehearse <b>Brazilian Jiu-Jitsu moves</b> and sequences to reinforce learning.</li>
            <li><b>Mobility and conditioning:</b> Improve flexibility, strength, and endurance with exercises like yoga, weightlifting, or cardio.</li>
            <li><b>Shadow grappling:</b> Practice movements like shrimping, bridging, and technical stand-ups to refine your <b>BJJ moves</b>.</li>
            <li><b>Study instructional videos:</b> Platforms like <b>BJJ Horizons</b> provide free tutorials to help you learn and perfect <b>jiu-jitsu moves</b> at home.</li>
            <li><b>Journal your progress:</b> Write down techniques you’ve learned and areas you want to improve, focusing on the <b>best Brazilian Jiu-Jitsu moves</b> for your skill level.</li>
          </ul>`,
        },
        {
          question: "How do I start learning Brazilian Jiu-Jitsu as a beginner?",
          answer: `Starting BJJ can feel overwhelming, but here’s a simple guide:
          <ul>
            <li><b>Find a reputable gym:</b> Look for a school with experienced instructors and a welcoming environment.</li>
            <li><b>Learn the basics:</b> Focus on fundamental <b>Brazilian Jiu-Jitsu moves</b> like guard, mount, side control, and escapes.</li>
            <li><b>Invest in gear:</b> Get a gi (or no-gi attire) and a mouthguard for safety.</li>
            <li><b>Be consistent:</b> Attend classes regularly and don’t get discouraged by early challenges.</li>
            <li><b>Supplement your learning:</b> Use free resources like <b>BJJ Horizons</b> to reinforce what you learn in class, including essential <b>BJJ moves</b> and strategies.</li>
          </ul>`,
        },
        {
          question: "What’s the difference between Brazilian Jiu-Jitsu and Japanese Jiu-Jitsu?",
          answer: `While both martial arts share a common origin, they differ in focus and application:
          <ul>
            <li><b>Brazilian Jiu-Jitsu (BJJ):</b> Emphasizes ground fighting, submissions, and live sparring (rolling). It’s highly effective for self-defense and sport, with a focus on <b>Brazilian Jiu-Jitsu moves</b> like sweeps, guard passes, and submissions.</li>
            <li><b>Japanese Jiu-Jitsu:</b> Includes a broader range of techniques, such as strikes, throws, and weapon defenses, with less emphasis on ground fighting.</li>
          </ul>
          <p>BJJ is more specialized for real-world grappling scenarios, making it a popular choice for MMA and self-defense.</p>`,
        },
        {
          question: "How is Brazilian Jiu-Jitsu different from Karate?",
          answer: `BJJ and Karate are distinct martial arts:
          <ul>
            <li><b>BJJ:</b> Focuses on grappling, submissions, and controlling an opponent on the ground. Key <b>BJJ moves</b> include armbars, triangles, and rear-naked chokes.</li>
            <li><b>Karate:</b> Primarily a striking art, using punches, kicks, and blocks.</li>
          </ul>
          <p>BJJ is ideal for close-range combat and self-defense in grappling situations, while Karate is more effective for stand-up fighting and striking.</p>`,
        },
        {
          question: "Can I practice Jiu-Jitsu at home, and how?",
          answer: `Yes, you can practice BJJ at home with these tips:
          <ul>
            <li><b>Drill solo movements:</b> Practice shrimping, bridging, and technical stand-ups to improve your mobility and prepare for <b>Brazilian Jiu-Jitsu moves</b>.</li>
            <li><b>Use a grappling dummy:</b> A dummy can help you rehearse submissions and transitions, perfecting your <b>jiu-jitsu moves</b>.</li>
            <li><b>Watch and learn:</b> Study free tutorials on platforms like <b>BJJ Horizons</b> to learn the <b>best Brazilian Jiu-Jitsu moves</b> and refine your skills.</li>
            <li><b>Stay consistent:</b> Even 15-20 minutes of daily practice can make a difference in mastering <b>BJJ moves</b>.</li>
          </ul>`,
        },
        {
          question: "What are the best resources to learn BJJ online?",
          answer: `There are many great resources to learn BJJ online:
          <ul>
            <li><b>Paid platforms:</b> BJJ Fanatics, Grappler’s Guide, and Submeta offer high-quality instructional videos on <b>BJJ moves</b> and strategies.</li>
            <li><b>Free resources:</b> <b>BJJ Horizons</b> provides free tutorials, tips, and guides for practitioners of all levels, including the <b>best Brazilian Jiu-Jitsu moves</b>.</li>
            <li><b>YouTube channels:</b> Check out channels like Chewjitsu, Bernardo Faria, and Stephan Kesting for free content on <b>jiu-jitsu moves</b>.</li>
            <li><b>Online communities:</b> Join forums like Reddit’s r/bjj to ask questions and share knowledge about <b>Brazilian Jiu-Jitsu moves</b>.</li>
          </ul>`,
        },
        {
          question: "How can Jiu-Jitsu improve my life outside of training?",
          answer: `BJJ offers numerous benefits beyond the mats:
          <ul>
            <li><b>Physical health:</b> Improves fitness, flexibility, and strength through practicing <b>Brazilian Jiu-Jitsu moves</b>.</li>
            <li><b>Mental resilience:</b> Builds discipline, focus, and problem-solving skills.</li>
            <li><b>Stress relief:</b> Rolling and training help reduce anxiety and boost mood.</li>
            <li><b>Community:</b> Connects you with like-minded individuals who share your passion for <b>BJJ moves</b>.</li>
            <li><b>Confidence:</b> Mastering techniques and overcoming challenges can translate to greater self-assurance in daily life.</li>
          </ul>`,
        },
        {
          question: "How do I qualify for the IBJJF World Championships?",
          answer: `Qualifying for the IBJJF Worlds requires dedication and preparation:
          <ol>
            <li><b>Earn your rank:</b> You must be a registered IBJJF member and hold a valid belt rank.</li>
            <li><b>Compete in IBJJF tournaments:</b> Earn points by placing in IBJJF-sanctioned events, showcasing your mastery of <b>Brazilian Jiu-Jitsu moves</b>.</li>
            <li><b>Meet ranking requirements:</b> Depending on your belt level, you may need to finish in the top of your division at major tournaments.</li>
            <li><b>Train consistently:</b> Focus on competition-specific drills, conditioning, and strategy, including the <b>best Brazilian Jiu-Jitsu moves</b> for your division.</li>
            <li><b>Stay updated:</b> Check the IBJJF website for the latest rules and qualification criteria.</li>
          </ol>`,
        },
        {
          question: "What is the true origin of Jiu-Jitsu?",
          answer: `The Origin of Jiu-Jitsu dates back to ancient Japan, where samurai warriors developed grappling techniques to fight in armor, leading to the creation of traditional Japanese Jiu-Jitsu. Over time, these techniques evolved, influencing Judo and other martial arts. In the early 1900s, Mitsuyo Maeda, a Japanese master of Jiu-Jitsu, introduced the art to Brazil, where it was further developed by the Gracie family.

          Brazilian Jiu-Jitsu (BJJ) refined the focus on ground combat, leverage, and submissions, making it distinct from its Japanese predecessor. Today, practitioners study a variety of Jiujitsu moves such as sweeps, submissions, and escapes to gain positional control and victory. Whether for self-defense or competition, learning effective Jiu-Jitsu moves is key to mastering the art.`,
        },
        {
          question: "What is the belt ranking in BJJ?",
          answer: `The Jiu-Jitsu belt ranking system represents a practitioner's progression and skill level in Brazilian Jiu-Jitsu. Unlike some martial arts, BJJ has a rigorous ranking process, and belts are earned through consistent training, technical knowledge, and live sparring ability.

          The Jiu-Jitsu belt ranks for adults are:
          <ul>
            <li>White Belt – The beginner level, where students learn fundamental positions and Jiu-Jitsu moves like escapes and sweeps.</li>
            <li>Blue Belt – Focuses on refining techniques, defense, and strategy.</li>
            <li>Purple Belt – A more advanced level where practitioners develop their own style and improve submissions.</li>
            <li>Brown Belt – Near mastery, with strong positional control and detailed understanding of techniques.</li>
            <li>Black Belt – The expert level, where practitioners have a deep understanding of Jiu-Jitsu moves and strategy.</li>
            <li>Jiu-Jitsu Red Belt – Reserved for grandmasters who have dedicated their lives to the art, typically awarded after decades of study and contribution.</li>
          </ul>

          For children, the Jiu-Jitsu belt levels include additional colors like yellow, orange, and green before transitioning to the adult ranking system.`,
        },
        {
          question: "What is the difference between Judo and BJJ (Jiu-Jitsu)?",
          answer: `Judo and Jiu-Jitsu share a common origin but have evolved into distinct martial arts with different focuses.

          <ul>
            <li>Judo emphasizes throws and takedowns, with the goal of bringing an opponent to the ground using powerful sweeps and trips. It was developed in Japan by Jigoro Kano, who refined traditional Jiu-Jitsu techniques into a structured sport.</li>
            <li>Brazilian Jiu-Jitsu (BJJ) places a greater focus on ground fighting, submissions, and positional control. It evolved from Judo after Mitsuyo Maeda introduced it to Brazil, where it was further developed into a system of sweeps, escapes, and submissions.</li>
          </ul>

          While both arts use similar Jiu-Jitsu moves, Judo practitioners aim to win by throwing their opponents, while BJJ practitioners focus on grappling and submissions once the fight goes to the ground. Both martial arts are highly effective for self-defense and competition, but the choice between them depends on whether you prefer stand-up throws or ground-based strategy.`,
        },
      ];

      const toggleAnswer = (index) => {
        setOpenAnswer(openAnswer === index ? null : index);
      };

      return (
        <div className="app-container">
          <button className={`burger-icon ${isSidebarOpen ? 'close' : ''}`} onClick={toggleSidebar}>
            {isSidebarOpen ? '✕' : '☰'}
          </button>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className={`content-area ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="content-header">
              <h1>FAQ</h1>
            </div>
            <div className="faq-container">
              {faqItems.map((item, index) => (
                <div key={index} className="faq-item">
                  <h2
                    className={`faq-question ${openAnswer === index ? 'open' : ''}`}
                    onClick={() => toggleAnswer(index)}
                  >
                    {item.question}
                  </h2>
                  {openAnswer === index && (
                    <div className="faq-answer" dangerouslySetInnerHTML={{ __html: item.answer }}>
                    </div>
                  )}
                </div>
              ))}
              <div className="support-section">
                <p>Still have questions? Contact our support</p>
                <a href="/contact">
                  <button className="support-button">Contact Support</button>
                </a>
              </div>
            </div>
          </div>
          <footer className="app-footer">
            <p>Videos featured on this site are sourced from YouTube and comply with YouTube's Terms of Service and API policies. This site does not claim ownership of the videos. If you have concerns or wish to request removal, please contact us.</p>
            <div className="footer-links">
              <a href="/">Home</a>
              <a href="/about">About Us</a>
              <a href="/faq">FAQ</a>
              <a href="/terms">Terms & Conditions</a>
              <a href="/contact">Contact Us</a>
            </div>
          </footer>
        </div>
      );
    }

    export default FAQ;
