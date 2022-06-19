import { TextLink } from '../../components';
import FooterSocialIcons from './FooterSocialIcons';
import { FOOTER_LEGAL_DATA } from '../../utils/data';
import { ElephantLogoImg } from '../../assets';

const FooterInfoRow: React.FC = () => {
  return (
    <div>
      {/* Social Media Row */}
      <div className='flex justify-between border-b-2 border-b-neutral-200 pb-24 sm:pb-10 mb-14 sm:mb-10'>
        <p className='hidden sm:block text-sm font-semibold tracking-wider text-green-600'>
          Evernote
        </p>

        <FooterSocialIcons />
      </div>

      {/* Legal Row */}
      <div className='flex sm:justify-between items-center flex-col-reverse sm:flex-row gap-14 sm:gap-0 text-[13px] sm:text-xs text-neutral-500'>
        <img
          className='sm:hidden w-7'
          src={ElephantLogoImg}
          alt='Green elephant logo of Evernote'
        />
        <p className=''>© 2022 Evernote Corporation. All rights reserved.</p>
        <ul className='flex justify-between gap-8 w-full sm:w-auto '>
          {FOOTER_LEGAL_DATA.map((link) => (
            <li key={link.id} className=' hover:text-neutral-800'>
              <TextLink text={link.text} route={link.route} underline={false} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterInfoRow;
