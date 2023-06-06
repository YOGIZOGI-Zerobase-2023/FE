import { Github, Notion } from '../logo';
import { Link } from 'react-router-dom';

const channels = [
  {
    name: 'Github',
    url: 'https://github.com/orgs/YOGIZOGI-Zerobase-2023/repositories',
    logo: (
      <Github
        width={22}
        height={22}
        fill={'fill-gray-400 hover:fill-gray-500'}
      />
    )
  },
  {
    name: 'Notion',
    url: 'https://jet-enquiry-8e3.notion.site/YOGIZOGI-fd26b4d3490b431e8753780ebad4b6fc',
    logo: (
      <Notion
        width={22}
        height={22}
        fill={'fill-gray-400 hover:fill-gray-500'}
      />
    )
  }
];

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center md:justify-between items-center mx-16 my-8 md:flex-row">
      <p className="text-gray-500 order-2 md:order-1 text-xs">
        &copy; 2023 Yogizogi All Rights Reserved.
      </p>
      <div className="flex gap-8 order-1 md:order-2 mb-4 md:mb-0">
        {channels.map((channel) => {
          return (
            <div key={channel.name} className="tooltip" data-tip={channel.name}>
              <Link to={channel.url}>{channel.logo}</Link>
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
