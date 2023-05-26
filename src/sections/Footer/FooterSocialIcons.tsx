import { ReactIconLink } from "components";

import { FOOTER_SOCIAL_ICONS_DATA } from "utils/data";

const FooterSocialIcons: React.FC = () => {
  return (
    <ul className="flex justify-between sm:justify-end gap-2 w-full px-2">
      {FOOTER_SOCIAL_ICONS_DATA.map((socialIcon) => (
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
