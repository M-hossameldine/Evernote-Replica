import { FOOTER_SOCIAL_ICONS_DATA } from '../../../constants';

import { ReactIconLink } from '~components/Links';

export const FooterSocialIcons: React.FC = () => {
  return (
    <ul className="flex w-full justify-between gap-2 px-2 sm:justify-end">
      {FOOTER_SOCIAL_ICONS_DATA.map((socialIcon, index) => (
        <ReactIconLink
          key={index}
          Icon={socialIcon.Icon}
          route={socialIcon.route}
          isExternal={true}
        />
      ))}
    </ul>
  );
};

export default FooterSocialIcons;
