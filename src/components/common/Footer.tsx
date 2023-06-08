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
    <footer
      className="absolute bottom-0 flex justify-center items-center w-full min-h-20 h-20 md:h-12 md:min-h-12"
      style={{
        boxShadow:
          '0 -1px 3px 0px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        minWidth: '375px'
      }}
    >
      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-center md:justify-between items-center px-8">
        <p className="text-gray-500 order-2 md:order-1 text-xs">
          &copy; 2023 Yogizogi All Rights Reserved.
        </p>
        <div className="flex gap-8 order-1 md:order-2 mb-4 md:mb-0">
          {channels.map((channel) => {
            return (
              <div
                key={channel.name}
                className="tooltip"
                data-tip={channel.name}
              >
                <Link to={channel.url}>{channel.logo}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
