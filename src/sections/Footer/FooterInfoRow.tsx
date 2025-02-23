import { FOOTER_LEGAL_DATA } from '~constants/data';

import { ElephantLogoImg } from '~assets';

import { TextLink } from '~components/Links';

import FooterSocialIcons from './FooterSocialIcons';

const FooterInfoRow: React.FC = () => {
  return (
    <div>
      {/* Social Media Row */}
      <div className="mb-14 flex justify-between border-b-2 border-b-neutral-200 pb-24 sm:mb-10 sm:pb-10">
        <p className="hidden text-sm font-semibold tracking-wider text-green-600 sm:block">
          Evernote
        </p>

        <FooterSocialIcons />
      </div>

      {/* Legal Row */}
      <div className="flex flex-col-reverse items-center gap-14 text-[13px] text-neutral-500 sm:flex-row sm:justify-between sm:gap-0 sm:text-xs">
        <img
          className="w-7 sm:hidden"
          src={ElephantLogoImg}
          alt="Green elephant logo of Evernote"
        />
        <p className="">© 2022 Evernote Corporation. All rights reserved.</p>
        <ul className="flex w-full justify-between gap-8 sm:w-auto">
          {FOOTER_LEGAL_DATA.map(link => (
            <li key={link.id} className="hover:text-neutral-800">
              <TextLink text={link.text} route={link.route} underline={false} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterInfoRow;
