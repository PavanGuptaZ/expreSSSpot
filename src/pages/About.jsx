import { Heading } from '../components';
import aboutContent from '../assets/about.json';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { FaXTwitter } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Fragment, useContext, useMemo } from 'react';
import { themeDetails } from '../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../theme/themeColors';


export const About = () => {
  let { theme } = useContext(themeDetails)
  let { text } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);

  return (
    <div className='aboutBox'>
      {aboutContent.data.map((element, i) => (
        <Fragment key={i}>
          <Heading title={element.title} />
          <p className='aboutContent'>{element.content}</p>
          <div className='line'></div>
        </Fragment>
      ))}
      <Heading title={"Contect"} />
      <div className="socialLinksBox">
        <a href="https://github.com/PavanGuptaZ" target="_blank" rel="noreferrer"
          className="linkAnchor" style={{ color: text }}><AiFillGithub style={{ fontSize: "5rem" }} /> GitHub</a>
        <a href="https://twitter.com/pavangupta1234" target="_blank" rel="noreferrer"
          className="linkAnchor" style={{ color: text }}><FaXTwitter style={{ fontSize: "5rem" }} /> Twitter-X</a>
        <a href="https://www.linkedin.com/in/pavan-gupta-68b21b134" target="_blank" rel="noreferrer"
          className="linkAnchor" style={{ color: text }}><AiFillLinkedin style={{ fontSize: "5rem", color: "#0A66C2" }} /> Linkedin</a>
      </div>
      <p className='aboutContent'>Explore the code behind expreSSSpot on
        <a href="https://github.com/PavanGuptaZ" target="_blank" rel="noreferrer"> <FaExternalLinkAlt /></a>.
        Your feedback, suggestions, and ratings are highly appreciated. Contribute to the growth of this project by giving it a star. Let&apos;s stay connected! Find me on LinkedIn
        <a href="https://www.linkedin.com/in/pavan-gupta-68b21b134" target="_blank" rel="noreferrer"> <FaExternalLinkAlt /></a>
        and Twitter
        <a href="https://twitter.com/pavangupta1234" target="_blank" rel="noreferrer"> <FaExternalLinkAlt /></a>.
        Your support and insights are essential in fueling the progress of expreSSSpot.
      </p>
      <div className='line'></div>
      <p className='aboutContent' style={{ margin: "1rem 0" }}>Thank you for being part of this journey. Together, let&apos;s make expreSSSpot a thriving hub of thoughts, ideas, and connections.</p>
    </div>
  )
}
