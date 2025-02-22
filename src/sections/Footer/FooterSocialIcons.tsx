import { ReactIconLink } from 'components';

import { FOOTER_SOCIAL_ICONS_DATA } from 'utils/data';

const FooterSocialIcons: React.FC = () => {
  return (
    <ul className="flex w-full justify-between gap-2 px-2 sm:justify-end">
      {FOOTER_SOCIAL_ICONS_DATA.map(socialIcon => (
        <ReactIconLink
          key={socialIcon.id}
          Icon={socialIcon.Icon}
          route={socialIcon.route}
          isExteranl={true}

          // size='20'
        />
      ))}
    </ul>
  );
};

export default FooterSocialIcons;
